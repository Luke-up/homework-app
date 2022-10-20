import React, { useEffect, useContext } from "react";
import Layout from "../../components/TeacherLayout";
import AppContext from "../../components/AppContext";
import { InputGroup, Button, Form, Accordion, Table } from "react-bootstrap";

function Evaluations(props) {
  //Array holds all tasks marked pending in the school
  const [evaluations, setEvaluations] = React.useState([]);

  const context = useContext(AppContext);
  const jwt = context.state.jwt;

  //Function returns all tasks from students in the school marked pending
  async function getSubmissions() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jwt }),
    };
    const res = await fetch(`/api/evaluations`, options);
    const data = await res.json();
    setEvaluations(data);
  }
  useEffect(() => {
    getSubmissions();
  }, []);

  //Function saves task to database with allocated effort symbol and the complete task marker
  async function submitEvaluation(id, title, task) {
    let item = document.getElementById(id + title);
    item.style.display = "none";
    let effortSymbol = document.getElementById(id + title + "effort");
    let markedTask = task;
    task.effort = effortSymbol.value;
    task.complete = "true";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jwt: jwt,
        id: id,
        task: markedTask,
      }),
    };
    await fetch(`/api/setevaluation`, options);
  }

  //count used for id values in mapped arrays
  let count = 0;

  return (
    <Layout>
      <div>
        <div className="container bg-bookShelf border border-dark p-4">
          <div className="container text-center my-3 p-2">
            <h1 className="bg-white w-50 mx-auto rounded border">
              Pending evaluations
            </h1>
          </div>
          <div className="container my-2 p-4">
            <Accordion>
              {" "}
              <div className="row fs-4 p-2 bg-green rounded border border-dark">
                <p className="col fs-3 font-ubuntu">Student</p>
                <p className="col fs-3 font-ubuntu">Task title</p>
              </div>
              {evaluations
                ? evaluations.map((evaluation) => {
                    count++;
                    return (
                      <Accordion.Item
                        eventKey={count}
                        key={count}
                        id={evaluation.id + evaluation.task.title}
                      >
                        <Accordion.Header className="fs-3">
                          <p className="col fs-4 font-ubuntu">
                            {evaluation.studentName}
                          </p>
                          <p className="col fs-4 font-ubuntu">
                            {evaluation.task.title}
                          </p>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table>
                            <thead>
                              <tr className="fs-4 font-ubuntu">
                                <th>Question</th>
                                <th>Answer</th>
                              </tr>
                            </thead>
                            <tbody>
                              {evaluation.task.questions.map((question) => {
                                return (
                                  <tr
                                    className="fs-4 font-ubuntu"
                                    key={question.question}
                                  >
                                    <td>{question.question}</td>
                                    <td>{question.answer}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                          <InputGroup className="my-4 font-ubuntu">
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
