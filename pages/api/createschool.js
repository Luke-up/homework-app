import clientPromise from "../../lib/mongodb";

//Add a new teacher document to the collection
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("homework");
  const collection = db.collection("teacher");
  await collection.insertOne({
    school: req.body.school,
    password: req.body.password,
    email: req.body.email,
    schoolCode: req.body.schoolCode,
    rooms: ["unassigned"],
  });
  res.json("user created");
}
