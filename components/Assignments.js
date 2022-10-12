import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, { useEffect } from "react";
import AssignmentElement from "./AssignmentElement";

function Assignments(props) {
  const [tasks, setTasks] = React.useState([]);
  const [pending, setPending] = React.useState(true);
  const [complete, setComplete] = React.useState(true);
  const [incomplete, setIncomplete] = React.useState(true);

  function loadPage() {
    if (props.tasks) {
      setTasks(props.tasks);
    }
  }
  function filterTable() {
    const newArray = props.tasks;
    const result = newArray.filter(checkComplete);
    console.log(result);
    setTasks(result);
  }
  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    filterTable();
  }, [pending, complete, incomplete]);

  function checkComplete(task) {
    if (!pending) {
      if (!complete) {
        if (!incomplete) {
          return (
            task.complete !== "pending" &&
            task.complete !== "true" &&
            task.complete !== "false"
          );
        } else {
          return task.complete == "false";
        }
      } else if (!incomplete) {
        return task.complete == "true";
      } else {
        return task.complete !== "pending";
      }
    } else if (!complete) {
      if (!incomplete) {
        return task.complete == "pending";
      } else {
        return task.complete !== "true";
      }
    } else if (!incomplete) {
      return task.complete !== "false";
    } else {
      return task.complete !== "x";
    }
  }

  function effortSymbol(percentage) {
    if (percentage === "x") {
      return "Pending";
    } else if (percentage > 89) {
      return "A+";
    } else if (percentage > 79) {
      return "A";
    } else if (percentage > 69) {
      return "B+";
    } else if (percentage > 59) {
      return "B";
    } else if (percentage > 49) {
      return "C";
    } else {
      return "D";
    }
  }

  function checkBox(value) {
    const formElement = document.getElementById(value + "Checkbox");
    if (formElement.checked === true) {
      formElement.setAttribute("checked", false);
      if (formElement.value === "pending") {
        setPending(true);
      } else if (formElement.value === "complete") {
        setComplete(true);
      } else {
        setIncomplete(true);
      }
    } else {
      formElement.setAttribute("checked", true);
      if (formElement.value === "pending") {
        setPending(false);
      } else if (formElement.value === "complete") {
        setComplete(false);
      } else {
        setIncomplete(false);
      }
    }
  }

  return (
    <div className="container my-4 border">
      <div className="container fs-4 my-2 border-bottom">
        <div className="row">
          <div className="col">
            <p>
              Effort symbol ={" "}
              <span className="container rounded">
                {effortSymbol(props.effort)}
              </span>
            </p>
          </div>
          <div className="col">
            <Form.Check
              type="checkbox"
              label="pending tasks"
              value="pending"
              defaultChecked
              onClick={(e) => checkBox(e.target.value)}
              id="pendingCheckbox"
            />
          </div>
          <div className="col">
            <Form.Check
              type="checkbox"
              label="completed tasks"
              value="complete"
              defaultChecked
              onClick={(e) => checkBox(e.target.value)}
              id="completeCheckbox"
            />
          </div>
          <div className="col">
            <Form.Check
              type="checkbox"
              label="incompleted tasks"
              value="incomplete"
              defaultChecked
              onClick={(e) => checkBox(e.target.value)}
              id="incompleteCheckbox"
            />
          </div>
        </div>
      </div>
      <AssignmentElement
        tasks={tasks}
        setTasks={props.setTasks}
        jsonWebToken={props.jsonWebToken}
        original={false}
      />
    </div>
  );
}

export default Assignments;
