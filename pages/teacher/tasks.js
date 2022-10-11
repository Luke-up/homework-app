import React, { useEffect } from "react";
import Layout from "../../components/TeacherLayout";
import TaskFolder from "../../components/TaskFolder";
import RoomGrid from "../../components/RoomGrid";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Tasks(props) {
  const [students, setStudents] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [found, setFound] = React.useState(false);
  const [current, setCurrent] = React.useState("unassigned");

  const jsonWebToken = props.jwt;
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken }),
    };
    const res = await fetch(`/api/teacher`, options);
    const data = await res.json();
    setStudents(data[0]);
    setRooms(data[1]);
    setFound(true);
  }
  useEffect(() => {
    checkCredentials();
  }, []);

  function studentNumber() {
    let newArray = students.filter((student) => student.room == current);
    return newArray.length;
  }
  function studentArray() {
    let newArray = students.filter((student) => student.room == current);
    return newArray;
  }

  return (
    <Layout>
      <div>
        <div className="container bg-light border-dark border rounded">
          <div className="container bg-secondary rounded my-4 p-2">
            <h1>Tasks</h1>
          </div>
          <div className="container rounded border my-2">
            <h1>
              Tasks veiw{" "}
              {found ? (
                <span className="container border fs-5">
                  {studentNumber()} in {current}
                </span>
              ) : (
                ""
              )}
              <span className="float-end fs-4 my-2">
                <select onChange={(e) => setCurrent(e.target.value)}>
                  {found
                    ? rooms.map((room) => {
                        return <option value={room}>{room}</option>;
                      })
                    : ""}
                </select>
              </span>
            </h1>
          </div>
          <div className="container rounded border my-2">
            {found ? (
              <TaskFolder
                jsonWebToken={jsonWebToken}
                roomName={current}
                students={studentArray()}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Tasks;
