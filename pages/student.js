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

function Student() {
  return (
    <div>
      <h1>This is the student dashboard page</h1>
    </div>
  );
}

export default Student;
