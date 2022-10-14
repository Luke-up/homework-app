import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) {
      res.send(err.message);
    } else {
      if (req.method === "POST") {
        async function setEffort() {
          const client = await clientPromise;
          const db = client.db("homework");
          const collection = db.collection("student");
          collection.updateOne(
            { _id: ObjectId(req.body.id) },
            { $pull: { tasks: { title: req.body.task.title } } }
          );
          collection.updateOne(
            { _id: ObjectId(req.body.id) },
            {
              $push: {
                tasks: req.body.task,
              },
            }
          );
          collection.updateOne(
            { _id: ObjectId(req.body.id) },
            {
              $set: {
                effort: req.body.task.effort,
              },
            }
          );
          res.send(["Task marked : " + req.body.task.title]);
        }
        setEffort();
      }
    }
  });
}
