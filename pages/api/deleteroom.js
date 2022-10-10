import clientPromise from "../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) {
      res.send(err.message);
    } else {
      async function search() {
        const client = await clientPromise;
        const db = client.db("homework");
        const collection = db.collection("teacher");
        collection.updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              rooms: req.body.rooms,
            },
          }
        );
        const studentCol = db.collection("student");
        studentCol.updateMany(
          { room: req.body.delete },
          {
            $set: {
              room: "unassigned",
            },
          }
        );
        res.send("200");
      }
      search();
    }
  });
}
