import React, { useEffect } from "react";
import Layout from "../../components/TeacherLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import Assignments from "../../components/Assignments";

function studentreport(props) {
  const [student, setStudent] = React.useState({});
  const [rooms, setRooms] = React.useState({});
  const [found, setFound] = React.useState(false);
  const jsonWebToken = props.jwt;

  const router = useRouter();
  const { id } = router.query;

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
    setRooms(data[1]);
  }
  useEffect(() => {
    checkCredentials();
  }, []);

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
    const res = await fetch(`/api/changeroom`, options);
    const data = await res.json();
  }

  return (
    <Layout>
      {found ? (
        <div className="container bg-light border-dark border rounded">
          <div className="container bg-secondary rounded my-4 p-2">
            <h1>Individual student</h1>
          </div>
          <div className="container border border-dark my-4 p-2">
            <p>
              Student name :{" "}
              <span className="container border border-dark rounded">
                {student.name}
              </span>{" "}
              Room :{" "}
              <span className="container border border-dark rounded">
                <select onChange={(e) => changeRoom(e.target.value)}>
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
                </select>
              </span>{" "}
              <span className="container border border-dark rounded">
                <select onChange={(e) => setVeiw(e.target.value)}>
                  <option value="assignments">Assignments</option>
                  <option value="wordbank">Wordbank</option>
                </select>
              </span>
              <span>
                <Link href={"/teacher/teacher"}>
                  <a>Go back</a>
                </Link>
              </span>
            </p>
          </div>
          <div className="container border border-dark my-4 p-2">
            <Assignments student={student} />
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </Layout>
  );
}

export default studentreport;
