import Link from "next/link";

//Renders the student navigation bar
function StudentNav() {
  return (
    <div className="py-2 border-dark border-bottom bg-papersBanner2 mb-2">
      <div className="row px-2">
        <div className="col">
          <div className="logo-icon2 p-5 float-start"></div>
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
                <Link href={"/Student/student"}>
                  <a className="dropdown-item" href="#">
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/Student/profile"}>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/Student/assignments"}>
                  <a className="dropdown-item" href="#">
                    Assignments
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/Student/wordbank"}>
                  <a className="dropdown-item" href="#">
                    Wordbank
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/Student/help"}>
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

export default StudentNav;
