const mongoose = require("mongoose");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");

exports.getApt = (req, res) => {
  let { userId } = req.params;
  userId = mongoose.Types.ObjectId(userId);

  Appointment.find({ pid: userId })
    .then((apts) => {
      if (apts.length === 0) {
        console.info(`No appointments of user: ${userId}`);
        return res.status(404).send([]);
      }

      console.info(`All appointments found of user: ${userId}`);
      return res.status(200).send(apts);
    })
    .catch((error) => {
      console.error(`Error querying database\n`, error);
      return res.status(500).send("Error querying database");
    });
};

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
      console.error("Error querying database\n", error);
      return res.send(500).send("Error querying database");
    });
};

exports.makeApt = (req, res) => {
  let { pid, date, slot } = req.body;
  pid = mongoose.Types.ObjectId(pid);
  appointment = new Appointment({ pid, date, slot});

  appointment.save()
    .then(() => {
      console.info(`New appointment created: ${pid}`);
      return res.status(200).send(`New appointment created: ${pid}`);
    })
    .catch((error) => {
      console.error("Error creating appointment\n", error);
      return res.status(500).send("Error creating appointment");
    })
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
