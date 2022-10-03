import { useEffect } from "react";
import Link from "next/link";

function StudentNav() {
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
              Pages
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link href={"/student/student"}>
                  <a className="dropdown-item" href="#">
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/student/profile"}>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/student/assignments"}>
                  <a className="dropdown-item" href="#">
                    Assignments
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/student/wordbank"}>
                  <a className="dropdown-item" href="#">
                    Wordbank
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

export default StudentNav;
