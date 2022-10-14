import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Form, InputGroup } from "react-bootstrap";

function Schoolcreate() {
  const router = useRouter();

  //Fetch request checks the school name does not already exist
  async function checkSchool() {
    const school = document.getElementById("school").value;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school: school }),
    };
    const res = await fetch(`/api/verifynewschool`, options);
    const data = await res.json();
    return await data;
  }

  //Function runs several checks on the input data
  async function submitData() {
    const passwordOne = document.getElementById("password").value;
    const passwordTwo = document.getElementById("passwordCheck").value;
    const schoolCode = document.getElementById("schoolCode").value;
    const school = document.getElementById("school").value;
    const email = document.getElementById("email").value;
    //Check to see if school name exists
    const schoolCheck = await checkSchool();
    //Check to see if passwords match
    if (passwordOne !== passwordTwo) {
      alert("The passwords do not match");
    } else if (schoolCheck === "403") {
      alert("This school already exists");
    }
    //Check to see if any fields have been left blank
    else if (
      email === "" ||
      schoolCode === "" ||
      passwordOne === "" ||
      school === ""
    ) {
      alert("please fill in all fields");
    } else {
      createUser(school, schoolCode, email, passwordOne);
    }
  }

  //Function posts the checked data to API endpoint which will create the database document
  async function createUser(school, schoolCode, email, password) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school: school,
        schoolCode: schoolCode,
        email: email,
        password: password,
      }),
    };
    const res = await fetch(`/api/createschool`, options);
    const data = await res.json();
    alert("School created");
    router.push("/");
  }

  return (
    <div className="container text-center mt-5 rounded bg-papersFlip border border-dark w-50 p-5">
      <h1>Create new school</h1>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> Email</InputGroup.Text>
        <Form.Control type="email" id="email" placeholder="example@email.com" />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> Password</InputGroup.Text>
        <Form.Control type="password" id="password" placeholder="Password" />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> Password</InputGroup.Text>
        <Form.Control
          type="password"
          id="passwordCheck"
          placeholder="Confirm password"
        />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> School</InputGroup.Text>
        <Form.Control type="text" id="school" placeholder="School name" />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> School code*</InputGroup.Text>
        <Form.Control
          type="text"
          id="schoolCode"
          placeholder="*Used by students when joining
          the school, eg: 5K2"
        />
      </InputGroup>

      <button className="btn btn-secondary m-2" onClick={() => submitData()}>
        Create
      </button>
    </div>
  );
}

export default Schoolcreate;
