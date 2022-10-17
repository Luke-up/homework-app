import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//Send some data points from student document
export default async function handler(req, res) {
  if (req.method === "POST") {
    jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      if (err) {
        res.send(err.message);
      } else {
        async function search() {
          const client = await clientPromise;
          const db = client.db("homework");
          const collection = db.collection("student");
          const data = await collection.find({ _id: ObjectId(id) }).toArray();
          const userInfo = {
            name: data[0].name,
            email: data[0].email,
            school: data[0].school,
          };
          res.send(userInfo);
        }
        search();
      }
    });
  }
}
