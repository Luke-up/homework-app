import React from "react";
import Layout from "../../components/TeacherLayout";
import Image from "next/image";
import Dash from "../images/HelpTDash.jpg";
import Task from "../images/HelpTTask.jpg";
import Eval from "../images/HelpTEval.jpg";
import Student from "../images/HelpTStudent.jpg";

function help(props) {
  return (
    <Layout>
      <div>
        <div className="container bg-bookShelf border border-dark p-4">
          <div className="container text-center my-3 p-2">
            <h1 className="bg-white w-25 mx-auto rounded border">Help</h1>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <p className="col-4 fs-3 bg-green p-4 pt-5 me-3 rounded ">
              <span className="fs-1">Dashboard.</span>
              <br />
              Short summary of all rooms in this school.
              <br />
              Individual students can be accessed from this screen.
              <br />
              New rooms can be created as the bottom of this screen.
            </p>
            <Image
              className="col-6"
              src={Dash}
              alt="Picture of the dashboard"
            />
          </div>
          <div className="row">
            <div className="col-1"></div>
            <p className="col-4 fs-3 bg-green p-4 pt-5 me-3 rounded ">
              <span className="fs-1">Task screen.</span>
              <br />
              Short summary of all previous tasks in this room.
              <br />
              Contains a student list for this room.
              <br />
              Contains a form for creating new tasks.
            </p>
            <Image
              className="col-6"
              src={Task}
              alt="Picture of the tasks screen"
            />
          </div>
          <div className="row">
            <div className="col-1"></div>
            <p className="col-4 fs-3 bg-green p-4 pt-5 me-3 rounded ">
              <span className="fs-1">Individual student screen.</span>
              <br />
              Short summary of all tasks for this student.
              <br />
              Select menu to change room.
              <br />
              Options to alter task data for individual tasks.
            </p>
            <Image
              className="col-6"
              src={Student}
              alt="Picture of the student screen"
            />
          </div>
          <div className="row">
            <div className="col-1"></div>
            <p className="col-4 fs-3 bg-green p-4 pt-5 me-3 rounded ">
              <span className="fs-1">Evaluations screen.</span>
              <br />
              List of all completed tasks ready for marking.
              <br />
              Grading selections for each task.
            </p>
            <Image
              className="col-6"
              src={Eval}
              alt="Picture of the evaluations screen"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default help;
