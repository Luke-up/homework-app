import clientPromise from "../../lib/mongodb";
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//Find all task objects in all student documents in the school
//Respond with all tasks which have a complete value of pending
export default async function handler(req, res) {
  jwt.verify(req.body.jwt, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) {
      res.send(err.message);
    } else {
      if (req.method === "POST") {
        async function getAnswers() {
          const client = await clientPromise;
          const db = client.db("homework");
          const collection = db.collection("teacher");
          const data = await collection.find({ _id: ObjectId(id) }).toArray();
          const school = data[0].school;
          const studentCol = db.collection("student");
          const studentBody = await studentCol
            .find({ school: school })
            .toArray();
          let answersArray = [];
          studentBody.map((student) => {
            return student.tasks.map((task) => {
              if (task.complete === "pending") {
                const answerObject = {
                  studentName: student.name,
                  id: student._id,
                  task: task,
                };
                answersArray.push(answerObject);
              }
            });
          });
          res.send(answersArray);
        }
        getAnswers();
      }
    }
  });
}
