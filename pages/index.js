import Link from "next/link";

function Home() {
  return (
    <div>
      <button className="btn btn-secondary m-2">
        <Link href={"/student/studentlogin"}>
          <a className="text-decoration-none text-white">Student</a>
        </Link>
      </button>
      <br />
      <button className="btn btn-secondary m-2">
        <Link href={"/teacher"}>
          <a className="text-decoration-none text-white">Teacher</a>
        </Link>
      </button>
    </div>
  );
}
export default Home;
