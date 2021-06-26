const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

exports.addDoc = (req, res) => {
  let { name, email, password, specialization } = req.body;
  let doctor = new Doctor({ name, email, password, specialization });

  doctor
    .save()
    .then(() => {
      console.info(`New doctor assigned: ${doctor.name}`);
      return res.status(200).send(`New doctor assigned: ${doctor.name}`);
    })
    .catch((error) => {
      console.error("Error creating doctor\n", error);
      return res.status(500).send("Error creating doctor");
    });
};

exports.assignDoc = (req, res) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  let { did } = req.body;
  did = mongoose.Types.ObjectId(did);

  // assign a valid doctor
  Doctor.findOne({ _id: did })
    .then((record) => {
      if (record) {
        // if doctor with 'did' exists, then assign it to appointment with id 'id'
        Appointment.updateOne({ _id: id, }, { $set: {did: did} })
          .then((updateResult) => {
            if ( updateResult.nModified >= 0 && updateResult.n >= 1 && updateResult.ok >= 1) {
              console.info(`Doctor: ${did} assigned to appointment: ${id}`);
              return res.status(200).send(`Doctor: ${did} assigned to appointment: ${id}`);
            }
            console.warn(`No appointment with id: ${id}`);
            return res.status(404).send(`No appointment with id: ${id}`);
          })
          .catch((error) => {
            console.error("Error querying database", error);
            return res.status(500).send("Error querying database");
          });
      }
      else {
        // doctor with 'did' does not exist.
        console.warn(`Doctor ${did} does not exist. Assign a valid doctor`);
        return res.status(401).send(`Doctor ${did} does not exist. Assign a valid doctor`);
      }
    })
    .catch((error) => {
      console.error("Error querying database for doctor\n", error);
      return res.status(500).send("Error querying database for doctor");
    });
};

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
