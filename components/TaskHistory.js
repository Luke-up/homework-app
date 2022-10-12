import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, { useEffect } from "react";
import AssignmentElement from "./AssignmentElement";

function TaskHistory(props) {
  const [tasks, setTasks] = React.useState([]);
  const [found, setFound] = React.useState(false);

  async function getTasks() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jwt: props.jsonWebToken,
        roomName: props.roomName,
      }),
    };
    //end point is different to the dashboard as it will return different information
    const res = await fetch(`/api/gettasks`, options);
    const data = await res.json();
    let tasksArray = data;
    let newArray = tasksArray.filter(filterTasks);
    setTasks(newArray);
    setFound(true);
  }

  function filterTasks(task) {
    return task.room === props.roomName;
  }

  useEffect(() => {
    getTasks();
  }, [props.roomName]);

  return (
    <div className="container my-4 border">
      <div className="container fs-4 my-2 border-bottom">
        {found ? (
          <AssignmentElement
            tasks={tasks}
            jsonWebToken={props.jsonWebToken}
            original={true}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TaskHistory;
