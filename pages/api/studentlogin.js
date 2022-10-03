import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("student");
    // example to get a doc in collection
    await collection
      .find({ name: req.body.type })
      .toArray()
      .then((response) => {
        if (response.length === 0) {
          res.send(req.body);
        } else {
          collection
            .find({ name: req.body.type, password: req.body.password })
            .toArray()
            .then((response) => {
              if (response.length === 0) {
                res.send("406");
              } else {
                console.log(response[0]._id);
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
