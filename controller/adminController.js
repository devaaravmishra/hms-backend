const mongoose = require("mongoose");
const Admin = require("../models/Admin");

exports.login = (req, res) => {
  let { email, password } = req.body;

  Admin.findOne({ email: email, password: password })
    .then((record) => {
      if (record) {
        console.info(`Welcome back, ${email}`);
        return res.status(200).send(`Welcome back, ${email}`);
      }
      console.warn("Wrong username or password");
      return res.status(404).send("Wrong username or password");
    })
    .catch((error) => {
      console.error("Error querying database\n", error);
      return res.status(500).send("Error querying database");
    });
};

exports.signup = (req, res) => {
  let { name, email, password } = req.body;
  let admin = new Admin({ name, email, password });

  admin
    .save()
    .then(() => {
      console.info(`New admin assigned: ${admin.name}`);
      return res.status(200).send(`New admin assigned: ${admin.name}`);
    })
    .catch((error) => {
      console.error("Error creating admin\n", error);
      return res.status(500).send("Error creating admin");
    });
};
