import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { uuid } from "uuidv4";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


// for the initial render
const initialInputsState = {
  title: "",
  duration: "",
  imagePath: "",
  onlineChecked: false,
  description: "",
  startDate: "",
  endDate: "",
  earlyBid: 0,
  normalPrice: 0,
};

const EditCourse = () => {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState(initialInputsState);
  const location = useLocation();
  //   console.log(location.state);

  useEffect(() => {
    // console.log("http://localhost:3001/courses/" + location.state);
    axios
      .get("http://localhost:3001/courses/" + location.state)
      .then((response) => {
        const myDetails = response.data;
        // console.log(myDetails);
        setFormInputs({
          title: myDetails.title,
          duration: myDetails.duration,
          imagePath: myDetails.imagePath,
          onlineChecked: myDetails.online,
          description: myDetails.description,
          startDate: myDetails.dates.start_date,
          endDate: myDetails.dates.end_date,
          earlyBid: myDetails.price.early_bird,
          normalPrice: myDetails.price.normal,
        });
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .put("http://localhost:3001/courses/" + location.state, {
        id: location.state.id,
        title: formInputs.title,
        imagePath: formInputs.imagePath,
        price: {
          early_bird: +formInputs.earlyBid,
          normal: +formInputs.normalPrice,
        },
        dates: {
          start_date: formInputs.startDate,
          end_date: formInputs.endDate,
        },
        duration: formInputs.duration,
        online: formInputs.onlineChecked,
        description: formInputs.description,
      })
      .then((response) => {
        navigate("/courses")
      });
  }

  const updateInput = (input) => (e) => {
    setFormInputs({ ...formInputs, [input]: e.target.value });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1 className="mt-4">Edit Course</h1>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formInputs.title}
            placeholder="Title"
            onChange={updateInput("title")}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            value={formInputs.duration}
            placeholder="Duration"
            onChange={updateInput("duration")}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Image path</Form.Label>
          <Form.Control
            type="text"
            value={formInputs.imagePath}
            placeholder="Image path"
            onChange={updateInput("imagePath")}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            checked={formInputs.onlineChecked}
            label="Online"
            onChange={() => {
              setFormInputs({
                ...formInputs,
                onlineChecked: !formInputs.onlineChecked,
              });
            }}
          />
        </Form.Group>
        <hr />
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formInputs.description}
            onChange={updateInput("description")}
            required
          />
        </Form.Group>
        <hr />
        <h2>Dates</h2>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Start date:</Form.Label>
          <Form.Control
            type="date"
            value={formInputs.startDate}
            onChange={updateInput("startDate")}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>End date:</Form.Label>
          <Form.Control
            type="date"
            value={formInputs.endDate}
            onChange={updateInput("endDate")}
            required
          />
        </Form.Group>
        <hr />
        <h2>Price</h2>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Early Bird:</Form.Label>
          <Form.Control
            type="number"
            placeholder="0"
            value={formInputs.earlyBid}
            onChange={updateInput("earlyBid")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Normal price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="0"
            value={formInputs.normalPrice}
            onChange={updateInput("normalPrice")}
          />
        </Form.Group>

        <hr />
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditCourse;
