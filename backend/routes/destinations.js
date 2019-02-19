const express = require("express");

const Destination = require("../models/destinationSchema");

const router = express.Router();

router.get("", (req, res, next) => {
  console.log("get ");
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const country = req.query.country;
  const city = req.query.city;
  console.log("Country = " + country);
  if (!country){
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
    var query = { country: country, city: city };
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

router.put(
  "/:id",
  (req, res, next) => {
    const dest = new Destination({
      _id: req.body.id,
      city: req.body.city,
      country: req.body.country
    });
    console.log(dest);
    Destination.updateOne({
      _id: req.params.id 
    }, dest).then(result => {
      res.status(200).json({
        message: "Update successful!"
      });
    });
  }
);

router.delete("/:id", (req, res, next) => {
  Destination.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Destination deleted!"
    });
  });
});


module.exports = router;