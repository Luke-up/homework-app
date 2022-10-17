import Layout from "../../components/StudentLayout";
import TaskForm from "../../components/TaskForm";
import { Table, Accordion } from "react-bootstrap";
import React, { useEffect } from "react";

//Function renders a list of all task items in student document
function Assignments(props) {
  //Array holds all tasks in student document
  const [tasks, setTasks] = React.useState([]);
  //Boolean value conditionally renders elements on successful fetch request
  const [found, setFound] = React.useState(false);
  //Boolean value renders form displaying task
  const [taskAttempt, setTaskAttempt] = React.useState(false);
  const jsonWebToken = props.jwt;

  //Fetch request gets information from Mongo
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken }),
    };
    const res = await fetch(`/api/studentwordbank`, options);
    const data = await res.json();
    //Array order is reversed so that newest item are shown first
    const reverseOrder = data.reverse();
    setTasks(reverseOrder);
    setFound(true);
  }
  useEffect(() => {
    checkCredentials();
  }, []);

  //Count use to give id values to mapped objects
  let count = -1;

  //If the task needs to be answered it will be rendered with a button
  //Button accesses the form to fill in and submit
  function attemptTask(task) {
    if (task.complete === "false") {
      return (
        <button
          className="btn btn-secondary"
          onClick={() => setTaskAttempt(task)}
        >
          task
        </button>
      );
    } // If the question was already attempted function will render the answer that was given
    if (task.complete === "true") {
      return (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {task.questions.map((a) => {
                return (
                  <tr key={a.question}>
                    <td>{a.question}</td>
                    <td>{a.answer}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="container bg-info text-center border border-dark rounded float-end">
            Effort symbol: {task.effort}
          </div>
        </div>
      );
    }
  }

  return (
    <Layout>
      <div className="container bg-bookShelf2 border border-dark p-4">
        <h1 className="bg-white w-25 text-center mx-auto rounded border">
          Assignments
        </h1>
        {taskAttempt ? (
          <TaskForm
            task={taskAttempt}
            jsonWebToken={jsonWebToken}
            setTaskAttempt={setTaskAttempt}
            checkCredentials={checkCredentials}
          />
        ) : (
          <Accordion>
            {found
              ? tasks.map((task) => {
                  count += 1;
                  return (
                    <Accordion.Item eventKey={count} key={task.title}>
                      <Accordion.Header>
                        <p className="fs-3">
                          {task.title}{" "}
                          {task.complete === "false" ? (
                            <span className="bg-blue text-light fs-5 px-1 rounded">
                              task due
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <h3 className="w-75">{task.text}</h3>
                        <Table>
                          <thead>
                            <tr className="font-ubuntu">
                              <th>Word</th>
                              <th>Definition</th>
                              <th>Sentence</th>
                            </tr>
                          </thead>
                          <tbody>
                            {task.words.map((word) => {
                              return (
                                <tr className="font-ubuntu" key={word.word}>
                                  <td>{word.word}</td>
                                  <td>{word.definition}</td>
                                  <td>{word.sentence}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        {attemptTask(task)}
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })
              : "loading"}
          </Accordion>
        )}
      </div>
    </Layout>
  );
}

export default Assignments;
