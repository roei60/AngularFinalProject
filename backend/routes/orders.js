const express = require("express");

const User = require("../models/userSchema");

const router = express.Router();

router.put(
  "",
  (req, res, next) => {
    console.log("post request req.body.userId: " + req.body.userId);
      console.log("post request req.body.flight: " + req.body.flightId);
      console.log("post request req.body.quantity: " + req.body.quantity);

      User.findById(req.body.userId).then(res => console.log(res));
      
      var updateQuery = { 
        $addToSet:  { 
              orders: {
                flight: req.body.flightId, 
                quantity: req.body.quantity 
              }
        }
    };

      User.findByIdAndUpdate(req.body.userId, updateQuery)
      .then(result => {
            res.status(200).json({
              message: "Update order successful!"
            });
      });
  }
);
  
//   router.put(
//     "/:id",
//     (req, res, next) => {
//       const flight = new Flight({
//         _id: req.body.id,
//         takeoff: req.body.takeoff,
//         landing: req.body.landing,
//         price: req.body.price,
//         destination: req.body.destination
//       });
//       console.log(flight);
//       Flight.updateOne({
//         _id: req.params.id 
//       }, flight).then(result => {
//         res.status(200).json({
//           message: "Update successful!"
//         });
//       });
//     }
//   );
  
//   router.get("", (req, res, next) => {
//     const pageSize = +req.query.pagesize;
//     const currentPage = +req.query.page;
//     const flightQuery = Flight.find().populate('destination');
//     let fetchedFlights;
//     if (pageSize && currentPage) {
//       flightQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//     }
//     flightQuery
//       .then(documents => {
//         fetchedFlights = documents;
//         return Flight.count();
//       })
//       .then(count => {
//         res.status(200).json({
//           message: "Flights fetched successfully!",
//           flights: fetchedFlights,
//           maxFlights: count
//         });
//       });
//   });
  
//   router.get("/:id", (req, res, next) => {
//     Flight.findById(req.params.id).populate('destination').then(flight => {
//       if (flight) {
//         res.status(200).json(flight);
//       } else {
//         res.status(404).json({
//           message: "Flight not found!"
//         });
//       }
//     });
//   });
  
//   router.delete("/:id", (req, res, next) => {
//     Flight.deleteOne({
//       _id: req.params.id
//     }).then(result => {
//       console.log(result);
//       res.status(200).json({
//         message: "Flight deleted!"
//       });
//     });
//   });
  
  module.exports = router;