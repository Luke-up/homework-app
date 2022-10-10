import { Table } from "react-bootstrap";
import Link from "next/link";
import React, { useEffect } from "react";

function RoomGrid(props) {
  const [rooms, setRooms] = React.useState([]);

  useEffect(() => {
    setRooms(props.rooms);
    console.log("rooms in props = " + props.rooms);
  }, []);

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
  function completion(tasks) {
    let count = 0;
    let total = 0;
    tasks.map((task) => {
      if (task.complete === "true" || task.complete === "pending") {
        count += 1;
        total += 1;
      } else {
        total = +1;
      }
    });
    return count + "/" + total;
  }
  function unmarked(tasks) {
    let count = 0;
    tasks.map((task) => {
      if (task.complete === "pending") {
        count = +1;
      }
    });
    return count;
  }

  function filterRooms(room) {
    room !== roomName;
  }

  async function removeRoom(roomName) {
    console.log(roomName);
    if ((props.rooms.length = 1)) {
      console.log(
        "array of " + props.rooms + " length = " + props.rooms.length
      );
      return;
    } else {
      let roomArray = rooms.filter(filterRooms());
      console.log("new array=" + roomArray);
      props.setRooms(roomArray);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jwt: props.jsonWebToken,
          room: roomArray,
          delete: roomName,
        }),
      };
      const res = await fetch(`/api/deleteroom`, options);
      const data = await res.json();
    }
  }

  return rooms.map((roomName) => {
    return (
      <div key={roomName} className="container rounded border my-2">
        <h1>
          {roomName}{" "}
          <span className="float-end fs-6">
            <button
              onClick={() => removeRoom(roomName)}
              className="btn btn-outline-secondary my-2"
            >
              Remove room
            </button>
          </span>
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student name</th>
              <th>Effort symbol</th>
              <th>Tasks complete</th>
              <th>To be marked</th>
              <th>Join date</th>
            </tr>
          </thead>
          <tbody>
            {props.students
              ? props.students.map((student) => {
                  if (student.room === roomName) {
                    return (
                      <Link key={student._id} href={"/teacher/" + student._id}>
                        <tr>
                          <td>{student.name}</td>
                          <td>{effortSymbol(student.effort)}</td>
                          <td>{completion(student.tasks)}</td>
                          <td>{unmarked(student.tasks)}</td>
                          <td>{student.join}</td>
                        </tr>
                      </Link>
                    );
                  }
                })
              : ""}
          </tbody>
        </Table>
      </div>
    );
  });
}

export default RoomGrid;
