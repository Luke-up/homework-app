import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("teacher");
    const schoolCheck = await collection.find({ name: "teacher1" });
    if (schoolCheck._eventsCount == 0) {
      res.json(schoolCheck);
    } else {
      res.json("403");
    }
  }
}
