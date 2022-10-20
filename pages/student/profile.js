import React, { useEffect, useContext } from "react";
import Layout from "../../components/StudentLayout";
import AppContext from "../../components/AppContext";

//Renders small block showing user details
function Profile(props) {
  //Holds usser information
  const [user, setUser] = React.useState({});
  //Boolean value allows conditional rendering of elements after successful fetch request
  const [found, setFound] = React.useState(false);

  const context = useContext(AppContext);
  const jwt = context.state.jwt;

  //Function requests user information from Mongo
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jwt }),
    };
    const res = await fetch(`/api/studentdetails`, options);
    const data = await res.json();
    setUser(data);
    setFound(true);
  }
  useEffect(() => {
    checkCredentials();
  }, []);

  return (
    <Layout>
      <div className="container text-center mt-5 rounded bg-blue text-white border border-dark w-50 p-5">
        <h1>User details</h1>
        {found ? (
          <div className="text-start bg-light text-dark fs-3 ms-3 my-3 border border-light p-3 rounded mt-4">
            <p>Name: {user.name}</p>
            <p>School: {user.school}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          " "
        )}
      </div>
    </Layout>
  );
}

export default Profile;
