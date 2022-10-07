import Accordion from "react-bootstrap/Accordion";
import React, { useEffect } from "react";

function Assignments(props) {
  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    setTasks(props.student.tasks);
  }, []);

  let count = 0;

  function taskQuestions(task) {
    if (task.complete === "true" || task.complete === "pending") {
      return task.questions.map((question) => {
        return (
          <div>
            <p>{question.question}</p>
            <p>{question.answer}</p>
          </div>
        );
      });
    } else if (task.complete === "false") {
      return task.questions.map((question) => {
        return (
          <div>
            <p>{question.question}</p>
          </div>
        );
      });
    }
  }

  return (
    <Accordion>
      {tasks.map((task) => {
        count += 1;
        return (
          <Accordion.Item eventKey={count} key={task.title}>
            <Accordion.Header>{task.title}</Accordion.Header>
            <Accordion.Body>
              <h3>{task.text}</h3>
              {task.words
                ? task.words.map((word) => {
                    return (
                      <div key={word.word}>
                        <p>{word.word}</p>
                        <p>{word.definition}</p>
                        <p>{word.sentence}</p>
                      </div>
                    );
                  })
                : ""}
              {taskQuestions(task)}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default Assignments;
