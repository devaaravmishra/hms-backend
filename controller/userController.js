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

  Patient.findOne({ email: email })
    .then((user) => {
      console.info(`User ${email} found`);
      if (password === user.password) {
        console.info(`Welcome back, ${email}`);
        return res.status(200).send({ user });
      }
      console.warn("Incorrect password");
      return res.status(401).send("Incorrect password");
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

  Patient.findOne({ _id: pid })
    .then((user) => {
      if (user) {
        appointment.save()
          .then(() => {
            console.info(`New appointment created for patient ${pid}`);
            return res.status(200).send(`New appointment created for patient ${pid}`);
          })
          .catch((error) => {
            console.error("Error creating appointment\n", error);
            return res.status(500).send("Error creating appointment");
          });
      }
      else {
        console.warn(`User ${pid} does not exists`);
        return res.status(401).send(`User ${pid} does not exists`);
      }
    })
    .catch((error) => {
      console.error(`Can't find user ${pid}`, error);
    });
};

exports.signup = (req, res) => {
  let { name, email, password, age } = req.body;
  let user = new Patient({ name, email, password, age });

  user
    .save()
    .then(() => {
      console.info(`New user created: ${name}`);
      return res.status(200).send({ user });
    })
    .catch((error) => {
      console.error("Error creating user\n", error);
      return res.status(500).send("Error creating user");
    });
};

exports.view = (req, res) => {
  Patient.find().then((users) => {
    res.status(200).send({users})
  }).catch((error) => {
    res.status(404).send("No users found!")
  })
}