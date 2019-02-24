const express = require("express");
const cmsService = require('../services/CMSService.js')

const router = express.Router();

router.get("", (req, res, next) => {
  console.log("get by bestOFFER");
  var a = cmsService.getMax();
  console.log("Country is" + a.country + " City is " + a.city);
  res.status(200).json({
    a
  });
});

router.post("", (req, res, next) => {
    console.log("Post is in proccess by bestOffer.js");
    console.log("post request req.body: " + req.body.id);
    console.log("post request req.body: " + req.body.country);
    console.log("post request req.body: " + req.body.city);
    cmsService.updateKey(req.body);
    res.status(201).json({
      message: "CMS updated successfully"      
    });
});



module.exports = router;