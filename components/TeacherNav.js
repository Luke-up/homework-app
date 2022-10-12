import { useEffect } from "react";
import Link from "next/link";

function TeacherNav() {
  return (
    <div className="bg-info py-2 mb-2">
      <div className="row px-2">
        <div className="col">
          <h1>Heading of app</h1>
        </div>
        <div className="col text-end">
          <div className="dropdown m-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              id="dropdownMenuButton1"
              aria-expanded="false"
            >
              Menu
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link href={"/teacher/teacher"}>
                  <a className="dropdown-item" href="#">
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/teacher/tasks"}>
                  <a className="dropdown-item" href="#">
                    Tasks
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/teacher/evaluations"}>
                  <a className="dropdown-item" href="#">
                    Evaluations
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/teacher/help"}>
                  <a className="dropdown-item" href="#">
                    Help
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherNav;
