import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, { useEffect } from "react";

function TaskCreate(props) {
  const [words, setWords] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [count, setCount] = React.useState(0);

  function addWord() {
    let word = document.getElementById("word");
    let definition = document.getElementById("definition");
    let sentence = document.getElementById("sentence");
    const newWord = {
      word: word.value,
      definition: definition.value,
      sentence: sentence.value,
      id: count,
    };
    let array = [...words, newWord];
    setWords(array);
    word.value = " ";
    definition.value = " ";
    sentence.value = " ";
    let newCount = count + 1;
    setCount(newCount);
  }

  function addQuestion() {
    let question = document.getElementById("question");
    const newQuestion = {
      question: question.value,
      id: count,
    };
    let array = [...questions, newQuestion];
    setQuestions(array);
    question.value = " ";
    let newCount = count + 1;
    setCount(newCount);
  }

  async function submitTask() {
    let title = document.getElementById("title");
    let text = document.getElementById("text");
    const task = {
      title: title.value,
      text: text.value,
      words: words,
      questions: questions,
      room: props.roomName,
      complete: "false",
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jwt: props.jsonWebToken,
        room: props.roomName,
        task: task,
      }),
    };
    //end point is different to the dashboard as it will return different information
    const res = await fetch(`/api/createtask`, options);
    const data = await res.json();
    if (data === 200) {
      alert("Task added successfully!");
    }
    title.value = "";
    text.value = "";
    setWords([]);
    setQuestions([]);
  }

  const showWords = wordRender();

  function wordRender() {
    return words.map((word) => {
      return (
        <div key={word.word} className="my-2 row">
          <div className="fs-3 col-2">{word.word}</div>
          <div className="col-4 fs-4">{word.definition}</div>{" "}
          <div className="col-4">{word.sentence}</div>{" "}
          <div className="col-2">
            <button
              className="btn btn-danger float-end"
              onClick={() => removeWord(word.id)}
            >
              delete
            </button>
          </div>
        </div>
      );
    });
  }

  const showQuestions = questionRender();

  function questionRender() {
    return questions.map((question) => {
      return (
        <div key={question.id}>
          <p>
            {question.question}{" "}
            <span className="float-end">
              <button
                className="btn btn-danger"
                onClick={() => removeQuestion(question.id)}
              >
                delete
              </button>
            </span>
          </p>
        </div>
      );
    });
  }

  function removeQuestion(id) {
    setQuestions(
      questions.filter((question) => {
        return question.id !== id;
      })
    );
  }

  function removeWord(id) {
    setWords(
      words.filter((word) => {
        return word.id !== id;
      })
    );
  }

  return (
    <div className="container my-4 border">
      <div className="container fs-4 my-2 border-bottom">
        <div>
          <Form.Group className="mb-3">
            <Form.Label>Task title</Form.Label>
            <Form.Control id="title" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Reading paragraph</Form.Label>
            <Form.Control id="text" as="textarea" rows={3} />
          </Form.Group>
          <p className="fs-4 text-center">Vocabulary</p>
          <div className="mb-3 p-2">{showWords}</div>
          <Form.Group className="mb-3 border p-2">
            <Form.Label className="fs-5">Word</Form.Label>
            <Form.Control type="text" id="word" />
            <Form.Label className="fs-5">Definition</Form.Label>
            <Form.Control type="text" id="definition" />
            <Form.Label className="fs-5">Sentence</Form.Label>
            <Form.Control type="text" id="sentence" />
            <button
              onClick={() => addWord()}
              className="my-3 btn border p-2 w-100"
            >
              Add
            </button>
          </Form.Group>

          <p className="fs-4 text-center">Questions</p>
          <div className="mb-3 p-2">{showQuestions}</div>
          <Form.Group className="mb-3 border rounded p-2">
            <Form.Label className="fs-5">Question</Form.Label>
            <Form.Control type="text" id="question" />
            <button
              onClick={() => addQuestion()}
              className="my-3 btn border p-2 w-100"
            >
              Add
            </button>
          </Form.Group>
        </div>
        <button
          onClick={() => {
            submitTask();
          }}
          className="w-100 btn btn-success my-2 fs-3"
        >
          Submit Task
        </button>
      </div>
    </div>
  );
}

export default TaskCreate;
