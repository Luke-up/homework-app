import React from "react";
import { useRouter } from "next/router";
import { Form, InputGroup } from "react-bootstrap";

//Renders form to create a new student user
function StudentCreate() {
  const router = useRouter();

  //Function finds the school document in mongo and checks for matching code
  async function checkSchool() {
    const school = document.getElementById("school").value;
    const schoolCode = document.getElementById("schoolCode").value;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school: school, schoolcode: schoolCode }),
    };
    const res = await fetch(`/api/verifyschool`, options);
    const data = await res.json();
    return await data;
  }

  //Function checks form fields
  async function submitData() {
    const passwordOne = document.getElementById("password").value;
    const passwordTwo = document.getElementById("passwordCheck").value;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const schoolCheck = await checkSchool();
    if (passwordOne !== passwordTwo) {
      alert("The passwords do not match");
    } else if (schoolCheck === 403) {
      alert("The school credentials could not be found");
    } else if (name.value === "" || email.value === "") {
      alert("please fill in all fields");
    } else {
      createUser();
    }
  }

  //Function submits the new student data and creates a new document in mongo
  async function createUser() {
    const school = document.getElementById("school").value;
    const passwordOne = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const d = new Date();
    const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school: school,
        name: name,
        email: email,
        password: passwordOne,
        join: date,
      }),
    };
    const res = await fetch(`/api/createuser`, options);
    const data = await res.json();
    if (data === "email already exists") {
      alert("Email already exists");
    } else {
      alert("User created");
      router.push("/");
    }
  }

  return (
    <div className="container text-center mt-5 rounded bg-papersFlip2 border border-dark w-50 p-5">
      <h1>Create new user</h1>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> Name</InputGroup.Text>
        <Form.Control type="text" id="name" placeholder="name" />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> Email</InputGroup.Text>
        <Form.Control type="text" id="email" placeholder="email adress" />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text>Password</InputGroup.Text>
        <Form.Control type="password" id="password" placeholder="password" />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text>Password</InputGroup.Text>
        <Form.Control
          type="password"
          id="passwordCheck"
          placeholder="confirm password"
        />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text>School</InputGroup.Text>
        <Form.Control type="text" id="school" placeholder="school name" />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text>Code</InputGroup.Text>
        <Form.Control type="text" id="schoolCode" placeholder="school code" />
      </InputGroup>
      <button className="btn btn-secondary m-2" onClick={() => submitData()}>
        Create
      </button>
    </div>
  );
}

export default StudentCreate;
