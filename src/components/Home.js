import React from "react";
import { useState, useEffect } from "react";

import { projectDatabase } from "../firebase/config";
import Loading from "../Helper/Loading";
import CourseCard from "./CourseCard";
function Home() {
  const [loading, setLoading] = useState(true);
  const [resourceDocuments, setResourceDocs] = useState([]);
  const [error, setError] = useState(null);
  const [Semester, setSemester] = useState("Semester 1");
  const [Year, setYear] = useState("Year 1");
  useEffect(() => {
    const storageRef = projectDatabase.ref("Courses");
    console.log({ Semester, Year });
    storageRef
      .orderByChild("Year")
      .equalTo(Year)
      .once("value", (snapshot) => {
        let resourceDocs = [];

        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          if (childData.Semester === Semester) {
            childData = { ...childData, childKey };
            resourceDocs.push(childData);
          }
        });
        setResourceDocs(resourceDocs);

        console.log("fetching finished successfully");
      })
      .then((data) => {
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError("Error Occured   \n " + err);
        setLoading(false);
      });
  }, [Semester, Year]);
  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setLoading(true);
    setResourceDocs([]);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
    console.log(Year);
  };

  return (
    <div>
      <h1 className="ml-8">Welcome Back</h1>
      <div className="form-group">
        <fieldset className="form-group ">
          <div className="row shadow-lg p-3 mb-3  bg-white rounded">
            <legend className="col-form-label col-sm-2 pt-0 mr-3 ">
              Semester
            </legend>

            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="Semester 1"
                  defaultChecked
                  onClick={handleSemesterChange}
                />
                <label className="form-check-label" htmlFor="gridRadios1">
                  Semester 1
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="Semester 2"
                  onClick={handleSemesterChange}
                />
                <label className="form-check-label" htmlFor="gridRadios2">
                  Semester 2
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="form-group ">
          <div className="row shadow-lg p-3 mb-2  bg-white rounded">
            <legend className="col-form-label col-sm-2 pt-0 mr-2 ">Year</legend>

            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grid2"
                  id="gridRadios3"
                  value="Year 1"
                  onClick={changeYear}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="gridRadios3">
                  Year 1
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grid2"
                  id="gridRadios4"
                  value="Year 2"
                  onClick={changeYear}
                />
                <label className="form-check-label" htmlFor="gridRadios4">
                  Year 2
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grid2"
                  id="gridRadios5"
                  value="Year 3"
                  onClick={changeYear}
                />
                <label className="form-check-label" htmlFor="gridRadios5">
                  Year 3
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="grid2"
                  id="gridRadios6"
                  value="Year 4"
                  onClick={changeYear}
                />
                <label className="form-check-label" htmlFor="gridRadios6">
                  Year 4
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      {loading && <Loading property=" Acada Courses" />}
      <div>
        {resourceDocuments.length === 0 && !loading && (
          <div className="alert alert-danger" role="alert">
            OOOps! No results for your Selection yet.
          </div>
        )}
        {error && <div>Some error occured;</div>}
        {resourceDocuments && (
          <div className="d-flex flex-wrap ">
            {resourceDocuments.map((course) => {
              return <CourseCard course={course} key={course.key} />;
            })}
          </div>
        )}
      </div>
      <footer
        style={{
          left: "0",
          bottom: "0",
          width: "100%",
          color: "white",
          backgroundColor: "lightgray",
          textAlign: "center",
        }}
      >
        <div
          className="div"
          style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}
        >
          <a href="http://www.instagram.com" target="blank">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="http://www.twitter.com" target="blank">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="http://www.facebook.com" target="blank">
            <i className="bi bi-facebook"></i>
          </a>
        </div>
        <ul
          className="list-inline"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <li className="list-inline-item">
            <a href="/">Home</a>
          </li>
          <li className="list-inline-item">
            <a href="/notes">Services</a>
          </li>
          <li className="list-inline-item">
            <a href="/contact">Help</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Privacy Policy</a>
          </li>
        </ul>
        <p className="copyright">ACADA © 2021</p>
      </footer>
    </div>
  );
}

export default Home;
