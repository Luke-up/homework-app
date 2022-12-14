import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//Delete task from array in teacher document
export default async function handler(req, res) {
  jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) {
      res.send(err.message);
    } else {
      if (req.method === "POST") {
        async function deleteTasks() {
          const client = await clientPromise;
          const db = client.db("homework");
          const collection = db.collection("teacher");
          await collection.updateOne(
            { _id: ObjectId(id) },
            { $pull: { tasks: { title: req.body.task.title } } }
          );
          res.send(["task: " + req.body.task.title + " deleted"]);
        }
        deleteTasks();
      }
    }
  });
}
