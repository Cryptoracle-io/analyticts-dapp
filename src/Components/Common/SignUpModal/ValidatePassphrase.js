import React from "react";
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

    const generateMd5Username = () => {
        const md5User = md5(username);
        return md5User;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(isPassphraseValid()) {
            const md5User = generateMd5Username();
            await createAccount(md5User, account.publicKey);
            toggleTab(activeTab + 1, 50);
            return;
        }
        setError("The passphrase is incorrect. Please try again.");
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
                <Button color="primary" onClick={((e) => onSubmit(e))}>Verify and complete</Button>
                <Button color="light" onClick={((e) => startOver(e))}>Start Over</Button>
            </div>
        </Row>
    </>
}

export default ValidatePassphrase;