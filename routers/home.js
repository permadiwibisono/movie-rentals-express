const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
  return res.json({
    message: "Welcome to Movie Rentals API",
    status_code: 200
  });
});

module.exports = router;