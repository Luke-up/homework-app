import React, { useEffect } from "react";
import Layout from "../../components/TeacherLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import Assignments from "../../components/Assignments";
import Wordbank from "../../components/Wordbank";
import { Form, Button } from "react-bootstrap";

function studentreport(props) {
  //Object holds student document
  const [student, setStudent] = React.useState({});
  //Array holds all tasks done by student
  const [tasks, setTasks] = React.useState([]);
  //Object holds all rooms in school
  const [rooms, setRooms] = React.useState({});
  //Found boolean used to conditionally render page once fetch request completed
  const [found, setFound] = React.useState(false);
  //Veiw holds the name of data currently displayed on the page
  const [veiw, setVeiw] = React.useState("assignments");
  const jsonWebToken = props.jwt;

  //Router used to retrieve the student ID from the url
  const router = useRouter();
  const { id } = router.query;

  //Function retrievec information on student and rooms in school
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken, id: id }),
    };
    const res = await fetch(`/api/studentreport`, options);
    const data = await res.json();
    setFound(true);
    setStudent(data[0][0]);
    setTasks(data[0][0].tasks);
    setRooms(data[1]);
  }
  useEffect(() => {
    checkCredentials();
  }, []);

  //Function changes the room value in the student document
  //Function changes which room the student is assigned to
  async function changeRoom(room) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jwt: jsonWebToken,
        studentId: id,
        room: room,
      }),
    };
    await fetch(`/api/changeroom`, options);
  }

  //Function displays either a list of assignments for the student
  //or a list of the words the student has completed
  const currentVeiw = veiwSelect();
  function veiwSelect() {
    if (veiw == "assignments") {
      return (
        <Assignments
          tasks={tasks}
          setTasks={setTasks}
          jsonWebToken={jsonWebToken}
          effort={student.effort}
        />
      );
    } else {
      return <Wordbank tasks={tasks} />;
    }
  }

  return (
    <Layout>
      {found ? (
        <div className="container bg-bookShelf border border-dark p-4 font-ubuntu">
          <div className="container text-center my-3 p-2">
            <h1 className="bg-white w-50 mx-auto rounded border">
              Individual student
            </h1>
          </div>
          <div className="container bg-green border fs-4 my-4 pt-2 rounded">
            <div className="row">
              <p className="col-4">
                Student name :{" "}
                <span className="container border border-dark rounded">
                  {student.name}
                </span>{" "}
              </p>
              <div className="col-3">
                <Form.Select onChange={(e) => changeRoom(e.target.value)}>
                  <option id="currentRoom">{student.room}</option>
                  {found
                    ? rooms.map((room) => {
                        if (room !== student.room) {
                          return (
                            <option key={room} value={room}>
                              {room}
                            </option>
                          );
                        }
                      })
                    : " "}
                </Form.Select>
              </div>
              <div className="col-3">
                <Form.Select onChange={(e) => setVeiw(e.target.value)}>
                  <option value="assignments">Assignments</option>
                  <option value="wordbank">Wordbank</option>
                </Form.Select>
              </div>
              <div className="col-2">
                <Link href={"/Teacher/Teacher"}>
                  <Button>Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
          {currentVeiw}
        </div>
      ) : (
        "Loading"
      )}
    </Layout>
  );
}

export default studentreport;
