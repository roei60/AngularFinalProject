const express = require("express");

const Destination = require("../models/destination");

const router = express.Router();

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
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
});

router.get("/:id", (req, res, next) => {
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

module.exports = router;