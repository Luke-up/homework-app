import React, { useEffect } from "react";
import Layout from "../../components/TeacherLayout";
import RoomGrid from "../../components/RoomGrid";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Accordion, Table } from "react-bootstrap";

function Evaluations(props) {
  const [evaluations, setEvaluations] = React.useState([]);
  const jsonWebToken = props.jwt;

  async function getSubmissions() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken }),
    };
    const res = await fetch(`/api/evaluations`, options);
    const data = await res.json();
    setEvaluations(data);
    console.log(data);
  }
  useEffect(() => {
    getSubmissions();
  }, []);

  //   function submitEvaluation() {}

  let count = 0;
  return (
    <Layout>
      <div>
        <div className="container bg-light border-dark border rounded">
          <div className="container bg-secondary rounded my-4 p-2">
            <h1>Pending evaluations</h1>
          </div>
          <div className="container rounded border my-2">
            <Accordion>
              {" "}
              <div className="row fs-4 px-2">
                <p className="col">Student</p>
                <p className="col">Task title</p>
              </div>
              {evaluations
                ? evaluations.map((evaluation) => {
                    count += 1;
                    return (
                      <Accordion.Item
                        className="border-light bg-light"
                        eventKey={count}
                        key={count}
                        id={count}
                      >
                        <Accordion.Header className="py-0 rounded border">
                          <p className="col">{evaluation.studentName}</p>
                          <p className="col">{evaluation.task.title}</p>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table>
                            <thead>
                              <tr>
                                <th>Question</th>
                                <th>Answer</th>
                              </tr>
                            </thead>
                            <tbody>
                              {evaluation.task.questions.map((question) => {
                                return (
                                  <tr>
                                    <td>{question.question}</td>
                                    <td>{question.answer}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })
                : ""}
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Evaluations;
