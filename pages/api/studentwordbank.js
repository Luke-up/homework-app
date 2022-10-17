import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//Send all tasks in student document
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
          res.send(data[0].tasks);
        }
        search();
      }
    });
  }
}
