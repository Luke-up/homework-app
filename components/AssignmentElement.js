import { Accordion, Table, Button, ButtonGroup, Form } from "react-bootstrap";
import React from "react";
import { useRouter } from "next/router";

//Renders an accordian component showing the tasks and details for both students and teachers.
function AssignmentElement(props) {
  //Renders question answers if the were entered
  function taskQuestions(task) {
    if (task.complete === "true" || task.complete === "pending") {
      return (
        <Table>
          <thead>
            <tr className="font-ubuntu">
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {task.questions
              ? task.questions.map((question) => {
                  return (
                    <tr className="font-ubuntu" key={String(question.question)}>
                      <td>{question.question}</td>
                      <td>{question.answer}</td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </Table>
      );
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th className="font-ubuntu">Question</th>
            </tr>
          </thead>
          <tbody>
            {task.questions
              ? task.questions.map((question) => {
                  return (
                    <tr className="font-ubuntu" key={String(question.question)}>
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

  //Function removes the current task from the array
  //Function sets a different effort value to the task, then adds it back to the array
  function effortChange(letter, thisTask) {
    let newArray = props.tasks.filter((task) => task.title !== thisTask.title);
    let alterTask = thisTask;
    alterTask.effort = letter;
    newArray.push(alterTask);
    PostChanges(newArray);
    props.setTasks(newArray);
  }

  //Function deletes the task from the teacher document in the database
  function deleteTaskRecord(task) {
    const informationBar = document.getElementById(task.title);
    informationBar.style.display = "none";
    async function deleteFromDatabase(task) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jwt: props.jsonWebToken,
          task: task,
        }),
      };
      await fetch(`/api/deletetask`, options);
    }
    deleteFromDatabase(task);
  }

  //Function conditionally renders delete button linked to the teacher database
  //Function conditionally renders 3 buttons to edit the data for individual students
  function editButtons(task) {
    if (props.original) {
      return (
        <Button
          className="float-end"
          variant="danger"
          onClick={() => deleteTaskRecord(task)}
        >
          Delete task record
        </Button>
      );
    }
    return (
      <ButtonGroup className="float-end" aria-label="Basic example">
        <Button className="w-100" variant="info" onClick={() => openTask(task)}>
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
          variant="danger"
        >
          Delete Task
        </Button>
      </ButtonGroup>
    );
  }

  //Function will make the task available for the student to try again
  function openTask(thisTask) {
    let newArray = props.tasks.filter((task) => task.title !== thisTask.title);
    let openedTask = thisTask;
    openedTask.complete = "false";
    newArray.push(openedTask);
    PostChanges(newArray);
    props.setTasks(newArray);
  }

  //Function will delete selected task for student
  function deleteTask(thisTask) {
    let newArray = props.tasks.filter((task) => task.title !== thisTask.title);
    const element = document.getElementById(thisTask.title);
    element.style.display = "none";
    PostChanges(newArray);
    props.setTasks(newArray);
  }

  //counted used as id when mapping array
  let count = 0;

  //Function saves alterations to data in the database
  async function PostChanges(taskArray) {
    //ID of the student is taken from the url params
    //Used by teacher user when editing student data
    const router = useRouter();
    const { id } = router.query;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jwt: props.jsonWebToken,
        id: id,
        tasks: taskArray,
      }),
    };
    await fetch(`/api/postchanges`, options);
  }

  return (
    <Accordion>
      {" "}
      {props.original ? (
        ""
      ) : (
        <div className="row fs-4 px-2 font-ubuntu">
          <p className="col">Title</p>
          <p className="col">Complete</p>
          <p className="col">Effort</p>
        </div>
      )}
      {props.tasks.map((task) => {
        count += 1;
        return (
          <Accordion.Item
            className="border border-light"
            eventKey={count}
            key={task.title}
            id={task.title}
          >
            <Accordion.Header className="py-0 rounded border">
              <p className="col fs-4">{task.title}</p>
              {props.original ? (
                ""
              ) : (
                <p className="col fs-4">{task.complete}</p>
              )}

              <p className="col fs-4">
                {task.complete === "true" ? task.effort : ""}
              </p>
            </Accordion.Header>
            <Accordion.Body className="bg-light">
              {editButtons(task)}
              <div className="w-75">
                <h3>{task.text}</h3>
              </div>

              <Table>
                <thead>
                  <tr className="font-ubuntu">
                    <th>Word</th>
                    <th>Definition</th>
                    <th>Sentence</th>
                  </tr>
                </thead>
                <tbody>
                  {task.words
                    ? task.words.map((word) => {
                        return (
                          <tr className="font-ubuntu" key={word.word}>
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
