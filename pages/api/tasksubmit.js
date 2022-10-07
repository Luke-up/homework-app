import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

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
          collection.updateOne(
            { _id: ObjectId(id) },
            {
              $set: {
                "tasks.$[current].questions": req.body.answers,
                "tasks.$[current].complete": "pending",
              },
            },
            { arrayFilters: [{ "current.title": req.body.title }] }
          );
          res.send("200");
        }
        search();
      }
    });
  }
}
