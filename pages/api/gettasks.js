import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//Respond with all tasks with the corresponding roomName value
export default async function handler(req, res) {
  jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) {
      res.send(err.message);
    } else {
      if (req.method === "POST") {
        async function getTasks() {
          const client = await clientPromise;
          const db = client.db("homework");
          const collection = db.collection("teacher");
          const data = await collection.find({ _id: ObjectId(id) }).toArray();
          const tasksArray = data[0].tasks;
          if (tasksArray) {
            res.send(tasksArray);
          } else {
            res.send(404);
          }
        }
        getTasks();
      }
    }
  });
}
