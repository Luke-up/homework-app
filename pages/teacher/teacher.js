import React, { useEffect } from "react";
import Layout from "../../components/TeacherLayout";
import RoomGrid from "../../components/RoomGrid";
import { InputGroup, Button, Form } from "react-bootstrap";

function Teacher(props) {
  //Array of all students for this school
  const [students, setStudents] = React.useState([]);
  //Array of all rooms for this school
  const [rooms, setRooms] = React.useState([]);
  //Boolean to allow content to render on the condition that the fetch request succeeds
  const [found, setFound] = React.useState(false);
  //State for the function to create a new room
  const [newRoom, setNewRoom] = React.useState("newRoom");

  //Initial fetch request saves all required data to state
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

  //Function reveals hidden input and submit button
  function createNewRoom() {
    let button = document.getElementById("newRoomButton");
    button.style.display = "none";
    let submit = document.getElementById("addButton");
    submit.style.display = "block";
  }

  //Function adds a new room to the array
  //Function hides the input and submit button again
  async function addRoom() {
    let button = document.getElementById("newRoomButton");
    button.style.display = "block";
    let submit = document.getElementById("addButton");
    submit.style.display = "none";
    setRooms([...rooms, newRoom]);
    await updateSchoolRooms(rooms);
  }

  //Function makes a post request to the database to add the new room
  async function updateSchoolRooms(newArray) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken, rooms: newArray }),
    };
    await fetch(`/api/addrooms`, options);
  }

  //Function removes room from state array
  //Function calls fetch request to remove the room from the database for the teacher
  async function removeRoom(roomName) {
    let roomArray = rooms.filter((room) => room !== roomName);
    setRooms(roomArray);
    await updateSchoolRooms(roomArray);
    //Function deletes the room field of every student previous in the room
    async function deleteRequest(roomName) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jwt: jsonWebToken,
          roomName: roomName,
        }),
      };
      await fetch(`/api/deleteroom`, options);
      //Reload the page
      await checkCredentials();
    }
    deleteRequest(roomName);
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
          {found ? (
            <div>
              {rooms.map((roomName) => {
                return (
                  <div
                    key={roomName}
                    className="container text-center rounded p-4 my-3"
                  >
                    <h2 className="bg-white w-25 mx-auto mb-4 rounded border">
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
                    </h2>
                    <RoomGrid students={students} roomName={roomName} />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>loading</p>
          )}
          <div id="newRoom">
            <div style={{ display: "none" }} id="addButton">
              <InputGroup className="">
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
              variant="light"
              id="newRoomButton"
              onClick={() => createNewRoom()}
              className="container rounded border border-dark fs-4 my-2 w-100"
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
