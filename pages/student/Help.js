import React from "react";
import Layout from "../../components/StudentLayout";
import Image from "next/image";
import Dash from "../images/HelpSDash.jpg";
import Ass from "../images/HelpSAss.jpg";

function help(props) {
  return (
    <Layout>
      <div>
        <div className="container bg-bookShelf2 border border-dark p-4">
          <div className="container text-center my-3 p-2">
            <h1 className="bg-white w-25 mx-auto rounded border">Help</h1>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <p className="col-4 fs-3 bg-blue text-light p-4 pt-5 me-3 rounded ">
              <span className="fs-1">Dashboard.</span>
              <br />
              Summary of user progress and most recent homework reading
            </p>
            <Image
              className="col-6"
              src={Dash}
              alt="Picture of the dashboard"
            />
          </div>
          <div className="row">
            <div className="col-1"></div>
            <p className="col-4 fs-3 bg-blue text-light p-4 pt-5 me-3 rounded ">
              <span className="fs-1">Assignments screen.</span>
              <br />
              List of all the assignments.
              <br />
              Badges for the tasks to be completed.
              <br />
              Links to the task submission forms.
            </p>
            <Image
              className="col-6"
              src={Ass}
              alt="Picture of the assignments screen"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default help;
