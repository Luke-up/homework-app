import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("homework");
  const collection = db.collection("student");
  // example to get a doc in collection
  const doc = await collection.find().toArray();

  res.json(doc);
}
