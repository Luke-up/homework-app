import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//Send a list of rooms in school and an array of all the students in the school
export default function handler(req, res) {
  if (req.method === "POST") {
    jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      if (err) {
        res.send(err.message);
      } else {
        async function search() {
          const client = await clientPromise;
          const db = client.db("homework");
          const collection = db.collection("teacher");
          const data = await collection.find({ _id: ObjectId(id) }).toArray();
          const schoolInfo = {
            school: data[0].school,
          };
          const studentCol = db.collection("student");
          const students = await studentCol.find(schoolInfo).toArray();
          res.send([students, data[0].rooms]);
        }
        search();
      }
    });
  }
}
