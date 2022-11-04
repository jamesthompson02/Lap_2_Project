const { connectDB, server } = require("./server");
require("dotenv").config();
const setUpTimer = require('./streak-config')
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Express server listening to port ${port}!`)
    );
    setUpTimer();
  } catch (err) {
    console.log(err);
  }
};

start();
