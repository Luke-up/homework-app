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
  }
  useEffect(() => {
    getSubmissions();
  }, []);

  async function submitEvaluation(id, title, task) {
    let item = document.getElementById(id + title);
    item.style.display = "none";
    console.log(id);
    let effortSymbol = document.getElementById(id + title + "effort");
    let markedTask = task;
    task.effort = effortSymbol.value;
    task.complete = "true";
    console.log(markedTask);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jwt: jsonWebToken,
        id: id,
        task: markedTask,
      }),
    };
    const res = await fetch(`/api/setevaluation`, options);
    const data = await res.json();
    console.log(data);
  }

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
                    count++;
                    return (
                      <Accordion.Item
                        className="bg-light"
                        eventKey={count}
                        key={count}
                        id={evaluation.id + evaluation.task.title}
                      >
                        <Accordion.Header className="fs-3">
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
                          <InputGroup className="my-4">
                            <Form.Select
                              id={
                                evaluation.id + evaluation.task.title + "effort"
                              }
                            >
                              <option>Effort symbols</option>
                              <option value="A+">
                                A+ = Showing advanced reasoning and thought
                                beyond the scope of the questions
                              </option>
                              <option value="A">
                                A = All questions answered correctly, or
                                reasoned sufficiently{" "}
                              </option>
                              <option value="A-">
                                A- = Almost all correct, small room to improve
                              </option>
                              <option value="B">
                                B = Some answers incorrect or lacking detail
                              </option>
                              <option value="C">
                                C = Most answers incorrect or lacking detail
                              </option>
                              <option value="D">
                                D = Little to no effort applied{" "}
                              </option>
                            </Form.Select>
                            <Button
                              className="btn border"
                              onClick={() => {
                                submitEvaluation(
                                  evaluation.id,
                                  evaluation.task.title,
                                  evaluation.task
                                );
                              }}
                            >
                              {" "}
                              Submit evaluation
                            </Button>
                          </InputGroup>
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
