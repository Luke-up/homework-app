import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.type);
    const client = await clientPromise;
    const db = client.db("homework");
    const collection = db.collection("student");
    // example to get a doc in collection
    await collection
      .find({ name: req.body.type })
      .toArray()
      .then((response) => {
        console.log(response);
        if (response.length === 0) {
          res.send("404");
        } else {
          collection
            .find({ name: req.body.type, password: req.body.password })
            .toArray()
            .then((response) => {
              if (response.length === 0) {
                res.send("406");
              } else {
                const accessTOKEN = jwt.sign(
                  { name: req.body.userName },
                  process.env.ACCESS_TOKEN_SECRET
                );
                res.json({ accesstoken: accessTOKEN });
              }
            });
        }
      });
  }
  //   } else {
  //     const client = await clientPromise;
  //     const db = client.db("homework");
  //     const collection = db.collection("student");
  //     // example to get a doc in collection
  //     const doc = await collection.find().toArray();

  //     res.json(doc);
  //   }
}
