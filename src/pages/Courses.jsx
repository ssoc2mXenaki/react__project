import React, { useEffect, useState } from "react";
import "../index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment  from 'moment';

library.add(faCheckCircle, faTimesCircle);

function Courses() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3001/courses");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        alert("There was an error fetching the data. Please try again later.");
      }
    }
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (course) => {
    setSelectedData(course);
    setShowModal(true);
  };

  const deleteCourse = () => {
    axios.delete("http://localhost:3001/courses/" + selectedData.id)
      .then((response) => {
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  return (
    <Col
      style={{
        margin: '0 auto', 
        display: 'flex', 
        flexWrap: 'wrap', 
        marginLeft:'76.4px', 
        marginRight:'76.4px',
        paddingLeft:'12px'
      }}
    >
      {data.map((item, index) => (
        <Card
          key={index}
          style={{
            backgroundColor: "white",
            width: "calc(50% - 10px)",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          <Card.Img variant="top" src={item.imagePath} alt={item.title} />
          <Card.Body>
            <Card.Title>
              <h4>{item.title}</h4>
            </Card.Title>
            <Card.Text>
            <Card.Text><strong>Dates:</strong> <i>{moment(item.dates.start_date).format('DD/MM/YYYY')} - {moment(item.dates.end_date).format('DD/MM/YYYY')}</i></Card.Text>

            </Card.Text>
            <Card.Text>
              <strong>Duration: </strong>
              {item.duration}
            </Card.Text>
            <Card.Text>
              <strong>Price: </strong> <i>(Regular)</i> {item.price.normal} €{" "}
              <strong>|</strong> <i>(Early Bird Discount)</i>{" "}
              {item.price.early_bird} €
            </Card.Text>
            <Card.Text style={{ display: "flex", alignItems: "center" }}>
              <strong>Online:</strong>
              <div style={{ marginLeft: "10px" }}>
                {item.online ? (
                  <FontAwesomeIcon icon="check-circle" size="lg" />
                ) : (
                  <FontAwesomeIcon icon="times-circle" size="lg" />
                )}
              </div>
              <div style={{ marginLeft: "20px" }}>
                <Button
                  variant="dark"
                  style={{ backgroundColor: "black" }}
                  onClick={() => handleShowModal(item)}
                >
                  View
                </Button>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      {selectedData && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Card style={{ backgroundColor: "white" }}>
            <Card.Img
              variant="top"
              src={selectedData.imagePath}
              alt={selectedData.title}
            />
            <Card.Body>
              <Card.Title>
                <h4>{selectedData.title}</h4>
              </Card.Title>
              <Card.Text>
              <Card.Text><strong>Dates:</strong> <i>{moment(selectedData.dates.start_date).format('DD/MM/YYYY')} - {moment(selectedData.dates.end_date).format('DD/MM/YYYY')}</i></Card.Text>
              </Card.Text>
              <Card.Text>
                <strong>Duration: </strong>
                {selectedData.duration}
              </Card.Text>
              <Card.Text>{selectedData.description}</Card.Text>
              <Card.Text>
                <strong>Price: </strong> <i>(Regular)</i>{" "}
                {selectedData.price.normal} € <strong>|</strong>{" "}
                <i>(Early Bird Discount)</i> {selectedData.price.early_bird} €
              </Card.Text>
              <Card.Text style={{ display: "flex", alignItems: "center" }}>
                <strong>Online:</strong>
                <div style={{ marginLeft: "10px" }}>
                  {selectedData.online ? (
                    <FontAwesomeIcon icon="check-circle" size="lg" />
                  ) : (
                    <FontAwesomeIcon icon="times-circle" size="lg" />
                  )}
                </div>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="dark"
                style={{ backgroundColor: "black" }}
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  navigate("/edit-course", { state: selectedData.id });
                }}
                
                className="m-2"
              >
                Edit
              </Button>
              <Button
                onClick={deleteCourse}
                variant="danger"
                className="m-2"
              >
                Delete
              </Button>

            </Card.Footer>
          </Card>
        </Modal>
      )}
    </Col>
  );
}

function CoursesApp() {
  return (
    <div>
      <h1 style={{marginTop:'1.5rem', marginLeft: '76.4px', paddingLeft:'12px'}}>Courses</h1>
      <Courses />
    </div>
  );
}

export default CoursesApp;
