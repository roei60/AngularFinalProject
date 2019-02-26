const {
  to
} = require('await-to-js');

const express = require("express");
const cmsService = require('../services/CMSService.js')
const Destination = require("../models/destinationSchema");

const router = express.Router();

router.get("", async (req, res, next) => {
  console.log("get by bestOFFER");
  var a = cmsService.getMax();
  [err,response]=await to(Destination.findById(a));
  res.status(200).json(response);
 /* if (a == undefined) {
    [err, found] = await to(Destination.findOne());
    if (found) {
      a = found;
      res.status(200).json({
        a
      });
    } else res.status(200).json({
      msg: "no destination at all"
    })
  } else {

    console.log("Country is" + a.country + " City is " + a.city);
    res.status(200).json({
      a
    });
  }*/
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