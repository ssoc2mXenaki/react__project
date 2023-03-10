import React, { useEffect, useState } from "react";
import "../index.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faXmark,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

library.add(faCheck, faXmark, faCircleInfo);

const Dashboard = () => {
  const [stat, setStats] = useState([]);

  const getStats = () => {
    axios
      .get('http://localhost:3001/stats')
      .then((response) => {
        const myStats = response.data;
        setStats(myStats);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [course, setCourses] = useState([]);
  
  useEffect(() => getCourses(), []);
  useEffect(() => getStats(), []);
  
  const getCourses = () => {
    axios
      .get('http://localhost:3001/courses')
      .then((response) => {
        const myCourses = response.data;
        setCourses(myCourses);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const sortedCourse = course.sort(
    (a, b) => Date.parse(a.dates.start_date) - Date.parse(b.dates.start_date)
  );

  return (
    <>
      <Card
        style={{
          marginLeft: "30px",
          marginTop: "20px",
          marginRight: "30px",
          borderRadius: 0,
          border: "none",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Card.Body>
          <Card.Title>Welcome to our Dashboard!</Card.Title>
          <Card.Text>Manage everything and have fun!</Card.Text>
        </Card.Body>
      </Card>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "30px",
          marginTop: "20px",
          marginRight: "30px",
        }}
      >
        {stat.map((stats) => (
          <Card key={stats.id} style={{ width: "24%" }}>
            <Card.Body>
              <Card.Text>
                {stats.title}: <Badge bg="primary">{stats.amount}</Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div
        style={{
          marginLeft: "30px",
          marginTop: "20px",
          marginRight: "30px",
          border: "solid lightgrey 1px",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            backgroundColor: "#f8fafa",
            borderBottom: "solid lightgrey 1px",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        >
          <div
            style={{
              marginLeft: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Last 5 courses
          </div>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Online</th>
              <th>Price</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedCourse.slice(0, 5).map((courses) => {
              return (
                <tr key={courses.id}>
                  <td>
                    <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                  </td>
                  <td>{courses.title}</td>
                  <td>
                    {courses.online ? (
                      <FontAwesomeIcon icon="fa-solid fa-check" color="green" />
                    ) : (
                      <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    )}
                  </td>
                  <td>{courses.price.normal}</td>
                  <td>
                    {moment(courses.dates.start_date).format("DD/MM/YYYY")} -{" "}
                    {moment(courses.dates.end_date).format("DD/MM/YYYY")}
                  </td>
                  <td>
                    <Button
                      style={{
                        backgroundColor: "#0dcaf0",
                        color: "black",
                        border: "none",
                        float: "right",
                      }}
                      href={"/CoursesDetails?id=" + courses.id}
                    >
                      View details
                    </Button>
                  </td>
                </tr>
              );
              //}
            })}
          </tbody>
        </Table>
        <hr />
        <div
          style={{
            backgroundColor: "#f8f9fa",
            overflow: "hidden",
            marginBottom: "15px",
          }}
        >
          <Button
            style={{ float: "right", marginRight: "10px" }}
            href="/Courses"
          >
            {" "}
            View all
          </Button>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
