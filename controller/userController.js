const mongoose = require("mongoose");
const Patient = require("../models/Patient");

exports.login = (req, res) => {
  let { email, password } = req.body;

  Patient.findOne({ email: email, password: password })
    .then((record) => {
      if (record) {
        console.info(`Welcome back, ${email}`);
        return res.status(200).send(`Welcome back, ${email}`);
      }
      console.warn("Wrong username or password");
      return res.status(404).send("Wrong username or password");
    })
    .catch((error) => {
      console.error(error);
      return res.send(500).send("Error querying database");
    });
};

exports.signup = (req, res) => {
  let { name, email, password, age } = req.body;
  let patient = new Patient({ name, email, password, age });

  patient
    .save()
    .then(() => {
      console.info(`New user created: ${name}`);
      return res.status(200).send(`New user created: ${name}`);
    })
    .catch((error) => {
      console.error("Error creating user\n", error);
      return res.status(500).send("Error creating user");
    });
};
