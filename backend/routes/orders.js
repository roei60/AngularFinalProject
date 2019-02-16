const express = require("express");

const User = require("../models/userSchema");
const Flight = require("../models/flightSchema");

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
  

  
  router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;

    var ordersQuery = User.findById(req.user.id).populate({path:"orders.flight", populate:{path: "destination"}});
    let fetchedOrders;
    if (pageSize && currentPage) {
      ordersQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    ordersQuery
    .then(user => {
        return user.orders._doc.orders;
    })
      .then(documents => {
        fetchedOrders = documents;
        return fetchedOrders.length;
      })
      .then(count => {
        res.status(200).json({
          message: "User orders fetched successfully!",
          orders: fetchedOrders,
          maxOrders: count
        });
      });
  });
  
  
  module.exports = router;