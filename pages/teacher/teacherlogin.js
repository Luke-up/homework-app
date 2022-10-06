import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Teacherlogin(props) {
  const [school, setSchool] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school: school, password: password }),
    };
    const res = await fetch(`/api/teacherlogin`, options);

    const jwt = await res.json();
    props.setJwt(jwt.accesstoken);
    if (jwt.accesstoken) {
      router.push("/teacher/teacher");
    }
  }
  return (
    <div>
      <h1>Teacher login page</h1>
      <input
        type="text"
        name="username"
        onChange={(e) => setSchool(e.target.value)}
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
      <Link href={"/teacher/schoolcreate"}>
        <a>Create new School</a>
      </Link>
    </div>
  );
}

export default Teacherlogin;
