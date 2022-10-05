import React, { useEffect } from "react";
import Layout from "../../components/StudentLayout";

function Student(props) {
  const [user, setUser] = React.useState({});
  const [found, setFound] = React.useState(false);
  const jsonWebToken = props.jwt;
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken }),
    };
    const res = await fetch(`/api/student`, options);
    const data = await res.json();
    setUser(data);
    setFound(true);
  }
  useEffect(() => {
    checkCredentials();
  }, []);

  const effortSymbol = effort();
  function effort() {
    if (found) {
      if (user.effort === "x") {
        return "";
      } else {
        const symbol = Number(user.effort);
        if (symbol > 79) {
          return "A";
        } else if (symbol > 59) {
          return "B";
        } else if (symbol > 39) {
          return "C";
        } else {
          return "D";
        }
      }
    }
  }

  const completed = complete();
  function complete() {
    if (found) {
      let count = 0;

      const taskArray = user.tasks;
      for (let i = 0; taskArray.length > i; i++) {
        if (taskArray[i].complete == "true") {
          count += 1;
        }
      }
      return count;
    }
  }

  const incompleted = incomplete();
  function incomplete() {
    if (found) {
      return user.tasks.length - completed;
    }
  }

  const wordbank = wordAdd();
  function wordAdd() {
    if (found) {
      let count = 0;
      const taskArray = user.tasks;
      taskArray.map((task) => {
        task.words.map(() => {
          count += 1;
        });
      });
      return count;
    }
  }

  const newText = getText();
  function getText() {
    if (found) {
      const taskArray = user.tasks;
      if (taskArray.length !== 0) {
        return taskArray[taskArray.length - 1].text;
      }
    }
  }

  return (
    <Layout>
      <div>
        <div className="container bg-light border-dark border rounded">
          <div className="container bg-secondary rounded my-4 p-2">
            <h1>This is the student dashboard page of {user.name}</h1>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="container rounded bg-primary my-4 text-center p-2 fs-4">
                <p>{user.name}</p>
              </div>
              <div className="container rounded bg-primary my-4 text-center p-2 fs-4">
                <p>{user.room}</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="container rounded bg-primary my-4 text-center p-2 fs-4">
                {effortSymbol}
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="container rounded bg-primary my-4 text-center p-2 fs-4">
                {completed}
              </div>
              <div className="container rounded bg-primary my-4 text-center p-2 fs-4">
                {incompleted}
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="container rounded bg-primary my-4 text-center p-2 fs-4">
                {wordbank}
              </div>
            </div>
          </div>
        </div>
        <div className="container bg-light border-dark border rounded">
          <div className="container bg-secondary rounded my-4 p-2">
            <h1>New reading for {user.room}</h1>
          </div>
          <div className="container rounded bg-primary my-4 text-center p-2 fs-4">
            {newText}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Student;
