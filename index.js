const app = require("./app")

const PORT = 7000;

app.listen(PORT, () => {
    console.info(`Server is running on PORT: ${PORT}`);
  });