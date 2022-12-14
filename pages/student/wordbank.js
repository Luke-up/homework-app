import Layout from "../../components/StudentLayout";
import React, { useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import AppContext from "../../components/AppContext";

function WordBank(props) {
  //Array holds all tasks in student document
  const [tasks, setTasks] = React.useState([]);
  //Boolean value conditionally renders elements after successful fetch request
  const [found, setFound] = React.useState(false);

  const context = useContext(AppContext);
  const jwt = context.state.jwt;

  //Fetch all tasks from student document as words are inside task objects
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jwt }),
    };
    const res = await fetch(`/api/studentwordbank`, options);
    const data = await res.json();
    //Reverse order so that the newest additions are at the top
    const reverseOrder = data.reverse();
    setTasks(reverseOrder);
    setFound(true);
  }
  useEffect(() => {
    if (jwt) {
      checkCredentials();
    }
  }, [jwt]);

  return (
    <Layout>
      <div className="container bg-bookShelf2 border border-dark p-5">
        <h1 className="bg-white w-25 text-center mx-auto rounded border">
          My wordbank
        </h1>
        <Table>
          <thead>
            <tr className="bg-blue text-light mb-3 fs-4">
              <th>Word</th>
              <th>Definition</th>
              <th>Sentence</th>
            </tr>
          </thead>
          <tbody>
            {found ? (
              tasks.map((task) => {
                if (task.complete === "true") {
                  return task.words.map((word) => {
                    return (
                      <tr
                        className="font-ubuntu bg-light my-2 fs-5"
                        key={word.word}
                      >
                        <td>{word.word}</td>
                        <td>{word.definition}</td>
                        <td>{word.sentence}</td>
                      </tr>
                    );
                  });
                }
              })
            ) : (
              <tr className="font-ubuntu bg-light my-2 fs-5">
                <td>Loading</td>
                <td>Loading</td>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
}

export default WordBank;
