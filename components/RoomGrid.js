import { Table } from "react-bootstrap";
import Link from "next/link";
import React, { useEffect } from "react";

function RoomGrid(props) {
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
        total += 1;
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

  return (
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
              if (student.room === props.roomName) {
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
  );
}

export default RoomGrid;
