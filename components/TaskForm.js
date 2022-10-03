import React from "react";

function TaskForm(props) {
  const [answerArray, setAnswerArray] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [questionNumber, setQuestionNumber] = React.useState(0);

  function submitAnswer() {
    if (answerArray == []) {
      let newArray = [
        {
          question: props.task.questions[0].question,
          answer: input,
        },
      ];
      setAnswerArray(newArray);
      setQuestionNumber(Number(questionNumber + 1));
    } else {
      let newArray = answerArray;
      const newObject = {
        question: props.task.questions[0].question,
        answer: input,
      };
      newArray.push(newObject);
      setAnswerArray(newArray);
      setQuestionNumber(Number(questionNumber + 1));
    }
  }

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
    //end point is different to the dashboard as it will return different information
    const res = await fetch(`/api/tasksubmit`, options);
    const data = await res.json();
    props.setTaskAttempt(false);
    console.log(data);
  }
  //   submitTask();
  // checkCredentials();

  if (questionNumber < props.task.questions.length) {
    return (
      <div>
        <form>
          <p>{props.task.questions[0].question}</p>
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button type="button" onClick={() => submitAnswer()}>
            Submit
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
