const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');


router.get('/', (req, res) => res.send("users routes"));

router.post('/', [
  check("name", "name is required").not().isEmpty(),
  check("email", "Please enter your email").isEmail(),
  check("password", "Password is incorrect").isLength({min: 5})

], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()})
  }
  console.log(req.body)
  res.send("users routes")
});

module.exports = router;