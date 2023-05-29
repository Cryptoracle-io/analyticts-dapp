import React, { useEffect, useState } from "react";
import { parseSeedPhrase, generateSeedPhrase, publicKey } from 'near-seed-phrase';
import { Button, Row } from "reactstrap";
import FeatherIcon from "feather-icons-react";

import './GeneratePassphrase.css';

const GeneratePassphrase = ({
    toggleTab, 
    activeTab, 
    currentPassphrase, 
    setCurrentPassphrase, 
    setWordNumber, 
    account, 
    setAccount}) => {

    const generatePassphrase = () => {
        const {seedPhrase, publicKey, secretKey} = generateSeedPhrase();
        const passphraseArray = seedPhrase.split(" ");
        console.log(passphraseArray);
        setCurrentPassphrase(passphraseArray);
        setAccount({...account, publicKey: publicKey});
        const randomIndex = passphraseArray.length;
        setWordNumber(randomIndex);
    }

    const copyToClipboard = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(currentPassphrase);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        toggleTab(activeTab + 1, 50);
    }

    useEffect(() => {
        if(activeTab === 2) {
            generatePassphrase();
        }
    }, [activeTab]);

    return <>
        <Row className="text-center pt-3 pb-4 mb-1">
            <div className="mb-4">
                <div>
                    <h3 className="mb-1">Setup your secure passphrase</h3>
                    <p className="text-muted">
                        Write down the following words in order to keep them somewhere safe. 
                        <span className="fw-semibold text-warning"> Anyone with access to it will also have access to your account! </span>
                        You'll be asked to verify your passphrase next.
                    </p>
                </div>
            </div>
            <div className="passphrase-container">
                {currentPassphrase && currentPassphrase.map((passphrase, index) => {
                    return <div key={index} className='phrase'>
                        <span>{index + 1}</span>
                        <label>{passphrase}</label>
                    </div>
                })}
            </div>
            <div className="buttons-container">
                <Button onClick={((e) => copyToClipboard(e))}>
                    <FeatherIcon icon="copy" className="mr-1 mb-1 icon-dual-success " />
                    Copy
                </Button>
                <Button onClick={() => generatePassphrase()} color="secondary">
                    <FeatherIcon icon="refresh-cw" className="mr-1 mb-1 icon-dual-success "/>
                    Generate New
                </Button>
            </div>
        </Row>
        <Row style={{"padding": "0 20px"}}>
            <Button color="primary" onClick={((e) => onSubmit(e))}>Continue</Button>
        </Row>
    </>
}

export default GeneratePassphrase;