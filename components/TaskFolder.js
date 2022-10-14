import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import RoomGrid from "./RoomGrid";
import TaskHistory from "./TaskHistory";
import TaskCreate from "./TaskCreate";

function TaskFolder(props) {
  return (
    <div className="mt-2 p-3">
      <Tabs
        defaultActiveKey="students"
        id="uncontrolled-tab-example"
        className="mb-3 font-ubuntu fs-5"
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
