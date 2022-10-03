import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.jwt);
    const decoded = jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded.id);
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("student");
    const data = await collection.find({ _id: ObjectId(decoded) }).toArray();
    const userInfo = {
      name: data[0].name,
      room: data[0].room,
      effort: data[0].effort,
      tasks: data[0].tasks,
    };
    console.log(userInfo);
    res.send(userInfo);
  }
}
