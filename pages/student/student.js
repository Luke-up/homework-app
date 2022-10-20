import React, { useEffect, useContext } from "react";
import Layout from "../../components/StudentLayout";
import AppContext from "../../components/AppContext";

//Function renders the student dashboard page on login
function Student(props) {
  //Object holds the student data
  const [user, setUser] = React.useState({});
  //Boolean is used to conditionally render elements after successful fetch request
  const [found, setFound] = React.useState(false);

  const context = useContext(AppContext);
  const jwt = context.state.jwt;

  //Function finds student document in mongo
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jwt }),
    };
    const res = await fetch(`/api/student`, options);
    const data = await res.json();
    setUser(data);
    setFound(true);
  }
  useEffect(() => {
    if (!props.test) {
      checkCredentials();
    }
  }, []);

  //Fucntion returns the number of completed tasks in student data
  const completed = complete();
  function complete() {
    if (found) {
      let count = 0;

      const taskArray = user.tasks;
      for (let i = 0; taskArray.length > i; i++) {
        if (
          taskArray[i].complete === "true" ||
          taskArray[i].complete === "pending"
        ) {
          count += 1;
        }
      }
      return count;
    }
  }

  //Function returns the amount of incomplete tasks in student data
  const incompleted = incomplete();
  function incomplete() {
    if (found) {
      return user.tasks.length - completed;
    }
  }

  //Function returns the amount of words in past tasks that have been completed
  const wordbank = wordAdd();
  function wordAdd() {
    if (found) {
      let count = 0;
      const taskArray = user.tasks;
      taskArray.map((task) => {
        if (task.complete === "true") {
          return task.words.map(() => {
            count += 1;
          });
        }
      });
      return count;
    }
  }

  //Function returns the most recent study paragraph for easy access
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
        <div className="container bg-bookShelf2 border border-dark p-4">
          <div className="container bg-blue border border-dark text-light rounded my-4 p-2">
            <h1>My dashboard</h1>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="container rounded bg-light border border-dark my-4 text-center p-2 fs-4">
                <p>{user.name}</p>
              </div>
              <div className="container rounded bg-light border border-dark my-4 text-center p-2 fs-4">
                <p>Room: {user.room}</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="container rounded bg-light border border-dark my-4 text-center p-2 fs-4">
                Tasks completed: {completed}
              </div>
              <div className="container rounded bg-light border border-dark my-4 text-center p-2 fs-4">
                Tasks due: {incompleted}
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="container rounded bg-light border border-dark my-4 text-center p-2 fs-4">
                Words studied: {wordbank}
              </div>
              <div className="container rounded bg-light border border-dark my-4 text-center p-2 fs-4">
                Recent task effort: {user.effort}
              </div>
            </div>
          </div>
          <div className="container bg-blue border text-light border-dark rounded my-4 p-2">
            <h1>New reading</h1>
          </div>
          <div className="container rounded bg-light border border-dark my-4 text-center p-2 fs-4">
            {newText}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Student;
