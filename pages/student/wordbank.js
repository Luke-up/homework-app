import Layout from "../../components/StudentLayout";
import React, { useEffect } from "react";

function wordbank(props) {
  const [tasks, setTasks] = React.useState({});
  const [found, setFound] = React.useState(false);
  const jsonWebToken = props.jwt;
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken }),
    };
    //end point is different to the dashboard as it will return different information
    const res = await fetch(`/api/studentwordbank`, options);
    const data = await res.json();
    setTasks(data);
    setFound(true);
  }
  useEffect(() => {
    checkCredentials();
  }, []);
  return (
    <Layout>
      <div>
        <h1>student wordbank</h1>
        {found
          ? tasks.map((task) => {
              if (task.complete === "true") {
                return task.words.map((word) => {
                  return (
                    <div key={word.word}>
                      <p>{word.word}</p>
                      <p>{word.definition}</p>
                      <p>{word.sentence}</p>
                    </div>
                  );
                });
              }
            })
          : "loading"}
      </div>
    </Layout>
  );
}

export default wordbank;
