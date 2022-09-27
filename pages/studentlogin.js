import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Student() {
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
    console.log(jwt);
    sessionStorage.setItem("jwt", jwt.accesstoken);

    if (jwt.accesstoken) {
      router.push("/student");
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
      <button onClick={() => checkCredentials()}>Submit</button>
    </div>
  );
}

export default Student;
