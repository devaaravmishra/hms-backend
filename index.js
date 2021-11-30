const app = require("./app")

const {PORT} = process.env

app.listen(PORT, () => {
    console.info(`Server is running on PORT: ${PORT}`);
  });