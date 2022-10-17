import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//Update entire tasks array in student document
export default async function handler(req, res) {
  if (req.method === "POST") {
    jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      if (err) {
        res.send(err.message);
      } else {
        async function post() {
          const client = await clientPromise;
          const db = client.db("homework");
          const collection = db.collection("student");
          collection.updateOne(
            { _id: ObjectId(req.body.id) },
            {
              $set: {
                tasks: req.body.tasks,
              },
            }
          );
          res.send("200");
        }
        post();
      }
    });
  }
}
