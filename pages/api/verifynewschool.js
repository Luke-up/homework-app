import clientPromise from "../../lib/mongodb";

//Check collection for existing schools
export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("teacher");
    const schoolCheck = collection.find({ name: req.body.school });
    if (schoolCheck._eventsCount == 0) {
      res.json(schoolCheck);
    } else {
      res.json("403");
    }
  }
}
