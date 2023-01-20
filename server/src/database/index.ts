import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//mongoConnectionInformations
const mongoConn = {
  user: process.env.BD_USER, //"jackie098",
  password: process.env.BD_PASSWORD, //"first-crud-with-mongo",
  cluster: process.env.BD_CLUSTER, //"first-crud-with-mongo",
};

// TODO: Implements a class here
mongoose.connect(
  `mongodb+srv://${mongoConn.user}:${mongoConn.password}@${mongoConn.cluster}.eaatydm.mongodb.net/?retryWrites=true&w=majority`,
  {},
  (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("Connected with successfully");
  }
);

mongoose.Promise = global.Promise;

export default mongoose;

// export default mongoConnectionInformations;
