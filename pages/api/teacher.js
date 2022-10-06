import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const decoded = jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET);
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("teacher");
    const data = await collection.find({ _id: ObjectId(decoded) }).toArray();
    console.log("school information =" + data);
    const schoolInfo = {
      school: data[0].school,
    };
    const studentCol = db.collection("student");
    const students = await studentCol.find(schoolInfo).toArray();
    console.log("students found = " + students);
    res.send([students, data[0].rooms]);
  }
}
