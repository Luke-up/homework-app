import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

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
            {task.questions
              ? task.questions.map((question) => {
                  return (
                    <tr key={String(question.question)}>
                      <td>{question.question}</td>
                      <td>{question.answer}</td>
                    </tr>
                  );
                })
              : ""}
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
            {task.questions
              ? task.questions.map((question) => {
                  return (
                    <tr key={String(question.question)}>
                      <td>{question.question}</td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </Table>
      );
    }
  }

  function effortChange(letter, thisTask) {
    let newArray = props.tasks.filter((task) => task.title !== thisTask.title);
    console.log(letter + thisTask);
    let alterTask = thisTask;
    alterTask.effort = letter;
    newArray.push(alterTask);
    postChanges(newArray);
    props.setTasks(newArray);
  }

  function editButtons(task) {
    return (
      <ButtonGroup className="float-end" aria-label="Basic example">
        <Button
          className="w-100"
          variant="secondary"
          onClick={() => openTask(task)}
        >
          Re-open task
        </Button>
        <Form.Select onChange={(e) => effortChange(e.target.value, task)}>
          <option>Edit effort</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="A-">A-</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </Form.Select>
        <Button
          onClick={() => deleteTask(task)}
          className="w-100"
          variant="secondary"
        >
          Delete Task
        </Button>
      </ButtonGroup>
    );
  }

  function openTask(thisTask) {
    let newArray = props.tasks.filter((task) => task.title !== thisTask.title);
    let openedTask = thisTask;
    openedTask.complete = "false";
    newArray.push(openedTask);
    postChanges(newArray);
    props.setTasks(newArray);
  }
  function deleteTask(thisTask) {
    let newArray = props.tasks.filter((task) => task.title !== thisTask.title);
    const element = document.getElementById(thisTask.title);
    element.style.display = "none";
    postChanges(newArray);
    props.setTasks(newArray);
  }

  let count = 0;

  const router = useRouter();
  const { id } = router.query;

  async function postChanges(taskArray) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jwt: props.jsonWebToken,
        id: id,
        tasks: taskArray,
      }),
    };
    const res = await fetch(`/api/postchanges`, options);
    const data = await res.json();
  }

  return (
    <Accordion>
      {" "}
      <div className="row fs-4 px-2">
        <p className="col">Title</p>
        <p className="col">Complete</p>
        <p className="col">Effort</p>
        <p className="col">Date</p>
      </div>
      {props.tasks.map((task) => {
        count += 1;
        return (
          <Accordion.Item
            className="border-light bg-light"
            eventKey={count}
            key={task.title}
            id={task.title}
          >
            <Accordion.Header className="py-0 rounded border">
              <p className="col">{task.title}</p>
              <p className="col">{task.complete}</p>
              <p className="col">
                {task.complete === "true" ? task.effort : ""}
              </p>
              <p className="col">{task.title}</p>
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
    </Accordion>
  );
}

export default AssignmentElement;
