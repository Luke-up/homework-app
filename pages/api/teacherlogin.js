import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("teacher");
    // example to get a doc in collection
    await collection
      .find({ school: req.body.school })
      .toArray()
      .then((response) => {
        if (response.length === 0) {
          res.send("School not found");
        } else {
          collection
            .find({ school: req.body.school, password: req.body.password })
            .toArray()
            .then((response) => {
              if (response.length === 0) {
                res.send("Password incorrect");
              } else {
                const payload = { id: response[0]._id };
                const accessTOKEN = jwt.sign(
                  payload,
                  process.env.ACCESS_TOKEN_SECRET
                );
                res.json({ accesstoken: accessTOKEN });
              }
            });
        }
      });
  }
}
