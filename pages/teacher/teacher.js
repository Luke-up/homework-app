import React, { useEffect } from "react";
import Layout from "../../components/TeacherLayout";
import RoomGrid from "../../components/RoomGrid";

function Teacher(props) {
  const [students, setStudents] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [found, setFound] = React.useState(false);
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

  return (
    <Layout>
      <div>
        <div className="container bg-light border-dark border rounded">
          <div className="container bg-secondary rounded my-4 p-2">
            <h1>Student list</h1>
          </div>
          {found ? (
            <RoomGrid rooms={rooms} students={students} />
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Teacher;
