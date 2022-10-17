import { Table } from "react-bootstrap";
import Link from "next/link";
import React from "react";

//Function
function RoomGrid(props) {
  //Function returns number of completed tasks over total
  function completion(tasks) {
    let complete = 0;
    let total = 0;
    tasks.map((task) => {
      if (task.complete === "true" || task.complete === "pending") {
        complete += 1;
      }
    });
    return complete + "/" + tasks.length;
  }

  //Function returns number of tasks that are yet to be marked
  function unmarked(tasks) {
    let count = 0;
    tasks.map((task) => {
      if (task.complete === "pending") {
        count += 1;
      }
    });
    return count;
  }

  //Renders table of all students passed via props and links to a page generated dynamically
  //Link passes the student ID as a url param
  return (
    <Table striped bordered hover className="border-dark">
      <thead>
        <tr className="bg-green fs-4 text-center font-ubuntu">
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
              if (student.room === props.roomName) {
                return (
                  <Link key={student._id} href={"/Teacher/" + student._id}>
                    <tr className="bg-light fs-4 text-center font-ubuntu">
                      <td>{student.name}</td>
                      <td>{student.effort}</td>
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
  );
}

export default RoomGrid;
