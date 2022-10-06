import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("homework");
  const collection = db.collection("teacher");
  // example to get a doc in collection
  const doc = await collection.insertOne({
    school: req.body.school,
    password: req.body.password,
    email: req.body.email,
    schoolCode: req.body.schoolCode,
    rooms: ["unassigned"],
  });
  res.json("user created");
}
