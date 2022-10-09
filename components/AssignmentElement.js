import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import React, { useEffect } from "react";

function AssignmentElement(props) {
  function taskQuestions(task) {
    if (task.complete === "true" || task.complete === "pending") {
      return (
        <Table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {task.questions.map((question) => {
              return (
                <tr key={String(question.question)}>
                  <td>{question.question}</td>
                  <td>{question.answer}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else if (task.complete === "false") {
      return (
        <Table>
          <thead>
            <tr>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>
            {task.questions.map((question) => {
              return (
                <tr key={String(question.question)}>
                  <td>{question.question}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  }

  function editButtons(task) {
    return (
      <ButtonGroup className="float-end" aria-label="Basic example">
        <Button variant="secondary">Re-open task</Button>
        <Button variant="secondary">Edit effort</Button>
        <Button variant="secondary">Delete Task</Button>
      </ButtonGroup>
    );
  }

  //Finish this function
  function openTask(thisTask) {
    tasks.map((task) => {
      if (task.title === thisTask.title) {
        task.title = "false";
      }
    });
  }

  let count = 0;

  return (
    <Accordion>
      <Table>
        <thead>
          <tr>
            {" "}
            <div className="row">
              <th className="col">Title</th>
              <th className="col">Complete</th>
              <th className="col">Effort</th>
              <th className="col">Date</th>
            </div>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((task) => {
            count += 1;
            return (
              <Accordion.Item eventKey={count} key={task.title}>
                <Accordion.Header>
                  <td className="col">{task.title}</td>
                  <td className="col">{task.complete}</td>
                  <td className="col">{task.effort}</td>
                  <td className="col">{task.title}</td>
                </Accordion.Header>
                <Accordion.Body>
                  {editButtons(task)}
                  <h3>{task.text}</h3>
                  <Table>
                    <thead>
                      <tr>
                        <th>Word</th>
                        <th>Definition</th>
                        <th>Sentence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {task.words
                        ? task.words.map((word) => {
                            return (
                              <tr key={word.word}>
                                <td>{word.word}</td>
                                <td>{word.definition}</td>
                                <td>{word.sentence}</td>
                              </tr>
                            );
                          })
                        : ""}
                    </tbody>
                  </Table>
                  {taskQuestions(task)}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </tbody>
      </Table>
    </Accordion>
  );
}

export default AssignmentElement;
