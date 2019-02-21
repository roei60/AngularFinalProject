const express = require("express");

const Flight = require("../models/flightSchema");
const router = express.Router();
const mongoose = require("mongoose");
const AhoService = require("../services/AhoCorasickService")
const {
    to
} = require('await-to-js');
router.get("/:text", async(req, res, next) => {
    var searchParams = req.params.text;
    var res = await to(AhoService.FindFlightByDestinations(searchParams))

    console.log(res);
    router.status(200).json({
        Flights: res,
    });
})


module.exports = router;