import React, { useEffect } from "react";
import AssignmentElement from "./AssignmentElement";

//Function finds all tasks in school with matching room name
function TaskHistory(props) {
  //Array holds all matching tasks
  const [tasks, setTasks] = React.useState([]);
  //Boolean used to conditionally render elements on successful fetch request
  const [found, setFound] = React.useState(false);

  //Fetch request returns all tasks in school and displays tasks in current room
  async function getTasks() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jwt: props.jsonWebToken,
        roomName: props.roomName,
      }),
    };
    const res = await fetch(`/api/gettasks`, options);
    const data = await res.json();
    console.log(data);
    if (data !== 404) {
      let tasksArray = data;
      let newArray = tasksArray.filter(filterTasks);
      setTasks(newArray);
    }
    setFound(true);
  }

  function filterTasks(task) {
    return task.room === props.roomName;
  }

  useEffect(() => {
    getTasks();
  }, [props.roomName]);

  return (
    <div className="py-3">
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
  );
}

export default TaskHistory;
