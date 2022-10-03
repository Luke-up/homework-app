import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const decoded = jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET);
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("student");
    const data = await collection.find({ _id: ObjectId(decoded) }).toArray();
    const userInfo = {
      name: data[0].name,
      email: data[0].email,
      school: data[0].school,
    };
    console.log(userInfo);
    res.send(userInfo);
  }
}
