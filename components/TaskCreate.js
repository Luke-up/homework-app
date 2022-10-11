import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, { useEffect } from "react";

function TaskCreate(props) {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [words, setWords] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [count, setCount] = React.useState("");

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
    console.log(newWord);
    let array = [...words, newWord];
    setWords(array);
    word.value = " ";
    definition.value = " ";
    sentence.value = " ";
  }
  function addQuestion() {
    let question = document.getElementById("question");
    const newQuestion = {
      question: question.value,
      id: count,
    };
    console.log(newQuestion);
    let array = [...questions, newQuestion];
    setQuestions(array);
    question.value = " ";
  }

  useEffect(
    () => {
      let newCount = count;
      setCount(newCount++);
    },
    words,
    questions
  );

  // async function postTask() {
  //   const task = {
  //     title: title,
  //     text: text,
  //     words: words,
  //     questions: questions,
  //     room: props.roomName,
  //     complete: false,
  //   };
  //   const options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       jwt: props.jsonWebToken,
  //       roomName: props.roomName,
  //       task: task,
  //     }),
  //   };
  //   //end point is different to the dashboard as it will return different information
  //   const res = await fetch(`/api/newtask`, options);
  //   const data = await res.json();
  // }
  const showWords = wordRender();

  function wordRender() {
    return words.map((word) => {
      return (
        <div>
          <p>
            {word.word} <span className="border">{word.definition}</span>{" "}
            <span className="border">{word.sentence}</span>{" "}
            <span>
              <button onClick={() => removeWord(word.id)}>RemoveWord</button>
            </span>
          </p>
        </div>
      );
    });
  }

  const showQuestions = questionRender();

  function questionRender() {
    return questions.map((question) => {
      return (
        <div>
          <p>
            {question.question}{" "}
            <span>
              <button onClick={() => removeQuestion(question.id)}>
                Remove this question
              </button>
            </span>
          </p>
        </div>
      );
    });
  }

  return (
    <div className="container my-4 border">
      <div className="container fs-4 my-2 border-bottom">
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task title</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Reading paragraph</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <p className="fs-4">Vocabulary</p>
          <div className="mb-3 border p-2">{showWords}</div>
          <Form.Group className="mb-3 border p-2">
            <Form.Label className="fs-5">Word</Form.Label>
            <Form.Control type="text" id="word" />
            <Form.Label className="fs-5">Definition</Form.Label>
            <Form.Control type="text" id="definition" />
            <Form.Label className="fs-5">Sentence</Form.Label>
            <Form.Control type="text" id="sentence" />
          </Form.Group>
          <button onClick={() => addWord()} className="mb-3 border p-2 w-100">
            New word
          </button>
          <p className="fs-4">Questions</p>
          <div className="mb-3 border p-2">{showQuestions}</div>
          <Form.Group className="mb-3 border p-2">
            <Form.Label className="fs-5">Question</Form.Label>
            <Form.Control type="text" id="question" />
          </Form.Group>
          <button
            onClick={() => addQuestion()}
            className="mb-3 border p-2 w-100"
          >
            New question
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCreate;
