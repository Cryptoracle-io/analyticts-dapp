import React, { useState } from "react";
import { Button, Col, Input, InputGroup, Label, Row } from "reactstrap";
import axios from 'axios';

const TwitterVerification = ({toggleTab, activeTab, setError, username, setUsername}) => {

    const validateTwitterFollowing = async () => {
        
        const response = await fetch('https://feed.revolt5.win/followers');
        const data = await response.json();
   
        const lowerCaseFollowers = data.followers.map(follower => follower.toLocaleLowerCase());
        return lowerCaseFollowers.includes(username.toLowerCase());
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const isUserValid = await validateTwitterFollowing();
        if(isUserValid) {
            toggleTab(activeTab + 1, 50);
            return;
        }
        setError("Please follow us on Twitter.");
    }

    return <>
        <Row className="text-center pt-3 pb-4 mb-1">

            <div className="mb-4">
                <div>
                    <h3 className="mb-1">General Information</h3>
                    <p className="text-muted text-center">
                    Fill all Information as below.
                    </p>
                </div>
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
                <Label for="validationDefaultUsername" className="form-label">Username</Label>
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
        <Row style={{"padding": "0 20px"}}>
            <Button color="primary" onClick={((e) => onSubmit(e))}>Continue</Button>
        </Row>
    </>
}

export default TwitterVerification;