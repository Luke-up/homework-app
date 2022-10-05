import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const decoded = jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET);
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("student");
    collection.updateOne(
      { _id: ObjectId(decoded) },
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
}
