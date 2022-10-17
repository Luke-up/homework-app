import React from "react";
import { Form } from "react-bootstrap";

//Renders a small form which contains one questions and a answer input and submit button
function TaskForm(props) {
  //Array holds all question objects once the answer has been submitted
  const [answerArray, setAnswerArray] = React.useState("");
  //String holds the input value
  const [input, setInput] = React.useState("");
  //Number is used for id values of elements added dynamically
  const [questionNumber, setQuestionNumber] = React.useState(0);

  //Function saves answer with questions as an object to an array
  function submitAnswer() {
    if (answerArray == "") {
      let newArray = [
        {
          question: props.task.questions[questionNumber].question,
          answer: input,
        },
      ];
      document.getElementById("inputArea").value = "";
      setAnswerArray(newArray);
      setQuestionNumber(Number(questionNumber + 1));
    } else {
      let newArray = answerArray;
      const newObject = {
        question: props.task.questions[questionNumber].question,
        answer: input,
      };
      newArray.push(newObject);
      document.getElementById("inputArea").value = "";
      setAnswerArray(newArray);
      setQuestionNumber(Number(questionNumber + 1));
    }
  }

  //Function saves the array of answers to the student document in Mongo
  async function submitTask() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jwt: props.jsonWebToken,
        title: props.task.title,
        answers: answerArray,
      }),
    };
    await fetch(`/api/tasksubmit`, options);
    props.setTaskAttempt(false);
    props.checkCredentials();
  }

  //Conditionally renders all questions in succession or the final submit button
  if (questionNumber < props.task.questions.length) {
    return (
      <div>
        <p className=" fs-2 bg-white w-25 text-center mx-auto rounded border">
          Task title: {props.task.title}
        </p>
        <form>
          <p className="bg-blue mt-4 text-light p-3 rounded fs-3">
            Q: {props.task.questions[questionNumber].question}
          </p>
          <Form.Control
            className="fs-4"
            id="inputArea"
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            className="btn btn-success my-3"
            type="button"
            onClick={() => submitAnswer()}
          >
            Submit answer
          </button>
        </form>
      </div>
    );
  } else {
    submitTask();
    return;
  }
}

export default TaskForm;
