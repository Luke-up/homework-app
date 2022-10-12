import React, { useEffect } from "react";
import Layout from "../../components/TeacherLayout";
import RoomGrid from "../../components/RoomGrid";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Teacher(props) {
  const [students, setStudents] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [found, setFound] = React.useState(false);
  const [newRoom, setNewRoom] = React.useState("newRoom");

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

  function createNewRoom() {
    let button = document.getElementById("newRoomButton");
    button.style.display = "none";
    let submit = document.getElementById("addButton");
    submit.style.display = "block";
  }

  function addRoom() {
    let button = document.getElementById("newRoomButton");
    button.style.display = "block";
    let submit = document.getElementById("addButton");
    submit.style.display = "none";
    let newArray = rooms;
    newArray.push(newRoom);
    setRooms(newArray);
    updateSchoolRooms(newArray);
    let tempRoom = document.getElementById("tempRoom");
    tempRoom.style.display = "block";
  }

  async function updateSchoolRooms(newArray) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken, rooms: newArray }),
    };
    const res = await fetch(`/api/addrooms`, options);
    const data = await res.json();
  }

  function removeRoom(roomName) {
    let roomArray = rooms.filter((room) => room !== roomName);
    setRooms(roomArray);
    updateSchoolRooms(roomArray);
    async function deleteRequest(roomName) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jwt: jsonWebToken,
          roomName: roomName,
        }),
      };
      const res = await fetch(`/api/deleteroom`, options);
      const data = await res.json();
      await checkCredentials();
    }
    deleteRequest(roomName);
  }

  return (
    <Layout>
      <div>
        <div className="container bg-light border-dark border rounded">
          <div className="container bg-secondary rounded my-4 p-2">
            <h1>Student list</h1>
          </div>
          {found ? (
            <div>
              {rooms.map((roomName) => {
                return (
                  <div key={roomName} className="container rounded border my-2">
                    <h1>
                      {roomName}{" "}
                      {roomName !== "unassigned" ? (
                        <span className="float-end fs-6">
                          <button
                            onClick={() => removeRoom(roomName)}
                            className="btn btn-outline-secondary my-2"
                          >
                            Remove room
                          </button>
                        </span>
                      ) : (
                        ""
                      )}
                    </h1>
                    <RoomGrid students={students} roomName={roomName} />
                  </div>
                );
              })}
              <div
                id="tempRoom"
                className="container rounded border my-2"
                style={{ display: "none" }}
              >
                <h1>
                  {newRoom}{" "}
                  <span className="float-end fs-6">
                    <button
                      onClick={() => {
                        removeRoom(newRoom);
                        let tempRoom = document.getElementById("tempRoom");
                        tempRoom.style.display = "none";
                      }}
                      className="btn btn-outline-secondary my-2"
                    >
                      Remove room
                    </button>
                  </span>
                </h1>
                <RoomGrid rooms={[newRoom]} />
              </div>
            </div>
          ) : (
            <p>loading</p>
          )}
          <div id="newRoom">
            <div style={{ display: "none" }} id="addButton">
              <InputGroup className="mb-3">
                <Form.Control
                  id="roomName"
                  placeholder="Room name"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setNewRoom(e.target.value)}
                />
                <Button
                  onClick={() => addRoom()}
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  Add room
                </Button>
              </InputGroup>
            </div>

            <Button
              variant="outline-secondary"
              id="newRoomButton"
              onClick={() => createNewRoom()}
              className="container rounded border fs-4 my-2 w-100"
            >
              Create new room
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Teacher;
