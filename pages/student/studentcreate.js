import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Studentcreate() {
  const router = useRouter();
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

  async function createUser() {
    const school = document.getElementById("school").value;
    const passwordOne = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school: school,
        name: name,
        email: email,
        password: passwordOne,
      }),
    };
    console.log(options);
    const res = await fetch(`/api/createuser`, options);
    const data = await res.json();
    console.log(data);
    if (data === "email already exists") {
      alert("Email already exists");
    } else {
      alert("User created");
      router.push("/student/studentlogin");
    }
  }

  return (
    <div>
      <h1>Create new user</h1>
      <input type="text" id="name" placeholder="name" />
      <input type="text" id="email" placeholder="email adress" />
      <input type="password" id="password" placeholder="password" />
      <input
        type="password"
        id="passwordCheck"
        placeholder="confirm password"
      />
      <input type="text" id="school" placeholder="school name" />
      <input type="text" id="schoolCode" placeholder="school code" />
      <button className="btn btn-secondary m-2" onClick={() => submitData()}>
        Create
      </button>
    </div>
  );
}

export default Studentcreate;
