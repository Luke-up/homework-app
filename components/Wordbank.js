import Table from "react-bootstrap/Table";
import React, { useEffect } from "react";

function Wordbank(props) {
  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    setTasks(props.tasks);
  });

  function wordCount() {
    let count = 0;
    tasks.map((task) => {
      if (task.complete === "true") {
        count += task.words.length;
      }
    });
    return count;
  }

  return (
    <div className="container bg-light my-4 border">
      <h1 className="w-100">
        Wordbank{" "}
        <span className="container border rounded fs-3">{wordCount()}</span>
      </h1>

      <Table>
        <thead>
          <tr className="bg-green rounded">
            <th>Word</th>
            <th>Sentence</th>
            <th>Definition</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            if (task.complete === "true") {
              return task.words.map((word) => {
                return (
                  <tr key={word.word}>
                    <td>{word.word}</td>
                    <td>{word.definition}</td>
                    <td>{word.sentence}</td>
                  </tr>
                );
              });
            }
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Wordbank;
