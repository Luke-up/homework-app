import Link from "next/link";
import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

function Home() {
  //control the display of the 'help' modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container text-center mt-5 rounded bg-papersFull border border-dark w-50 p-5">
      <div className="logo-icon p-5"></div>
      <p>The continuous assesment and lexicon recording tool.</p>
      <button className="btn btn-secondary m-2">
        <Link href={"/student/studentlogin"}>
          <a className="text-decoration-none text-white">Student</a>
        </Link>
      </button>
      <br />
      <button className="btn btn-secondary m-2">
        <Link href={"/teacher/teacherlogin"}>
          <a className="text-decoration-none text-white">Teacher</a>
        </Link>
      </button>
      <br />
      <button onClick={handleShow} className="btn m-2">
        <a className="text-decoration-none text-primary">Help</a>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          HomeQ is an app to help facilitate the communication between student
          and their teachers.
          <ul>
            <li>
              Student accounts cannot be created without first receiving a
              school name and code from the teacher.
            </li>
            <li>
              For new users, start by clicking the teacher button and proceed
              with creating a new account.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Home;
