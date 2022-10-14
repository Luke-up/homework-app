import { Form, Button } from "react-bootstrap";
import React from "react";

//Function renders form used by teacher to create new tasks for students
function TaskCreate(props) {
  //Array holds new word object
  const [words, setWords] = React.useState([]);
  //Array holds new question objects
  const [questions, setQuestions] = React.useState([]);
  //Number value functions as id for the objects in both the array of questions, and words
  const [count, setCount] = React.useState(0);

  //Function compiles a word object and adds it to the words array
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

  //Function compiles a question object and adds it to the questions array
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

  //Function compiles a new task object and adds it to the teacher database
  //Function also adds the new task object to the databases of every student in the current room
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

  //Words that have already been added to the array are rendered on the page for confirmation
  const showWords = wordRender();
  function wordRender() {
    return words.map((word) => {
      return (
        <div
          key={word.word}
          className="my-1 row border rounded border-dark px-4 py-1 font-ubuntu"
        >
          <div className="fs-3 col-2">{word.word}</div>
          <div className="col-4 fs-3">{word.definition}</div>{" "}
          <div className="col-4 fs-3">{word.sentence}</div>{" "}
          <div className="col-2">
            <button
              className="btn btn-danger my-1 float-end"
              onClick={() => removeWord(word.id)}
            >
              delete
            </button>
          </div>
        </div>
      );
    });
  }

  //Questions that have already been added to the array are rendered on the page for confirmation
  const showQuestions = questionRender();
  function questionRender() {
    return questions.map((question) => {
      return (
        <div
          key={question.id}
          className="border border-dark rounded px-4 py-2 my-1"
        >
          <div className="fs-3 font-ubuntu">
            {question.question}{" "}
            <span className="float-end">
              <button
                className="btn btn-danger"
                onClick={() => removeQuestion(question.id)}
              >
                delete
              </button>
            </span>
          </div>
        </div>
      );
    });
  }

  //Function will remove a question object from the questions array
  function removeQuestion(id) {
    setQuestions(
      questions.filter((question) => {
        return question.id !== id;
      })
    );
  }

  //Function will remove a word object from the words array
  function removeWord(id) {
    setWords(
      words.filter((word) => {
        return word.id !== id;
      })
    );
  }

  return (
    <div className="container my-4 p-4">
      <div>
        <Form.Group className="mb-3 fs-3 font-ubuntu">
          <Form.Label>Task title</Form.Label>
          <Form.Control id="title" />
        </Form.Group>
        <Form.Group className="mb-3 fs-3 font-ubuntu">
          <Form.Label>Reading paragraph</Form.Label>
          <Form.Control id="text" as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mb-3 border py-2 px-4 font-ubuntu">
          <div className="mb-3 p-2">
            <p className="fs-3 text-center">Vocabulary</p>
            {showWords}
          </div>
          <Form.Label className="fs-5 ">Word</Form.Label>
          <Form.Control type="text" id="word" />
          <Form.Label className="fs-5">Definition</Form.Label>
          <Form.Control type="text" id="definition" />
          <Form.Label className="fs-5">Sentence</Form.Label>
          <Form.Control type="text" id="sentence" />
          <Button
            variant="outline-secondary"
            onClick={() => addWord()}
            className="my-3 p-2 w-100"
          >
            Add
          </Button>
        </Form.Group>

        <Form.Group className="mb-3 border rounded p-4">
          <div className="mb-3">
            <p className="fs-4 text-center">Questions</p>
            {showQuestions}
          </div>
          <Form.Label className="fs-5">Question</Form.Label>
          <Form.Control type="text" id="question" />
          <Button
            variant="outline-secondary"
            onClick={() => addQuestion()}
            className="my-3 p-2 w-100"
          >
            Add
          </Button>
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
  );
}

export default TaskCreate;
