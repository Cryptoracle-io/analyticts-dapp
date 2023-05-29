
import React from "react";
import { ModalHeader, Modal, ModalBody, Button  } from "reactstrap";
import axios from "axios";
import { useState } from "react";
import {Rating} from 'react-simple-star-rating'
import logoDark from "../../assets/images/favicon.png";
const ModalFeedback = () => {
  const [formStatus, setFormStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    feedback: "",
    email: "",
    rating: "",
  });
  const [text, setText] = useState("");
  //Rating
  const [rating, setRating] = useState(null) // initial rating value

  // Catch Rating value
  const handleRating = (rate)  => {
    setRating(rate)
    rate = rate.toString()
    handleSRating(rate);
  }

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setText(e.target.value);
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSRating = (rate) => {
    setQuery((prevState) => ({
      ...prevState,
      "rating": rate
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .post(
        process.env.REACT_APP_FEEDBACKURL,
        formData,
        { headers: { Accept: "application/json" } }
      )
      .then(function (response) {
        setFormStatus(true);
        setQuery({
          feedback: "",
          email: "",
          rating: "",
        });
        setLoading(false);
        setRating(false);
        setText("")
        
      })
      .catch(function (error) {
        //console.log(error);
        setLoading(false);
    });
};
const [modal_backdrop, setmodal_backdrop] = useState(false);
    
function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
}
  return (
    <>

      {/* <Button color="primary" onClick={() => tog_backdrop()}>
        Feedback
      </Button> */}
      <div className="social-media-size avatar-title rounded-circle" onClick={() => tog_backdrop()}>
        <i className="ri-chat-1-line"></i>
      </div>

      <Modal
        isOpen={modal_backdrop}
        toggle={() => {
          tog_backdrop();
        }}
        backdrop={'static'}
        id="staticBackdrop"
        centered
    >
        <ModalHeader toggle={() => {
                    tog_backdrop();
                }}>
                    Let's level up NEAR ecosystem
        </ModalHeader>
        <ModalBody className="text-center">
          <div style={{  maxWidth: "320px", margin: "80px auto 80px"}}>
          <img className='avatar-md rounded'  src={logoDark} alt="description"/>
          <h4 className="fst-italic mb-sm-0 text-center"style={{margin: 20}}>CryptOracle.io</h4>       
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <label htmlFor="message-text" className="col-form-label">Rate our app:</label>
                <Rating
                  onClick={handleRating}
                  ratingValue={rating}
                  size={60}
                  label
                  transition
                  fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                  emptyColor='gray'
                  className='foo' // Will remove the inline style if applied
                  showTooltip
                  tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Awesome!']}
                  name="rating"
                />

                <div id="basic-rater" dir="ltr"></div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Send us your Feedback or Request :</label>
                  <textarea className="form-control" id="message-text" rows="4" value={text} name="feedback" onChange={handleChange()}></textarea>
                </div>
                        
                  {/* <div className="form-group" style={{marginTop: "16px"}}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Send us your Feedback or Request"
                      value={query.name}
                      onChange={handleChange()}
                      className="col-form-label"
                      style={{  background: "#fff", textAlign: "center", border: "1px solid blue", padding: "80px", width: "100%", borderRadius: "6px", color: "blue"}}
                    />
                  </div> */}
                  <Button className="btn btn-success" disabled={!rating} type="submit" >Send</Button>
                  {formStatus && <p>Message sent. thank you!</p>}
                </form>
            </div>
        </ModalBody>
    </Modal>
    </>
  );
};



export default ModalFeedback;