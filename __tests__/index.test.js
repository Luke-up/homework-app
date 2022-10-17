import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import TeacherDashboard from "../pages/Teacher/Teacher";
import AssignmentElement from "../components/AssignmentElement";
import "@testing-library/jest-dom";
import Assignments from "../components/Assignments";
import RoomGrid from "../components/RoomGrid";
import StudentNav from "../components/StudentNav";
import TeacherNav from "../components/TeacherNav";
import TaskCreate from "../components/TaskCreate";
import renderer from "react-test-renderer";
import StudentDashboard from "../pages/Student/Student";
import Help from "../pages/teacher/help";
import StudentHelp from "../pages/student/help";

describe("Home render", () => {
  it("Renders home screen", () => {
    render(<Home />);

    const paragraph = screen.getByText(
      "The continuous assesment and lexicon recording tool."
    );

    expect(paragraph).toBeInTheDocument();
  });
});
describe("AssignmentElement render", () => {
  it("Renders the student accordian", () => {
    render(
      <AssignmentElement
        original={false}
        tasks={[
          {
            title: "Task title",
            text: "text",
            words: [
              { word: "word", definition: "definition", sentence: "sentence" },
            ],
            questions: [{ question: "question", answer: "answer" }],
            room: "unassigned",
            complete: "true",
            effort: "A",
          },
        ]}
      />
    );
    const element = screen.getByText("Task title");
    expect(element).toBeInTheDocument();
  });
});
describe("Assignment list render", () => {
  it("Renders the student assignments", () => {
    render(
      <Assignments
        setTasks="setTasks"
        jsonWebToken="5"
        original={false}
        tasks={[
          {
            title: "Task title",
            text: "text",
            words: [
              { word: "word", definition: "definition", sentence: "sentence" },
            ],
            questions: [{ question: "question", answer: "answer" }],
            room: "unassigned",
            complete: "true",
            effort: "A",
          },
        ]}
      />
    );
    const element = screen.getByText("Effort symbol =");
    expect(element).toBeInTheDocument();
  });
});
describe("Teacher dashboard student list", () => {
  it("Renders the student list", () => {
    render(
      <RoomGrid
        students={[
          {
            _id: { $oid: "6331adf20489412c6ed96604" },
            name: "Student name",
            tasks: [
              {
                title: "Task title",
                text: "text",
                words: [
                  {
                    word: " word",
                    definition: " defition",
                    sentence: " sentence",
                    id: { $numberInt: "2" },
                  },
                ],
                questions: [{ question: " question", answer: "answer" }],
                room: "unassigned",
                complete: "true",
                effort: "B",
              },
            ],
            password: "secret",
            room: "unassigned",
            effort: "D",
            email: "student1@email",
            school: "zzz",
            join: "7/05/2022",
          },
        ]}
      />
    );
    const element = screen.getByText("Student name");
    expect(element).toBeInTheDocument();
  });
});
describe("Navigation", () => {
  it("Renders the student navbar", () => {
    render(<StudentNav />);
    const element = screen.getByText("Dashboard");
    expect(element).toBeInTheDocument();
  });
  it("Renders the student navbar", () => {
    render(<TeacherNav />);
    const element = screen.getByText("Evaluations");
    expect(element).toBeInTheDocument();
  });
});
describe("Tasks ", () => {
  it("Renders the task form", () => {
    render(<TaskCreate />);
    const element = screen.getByText("Reading paragraph");
    expect(element).toBeInTheDocument();
  });
});

describe("UI ", () => {
  it("teacher dash renders correctly", () => {
    const tree = renderer
      .create(
        <TeacherDashboard
          jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGMyOTg1ZjY4NGJlMDcyYTA5M2E2YiIsImlhdCI6MTY2NjAxNDA0MH0.Xd1dAHc4xMnG_lk6oRrPT4lsiFQrXxRCU2nA7th13JQ"
          test={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("student dash renders correctly", () => {
    const tree = renderer
      .create(
        <StudentDashboard
          test={true}
          jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGMyOWJjZjY4NGJlMDcyYTA5M2E2YyIsImlhdCI6MTY2NjAxNDEwOH0.8pA-lQBWv3iebbxA3o9OIwq93pLudWoXKv_KCIoLqWI"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("help renders correctly", () => {
    const tree = renderer.create(<Help />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("help renders correctly", () => {
    const tree = renderer.create(<StudentHelp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// describe("Dashboard render", () => {
//   it("Renders teacher dashboard", () => {
//     render(
//       <TeacherDashboard jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGMyOTg1ZjY4NGJlMDcyYTA5M2E2YiIsImlhdCI6MTY2NjAxNDA0MH0.Xd1dAHc4xMnG_lk6oRrPT4lsiFQrXxRCU2nA7th13JQ" />
//     );

//     const tableHeaders = screen.getByText("To be marked");

//     expect(tableHeaders).toBeInTheDocument();
//   });
//   it("Renders student dashboard", () => {
//     render(
//       <StudentDashboard jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGMyOWJjZjY4NGJlMDcyYTA5M2E2YyIsImlhdCI6MTY2NjAxNDEwOH0.8pA-lQBWv3iebbxA3o9OIwq93pLudWoXKv_KCIoLqWI" />
//     );

//     const tableHeaders = screen.getByText("New reading");

//     expect(tableHeaders).toBeInTheDocument();
//   });
// });
