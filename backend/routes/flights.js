const express = require("express");

const Flight = require("../models/flight");

const router = express.Router();

router.post(
  "",
  (req, res, next) => {
    console.log("post request req.protocol: " + req.protocol);
    console.log("post request req.gethost: " + req.get("host"));
    console.log("post request req.body: " + req.body.takeoff);
    console.log("post request req.body: " + req.body.landing);
    console.log("post request req.body: " + req.body.price);
    console.log("post request req.body: " + req.body.destination);
    const flight = new Flight({
      takeoff: req.body.takeoff,
      landing: req.body.landing,
      price: req.body.price,
      destination: req.body.destination
    });
    console.log("post request flight: " + flight.json);
     flight.save().then(createdFlight => {
      res.status(201).json({
        message: "Flight added successfully",
        flight: {
          ...createdFlight,
          id: createdFlight._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  (req, res, next) => {
    const flight = new Flight({
      _id: req.body.id,
      takeoff: req.body.takeoff,
      landing: req.body.landing,
      price: req.body.price,
      destination: req.body.destination
    });
    console.log(flight);
    Flight.updateOne({
      _id: req.params.id 
    }, flight).then(result => {
      res.status(200).json({
        message: "Update successful!"
      });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const flightQuery = Flight.find().populate('destination');
  let fetchedFlights;
  if (pageSize && currentPage) {
    flightQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  flightQuery
    .then(documents => {
      fetchedFlights = documents;
      return Flight.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Flights fetched successfully!",
        flights: fetchedFlights,
        maxFlights: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  Flight.findById(req.params.id).populate('destination').then(flight => {
    if (flight) {
      res.status(200).json(flight);
    } else {
      res.status(404).json({
        message: "Flight not found!"
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Flight.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Flight deleted!"
    });
  });
});

module.exports = router;