import React, { createContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, InputGroup } from "react-bootstrap";

function StudentLogin(props) {
  //State holds input name and password
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  //Router opens new page on function completion
  const router = useRouter();

  //Function checks the student data in Mongo
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: userName, password: password }),
    };
    const res = await fetch(`/api/studentlogin`, options);

    const jwt = await res.json();
    sessionStorage.setItem("jwt", jwt.accesstoken);
    props.setJwt(jwt.accesstoken);
    if (jwt.accesstoken) {
      router.push("/student/student");
    }
  }
  return (
    <div className="container text-center mt-5 rounded bg-papers2 border border-dark w-50 p-5">
      <h1 className="my-3">Student login page</h1>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> Name</InputGroup.Text>
        <Form.Control
          type="text"
          name="username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="my-3 mx-auto">
        <InputGroup.Text> Password </InputGroup.Text>
        <Form.Control
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </InputGroup>
      <button
        className="btn btn-secondary m-2"
        onClick={() => checkCredentials()}
      >
        Submit
      </button>
      <br />
      <Link href={"/student/studentcreate"}>
        <a>Create new user</a>
      </Link>
    </div>
  );
}

export default StudentLogin;
