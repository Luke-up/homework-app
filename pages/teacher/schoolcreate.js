import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Schoolcreate() {
  const router = useRouter();

  async function checkSchool() {
    const school = document.getElementById("school").value;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school: school }),
    };
    const res = await fetch(`/api/verifynewschool`, options);
    const data = await res.json();
    console.log("check school response = " + data);
    return await data;
  }

  async function submitData() {
    const passwordOne = document.getElementById("password").value;
    const passwordTwo = document.getElementById("passwordCheck").value;
    const schoolCode = document.getElementById("schoolCode").value;
    const school = document.getElementById("school").value;
    const email = document.getElementById("email").value;
    const schoolCheck = await checkSchool();
    if (passwordOne !== passwordTwo) {
      alert("The passwords do not match");
    } else if (schoolCheck === "403") {
      alert("This school already exists");
    } else if (
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
    console.log(data);
    alert("School created");
    router.push("/");
  }

  return (
    <div>
      <h1>Create new school</h1>
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

export default Schoolcreate;
