const express = require("express");

const Flight = require("../models/flightSchema");

const router = express.Router();

router.get("/",(req,res,next)=>{
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
  
   var query=Flight.aggregate([
      { "$project": { 
              "month": { "$month": "$takeoff" }
          }},  
          { "$group": {
              "_id": "$month", 
              "count": { "$sum": 1 }
          }}
      ])
      query.then(obj=>{
           var result= obj.map(va=>{
                return {
                    "name":va._id,
                    "value":va.count
                };
            })
        var sortedResult=result.sort(function(a, b){return a.month - b.month});
        res.status(200).json({
            CountFlight: sortedResult,
          }); 
    })
  })
  module.exports = router;