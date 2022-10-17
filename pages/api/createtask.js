import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//Create a new task object and add to teacher and student documents
export default async function handler(req, res) {
  if (req.method === "POST") {
    jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      if (err) {
        res.send(err.message);
      } else {
        async function post() {
          const client = await clientPromise;
          const db = client.db("homework");
          const teacherCol = db.collection("teacher");
          const sameName = await teacherCol
            .find(
              { _id: ObjectId(id) } && {
                tasks: { title: req.body.task.title, room: req.body.task.room },
              }
            )
            .toArray();
          if (sameName.length !== 0) {
            res.send("Title already exists");
          } else {
            const collection = db.collection("student");
            collection.updateMany(
              { room: req.body.task.room },
              {
                $push: {
                  tasks: req.body.task,
                },
              }
            );
            teacherCol.updateOne(
              { _id: ObjectId(id) },
              {
                $push: {
                  tasks: req.body.task,
                },
              }
            );

            res.send("200");
          }
        }
        post();
      }
    });
  }
}
