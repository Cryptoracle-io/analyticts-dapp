import React, { useState } from "react";
import { Button, Col, Input, InputGroup, Label, Row } from "reactstrap";
import axios from 'axios';
import PIC from "../../../assets/images/near/Untitled.png"
import TermsOfServiceModal from './TermsOfServiceModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';
const TwitterVerification = ({ toggleTab, activeTab, setError, username, setUsername }) => {

  // Define the validateAccountId function here
  const [isChecked, setIsChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const validateAccountId = (accountId) => {
    const ACCOUNT_ID_REGEX = /^(?!_)[@a-zA-Z0-9_]{1,16}$/
      // /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

    return (
      accountId.length >= 3 &&
      accountId.length <= 32 &&
      ACCOUNT_ID_REGEX.test(accountId)
    );
  };

  const validateTwitterFollowing = async () => {
    const response = await fetch('https://feed.revolt5.win/followers');
    const data = await response.json();

    const lowerCaseFollowers = data.followers.map(follower => follower.toLowerCase());
    return lowerCaseFollowers.includes(username.toLowerCase());
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if the checkbox is checked
    if (!isChecked) {
      setError("You must agree to the Terms of Service and Privacy Policy to continue.");
      return;
    }

    // Check if the username is valid using validateAccountId
    if (!validateAccountId(username)) {
      setError("Invalid username. Please enter a valid username.");
      return;
    }

    const isUserValid = true;
    const checkUser = await fetch( `${process.env.REACT_APP_IMAGES}/user?key=${username.toLowerCase()}`);
    if (!checkUser.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await checkUser.text();
    if (result === 'true') {
      setError("That username is alredy registred");
      return;
    }

    if (isUserValid) {
      toggleTab(activeTab + 1, 50);
    } else {
      setError("Please follow us on Twitter.");
    }
  }


  return <>
  <TermsOfServiceModal isOpen={termsModalOpen} toggle={() => setTermsModalOpen(!termsModalOpen)} />
  <PrivacyPolicyModal isOpen={privacyModalOpen} toggle={() => setPrivacyModalOpen(!privacyModalOpen)} />

    <Row className="text-center pt-3 pb-4 mb-1">

      <div className="mb-4">
        <div className="text-center">
          {/* <div style={{ maxWidth: "100%" }}>
              <img className='img-fluid' src={PIC} alt="description" />
            </div>             */}
        </div>
        <div>
          <h3 className="mb-1">General Information</h3>
          <p className="text-muted text-center">
            Fill all Information as below.
          </p>
        </div>
        <br></br>
        <Button color="primary" className="rounded-pill">

          <a
            href="https://twitter.com/Cryptoracleio?ref_src=twsrc%5Etfw"
            className="twitter-follow-button"
            target="_blank"
            rel="noreferrer noopener"
            data-show-count="false"
            style={{ color: 'white' }}>

            Follow @Cryptoracleio
          </a>
        </Button>
      </div>

      <Col >
        <Label for="validationDefaultUsername" className="form-label">Your twitter Username</Label>
        <InputGroup>
          <span className="input-group-text" id="inputGroupPrepend2">@</span>
          <Input
            type="text"
            className="form-control"
            id="validationDefaultUsername"
            aria-describedby="inputGroupPrepend2"
            name="validationDefaultUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

        </InputGroup>
      </Col>

    </Row>
    <Row style={{ "padding": "0 20px" }}>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="checkTerms"
          checked={isChecked}
          onChange={() => setIsChecked(prevState => !prevState)}
        />
        <label className="form-check-label" htmlFor="checkTerms">
          I agree to the
          <span
            className="fw-semibold"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setTermsModalOpen(true)}>
            Terms of Service 
          </span>
          &nbsp;and&nbsp;
          <span
            className="fw-semibold"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setPrivacyModalOpen(true)}>
            Privacy Policy
          </span>
        </label>
      </div>
      <Button color="primary" onClick={((e) => onSubmit(e))}>Continue</Button>
    </Row>
  </>
}

export default TwitterVerification;