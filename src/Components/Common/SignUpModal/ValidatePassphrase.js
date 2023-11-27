import React, { useState } from "react";
import { Button, Input, InputGroup, Label, Row } from "reactstrap";
import md5 from "md5";

const ValidatePassphrase = ({
    username,
    wordNumber, 
    word, 
    setWord, 
    toggleTab, 
    activeTab, 
    isPassphraseValid, 
    setError, 
    startOver,
    account,
    setAccount,
    createAccount
}) => {
    const [loading, setLoading] = useState(false);

    const generateMd5Username = () => {
        const md5User = md5(username.toLowerCase());
        //const md5User = username;
        return md5User.toString().slice(0, 10);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // <-- Start the loading state

        if(isPassphraseValid()) {
            const md5User = generateMd5Username();

            
            await createAccount(md5User, account.publicKey);
            toggleTab(activeTab + 1, 50);
            localStorage.setItem('signedInAccount', `${md5User}.${process.env.REACT_APP_CONTRACT_NAME}` );
            const url = `${process.env.REACT_APP_IMAGES}/raffle?key=${username.toLowerCase()}&value=${md5User}`;
            const response = await fetch(url);
        } else {
            setError("The passphrase is incorrect. Please try again.");
        }

        setLoading(false);  // <-- End the loading state
    }

    return <>
        <Row className="text-center pt-3 pb-4 mb-1">
            <div className="mb-4">
                <div>
                    <h3 className="mb-1">Verify secure passphrase</h3>
                    <p className="text-muted">
                        Enter the following word from your recovery phrase to complete the setup process.
                    </p>
                </div>
            </div>
            <Label for="validationPassphrase" className="form-label word-number">{`Word #${wordNumber}`}</Label>
            <InputGroup>
                <Input 
                    type="text" 
                    className="form-control" 
                    id="validationDefaultUsername" 
                    aria-describedby="inputGroupPrepend2" 
                    name="validationDefaultUsername"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    required 
                />
            </InputGroup>
        </Row>
        <Row>
            <div className="step-3-buttons-container">
                {loading ? (
                    <button type="button" className="btn btn-info btn-load">
                        <span className="d-flex align-items-center">
                            <span className="flex-grow-1 me-2">
                                Loading...
                            </span>
                            <span className="spinner-grow flex-shrink-0" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </span>
                        </span>
                    </button>
                ) : (
                    <>
                        <Button color="primary" onClick={((e) => onSubmit(e))}>Verify and complete</Button>
                        <Button color="light" onClick={((e) => startOver(e))}>Start Over</Button>
                    </>
                )}
            </div>
        </Row>
    </>
}

export default ValidatePassphrase;