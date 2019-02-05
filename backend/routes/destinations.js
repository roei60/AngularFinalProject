const express = require("express");

const Destination = require("../models/destination");

const router = express.Router();

router.get("", (req, res, next) => {
  console.log("get ");
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const Country = req.query.Country;
  const City = req.query.City;
  console.log("Country = " + Country);
  if (!Country){
    console.log("no Country and City specified");
      const destinationQuery = Destination.find();
    let fetchedDestinations;
    if (pageSize && currentPage) {
      destinationQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    destinationQuery
      .then(documents => {
          fetchedDestinations = documents;
        return Destination.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Destinations fetched successfully!",
          destinations: fetchedDestinations,
          maxDestinations: count
        });
      });
    }
  else{
    console.log("dest get by country and city");
    var query = { Country: Country, City: City };
    console.log("query = " + query);

    Destination.findOne(query).then(dest => {
      if (dest) {
        res.status(200).json(dest);
      } else {
        res.status(404).json({
          message: "Destination not found!"
        });
      }
    });
  }
});

router.get("/:id", (req, res, next) => {
  console.log("dest get by ID");
  Destination.findById(req.params.id).then(dest => {
    if (dest) {
      res.status(200).json(dest);
    } else {
      res.status(404).json({
        message: "Destination not found!"
      });
    }
  });
});

// router.get("/?country=:country", (req, res, next) => {
//   console.log("dest get by country");
//   var query = { country: req.params.country };
//   console.log("query = " + query);

//   Destination.findOne(query).then(dest => {
//     if (dest) {
//       res.status(200).json(dest.id);
//     } else {
//       res.status(404).json({
//         message: "Destination not found!"
//       });
//     }
//   });
// });

module.exports = router;