const express = require("express");

const User = require("../models/userSchema");

const router = express.Router();

router.post(
  "",
  (req, res, next) => {
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
  const userNameInput = req.query.userName;
  console.log("userName = " + userNameInput);
  if(!userNameInput)
  {
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
  }
  else
  {
    console.log("user get by user name");
    var query = { userName: userNameInput };
    console.log("query = " + query);

    User.findOne(query).then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "userName not found!"
        });
      }
    });
  }
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