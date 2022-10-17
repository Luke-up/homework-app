import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//Send student data
export default async function handler(req, res) {
  jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) {
      res.send(err.message);
    } else {
      if (req.method === "POST") {
        async function sendUser() {
          const client = await clientPromise;
          const db = client.db("homework");
          const collection = db.collection("student");
          const data = await collection.find({ _id: ObjectId(id) }).toArray();
          const userInfo = {
            name: data[0].name,
            room: data[0].room,
            effort: data[0].effort,
            tasks: data[0].tasks,
          };
          res.send(userInfo);
        }
        sendUser();
      }
    }
  });
}
