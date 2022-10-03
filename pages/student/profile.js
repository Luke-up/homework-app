import React, { useEffect } from "react";
import Layout from "../../components/StudentLayout";
function profile(props) {
  const [user, setUser] = React.useState({});
  const [found, setFound] = React.useState(false);
  const jsonWebToken = props.jwt;
  async function checkCredentials() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt: jsonWebToken }),
    };
    //end point is different to the dashboard as it will return different information
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
      <div>
        <h1>student details page</h1>
        {found ? (
          <div>
            <p>{user.name}</p>
            <p>{user.school}</p>
            <p>{user.email}</p>
          </div>
        ) : (
          " "
        )}
      </div>
    </Layout>
  );
}

export default profile;
