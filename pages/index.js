import Link from "next/link";

//fetch function receiving the search term from the address bar (query)
export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/studentlogin`);
  const data = await res.json();

  //function passes the searchterm and results as props
  return {
    props: {
      ans: data,
    },
  };
};

function Home({ ans }) {
  console.log(ans);
  return (
    <div>
      <button>
        <Link href={"/student"}>
          <a>Student</a>
        </Link>
      </button>
      <br />
      <button>
        <Link href={"/teacher"}>
          <a>Teacher</a>
        </Link>
      </button>
    </div>
  );
}
export default Home;
