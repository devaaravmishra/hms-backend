const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const adminRoute = require("./routes/adminRoute");

const PORT = 7000;
const DBPORT = 27017;

mongoose
  .connect(`mongodb://localhost:${DBPORT}/hms`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.info(`Connected to database at PORT: ${DBPORT}`);
  })
  .catch(() => {
    console.error(`Error connecting to database at PORT: ${DBPORT}`);
  });

app.listen(PORT, () => {
  console.info(`Server is running on PORT: ${PORT}`);
});

app.use("/admin", adminRoute);
