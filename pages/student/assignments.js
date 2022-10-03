import Layout from "../../components/StudentLayout";
import TaskForm from "../../components/TaskForm";
import Accordion from "react-bootstrap/Accordion";
import React, { useEffect } from "react";
function assignments(props) {
  const [tasks, setTasks] = React.useState({});
  const [found, setFound] = React.useState(false);
  const [taskAttempt, setTaskAttempt] = React.useState(false);
  const jsonWebToken = props.jwt;
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken }),
    };
    //end point is different to the dashboard as it will return different information
    const res = await fetch(`/api/studentwordbank`, options);
    const data = await res.json();
    setTasks(data);
    setFound(true);
  }
  useEffect(() => {
    checkCredentials();
  }, []);

  let count = -1;

  function attemptTask(completion, task) {
    if (completion === "false") {
      return <button onClick={() => setTaskAttempt(task)}>task</button>;
    }
  }

  return (
    <Layout>
      <div>
        <h1>student assignments page</h1>
        {taskAttempt ? (
          <TaskForm
            task={taskAttempt}
            jsonWebToken={jsonWebToken}
            setTaskAttempt={setTaskAttempt}
          />
        ) : (
          <Accordion>
            {found
              ? tasks.map((task) => {
                  count += 1;
                  return (
                    <Accordion.Item eventKey={count}>
                      <Accordion.Header>{task.title}</Accordion.Header>
                      <Accordion.Body>
                        <h3>{task.text}</h3>
                        {task.words.map((word) => {
                          return (
                            <div key={word.word}>
                              <p>{word.word}</p>
                              <p>{word.definition}</p>
                              <p>{word.sentence}</p>
                            </div>
                          );
                        })}
                        {attemptTask(task.complete, task)}
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

export default assignments;
