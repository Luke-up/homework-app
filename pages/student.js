import React from "react";

export const getServerSideProps = async () => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "student", password: "secret" }),
  };
  const res = await fetch(`http://localhost:3000/api/studentlogin`, options);
  console.log(res);
  const data = await res.json();

  //function passes the searchterm and results as props
  return {
    props: {
      ans: data,
    },
  };
};
function Student({ ans }) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: userName, password: password }),
    };
    const res = await fetch(`/api/studentlogin`, options);

    const jwt = await res.json();
    console.log(jwt);
  }

  console.log(ans);
  //   const tasks = ans[0].tasks;
  return (
    <div>
      <h1>Student login page</h1>
      {/* <p>
        {tasks &&
          tasks.map((task) => {
            return task.text;
          })}
      </p> */}
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
