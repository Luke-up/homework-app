import clientPromise from "../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");

//Set room field of all students with selected room value to unassigned
export default async function handler(req, res) {
  jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) {
      res.send(err.message);
    } else {
      async function search() {
        const client = await clientPromise;
        const db = client.db("homework");
        const collection = db.collection("student");
        collection.updateMany(
          { room: req.body.roomName },
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
