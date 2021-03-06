const express = require('express');
const router = express.Router()


router.get('/', (req, res) => res.send("users routes"));

router.post('/', (req, res) => {
  res.send("users routes")
});

module.exports = router;