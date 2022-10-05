import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("teacher");
    const data = await collection
      .find({
        school: req.body.school,
        schoolcode: req.body.schoolcode,
      })
      .toArray();
    if (data[0] === undefined) {
      res.send(403);
    } else if (data[0].school === req.body.school) {
      res.send(200);
    } else {
      res.send(404);
    }
  }
}
