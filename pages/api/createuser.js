import clientPromise from "../../lib/mongodb";

//Create a new student document
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("homework");
  const collection = db.collection("student");
  const emailCheck = collection.find({ email: req.body.email });
  if (emailCheck._eventsCount == "0") {
    await collection.insertOne({
      name: req.body.name,
      password: req.body.password,
      school: req.body.school,
      email: req.body.email,
      tasks: [],
      room: "unassigned",
      effort: "x",
      join: req.body.join,
    });
    res.json("user created");
  } else {
    res.json("email already exists");
  }
}
