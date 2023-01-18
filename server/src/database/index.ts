import mongoose from "mongoose";

//mongoConnectionInformations
const mongoConn = {
  user: "jackie098",
  password: "first-crud-with-mongo",
  cluster: "first-crud-with-mongo",
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
