import Link from "next/link";

//Navigation bar for the teacher side of the application
//Menu items for the dashboard, task setting, task marking, help page and the logout button
function TeacherNav() {
  return (
    <div className="py-2 border-dark border-bottom bg-papersBanner mb-2">
      <div className="row px-2">
        <div className="col">
          <div className="logo-icon p-5 float-start"></div>
        </div>
        <div className="col text-end">
          <div className="dropdown m-3">
            <button
              className="btn btn-secondary my-3 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              id="dropdownMenuButton1"
              aria-expanded="false"
            >
              Menu
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link href={"/Teacher/teacher"}>
                  <a className="dropdown-item" href="#">
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/Teacher/tasks"}>
                  <a className="dropdown-item" href="#">
                    Tasks
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/Teacher/evaluations"}>
                  <a className="dropdown-item" href="#">
                    Evaluations
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/Teacher/help"}>
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
