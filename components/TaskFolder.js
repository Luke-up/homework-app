import { Table } from "react-bootstrap";
import Link from "next/link";
import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RoomGrid from "./RoomGrid";
import TaskHistory from "./TaskHistory";
import TaskCreate from "./TaskCreate";

function TaskFolder(props) {
  return (
    <div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="history" title="Task history">
          {" "}
          <TaskHistory
            jsonWebToken={props.jsonWebToken}
            roomName={props.roomName}
          />
        </Tab>
        <Tab eventKey="students" title="All students">
          {" "}
          <RoomGrid students={props.students} roomName={props.roomName} />
        </Tab>
        <Tab eventKey="new" title="New task">
          {" "}
          <TaskCreate
            jsonWebToken={props.jsonWebToken}
            roomName={props.roomName}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default TaskFolder;
