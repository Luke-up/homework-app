import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, InputGroup } from "react-bootstrap";

function TeacherLogin(props) {
  //State contains the inputs to be sent via fetch request
  const [school, setSchool] = React.useState("");
  const [password, setPassword] = React.useState("");

  //Router allows for the function to reroute to the next page upon completion
  const router = useRouter();

  //Fetch request verifies the password matches the name and creates a JWT to be used for the session.
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school: school, password: password }),
    };
    const res = await fetch(`/api/teacherlogin`, options);
    const jwt = await res.json();
    //The JWT is saved in the Layout component to be passed through props to different pages
    props.setJwt(jwt.accesstoken);
    sessionStorage.setItem("jwt", jwt.accesstoken);
    if (jwt.accesstoken) {
      router.push("/teacher/teacher");
    }
  }
  return (
    <div className="container text-center mt-5 rounded bg-papers border border-dark w-50 p-5">
      <h1 className="my-3">Teacher login page</h1>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> School</InputGroup.Text>
        <Form.Control type="text" onChange={(e) => setSchool(e.target.value)} />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> Password </InputGroup.Text>
        <Form.Control
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </InputGroup>
      <Link href={"/teacher/schoolcreate"}>
        <a>Create new School</a>
      </Link>
      <br />
      <button
        className="btn btn-secondary m-2"
        onClick={() => checkCredentials()}
      >
        Submit
      </button>
    </div>
  );
}

export default TeacherLogin;
