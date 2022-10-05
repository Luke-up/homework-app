import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Studentlogin(props) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: userName, password: password }),
    };
    const res = await fetch(`/api/studentlogin`, options);

    const jwt = await res.json();
    props.setJwt(jwt.accesstoken);
    if (jwt.accesstoken) {
      router.push("/student/student");
    }
  }
  return (
    <div>
      <h1>Student login page</h1>
      <input
        type="text"
        name="username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn btn-secondary m-2"
        onClick={() => checkCredentials()}
      >
        Submit
      </button>
      <Link href={"/student/studentcreate"}>
        <a>Create new user</a>
      </Link>
    </div>
  );
}

export default Studentlogin;
