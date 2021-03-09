const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('../config/keys');


const {check, validationResult} = require('express-validator');
const User = require('../models/Users')

router.get('/', (req, res) => res.send("users routes"));

router.post('/', [
  check("name", "name is required").not().isEmpty(),
  check("email", "Please enter your email").isEmail(),
  check("password", "Password is incorrect").isLength({min: 5})
], 
  async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()})
  }
  try {
    const { name, email, password} = req.body
    let user = await User.findOne({ email:email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }]})
    }
    user = new User({
      name,
      email,
      password
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)
    user.save();
    // res.send("user created")

    //signing and sending a web token
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(
      payload, 
      config.jwtSecret, 
      {expiresIn: 3600 * 24},
      (err, token) => {
        if (err) throw err;
        res.json({token})  
      });

  } catch (error) {
    console.error(error);
  }
  
});

module.exports = router;