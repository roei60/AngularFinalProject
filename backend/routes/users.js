const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.post(
  "",
  (req, res, next) => {
    console.log("post request req.protocol: " + req.protocol);
    console.log("post request req.gethost: " + req.get("host"));
    console.log("post request req.body: " + req.body.userName);
    console.log("post request req.body: " + req.body.firstName);
    console.log("post request req.body: " + req.body.lastName);
    console.log("post request req.body: " + req.body.birthdate);
    console.log("post request req.body: " + req.body.email);
    console.log("post request req.body: " + req.body.password);
    console.log("post request req.body: " + req.body.isAdmin);
    const user = new User({
        userName: req.body.userName,
        password: req.body.password,
        birthdate: req.body.birthdate,
        email: req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        isAdmin:req.body.isAdmin,
    });


    console.log("post request user: " + user.json);
     user.save().then(createdUser => {
      res.status(201).json({
        message: "user added successfully",
        user: {
          ...createdUser,
          id: createdUser._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  (req, res, next) => {
    const user = new User({
        _id: req.body.id,
        userName: req.body.userName,
        password: req.body.password,
        birthdate: req.body.birthdate,
        email: req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        isAdmin:req.body.isAdmin,
    });
    console.log(user);
    User.updateOne({
      _id: req.params.id 
    }, user).then(result => {
      res.status(200).json({
        message: "Update successful!"
      });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  userQuery
    .then(documents => {
        fetchedUsers = documents;
      return User.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: fetchedUsers,
        maxUsers: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "User doesn't found!"
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  User.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "User has been deleted!"
    });
  });
});

module.exports = router;