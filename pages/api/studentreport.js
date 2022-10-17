import clientPromise from "../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");

//Send the student object and an array of all current rooms
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
          const response = await collection
            .find({
              _id: ObjectId(req.body.id),
            })
            .toArray();
          const teachCol = db.collection("teacher");
          const teacher = await teachCol.find({ _id: ObjectId(id) }).toArray();
          res.send([response, teacher[0].rooms]);
        }
        search();
      }
    });
  }
}
