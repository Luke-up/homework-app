import React, { useEffect } from "react";
import Layout from "../../components/TeacherLayout";
import TaskFolder from "../../components/TaskFolder";

function tasks(props) {
  //Array of all students from the matching school
  const [students, setStudents] = React.useState([]);
  //Array of all rooms in the matching school
  const [rooms, setRooms] = React.useState([]);
  //Boolean value to conditionally render page if fetch request is successful
  const [found, setFound] = React.useState(false);
  //String indicating the current room
  const [current, setCurrent] = React.useState("unassigned");

  //fetch request returns all corresponding students and rooms in the school
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

  //Returns the amount of students in a particular room
  function studentNumber() {
    let newArray = students.filter((student) => student.room == current);
    return newArray.length;
  }

  //Returns the student objects in a particular room
  function studentArray() {
    let newArray = students.filter((student) => student.room == current);
    return newArray;
  }

  return (
    <Layout>
      <div>
        <div className="container bg-bookShelf border border-dark p-4">
          <div className="container text-center my-3 p-2">
            <h1 className="bg-white w-25 mx-auto rounded border">
              Student list
            </h1>
          </div>
          <div className="container bg-light rounded border border-dark my-2">
            <h1>
              Students:
              {found ? (
                <span className="container border fs-4">
                  {studentNumber()} in {current}
                </span>
              ) : (
                ""
              )}
              <span className="float-end fs-4 my-2">
                <select
                  className="rounded my-1"
                  onChange={(e) => setCurrent(e.target.value)}
                >
                  {found
                    ? rooms.map((room) => {
                        return (
                          <option key={room} value={room}>
                            {room}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </span>
            </h1>
          </div>
          <div className="container bg-light border rounded border-dark my-2">
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

export default tasks;
