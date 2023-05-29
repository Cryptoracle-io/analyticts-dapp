import React from "react";
import { parseSeedPhrase, generateSeedPhrase } from 'near-seed-phrase';
import {
  Alert, ModalHeader, Modal, ModalBody, Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Progress,
  InputGroup
} from "reactstrap";
import axios from "axios";
import { useState } from "react";
import classnames from "classnames";
import {Rating} from 'react-simple-star-rating'
import logoDark from "../../../assets/images/favicon.png";
import TwitterVerification from "./TwitterVerification";
import GeneratePassphrase from "./GeneratePassphrase";
import ValidatePassphrase from "./ValidatePassphrase";
import SigninSuccessful from "./SigninSuccessful";
import * as naj  from 'near-api-js'
import { NearClient } from "./../../../near/myNearConnection";

const ModalCTest = () => {
  //Wizard const 
  const [activeTab, setactiveTab] = useState(1);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [currentPassphrase, setCurrentPassphrase] = useState();
  const [error, setError] = useState(null);
  const [wordNumber, setWordNumber] = useState(0);
  const [word, setWord] = useState('');
  const [username, setUsername] = useState('');
  const [account, setAccount] = useState({
    md5Username: null,
    publicKey: null
  });

  const [modal_signUpModals, setmodal_signUpModals] = useState(false);
  function tog_signUpModals() {
    startOver();
    setmodal_signUpModals(!modal_signUpModals);
  }

  function toggleTab(tab, value) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
    setprogressbarvalue(value);
  }  

  const isPassphraseValid = () => {
    return currentPassphrase.includes(word);
  }

  const startOver = (e) => {
    e?.preventDefault();
    setUsername('');
    setCurrentPassphrase([]);
    setError(null);
    setWordNumber(0);
    setWord('');
    toggleTab(1, 50);
    setprogressbarvalue(0);
  }

  const createAccount = async (md5Username, pKey) => {
    
    const privateKey = process.env.REACT_APP_PRIVATE_KEY;
    const contractId = process.env.REACT_APP_CONTRACT_NAME;
    const nearClient = new NearClient(privateKey, contractId);

    await nearClient.init();

    const myKeyStore =new naj.keyStores.BrowserLocalStorageKeyStore();
    const keyPair = naj.KeyPair.fromRandom('ED25519');
    const publicKey = keyPair.publicKey.toString();
    const newAccountencoded = md5Username.toString().slice(0, 10); //naj.utils.PublicKey.fromString(md5UserName).data.toString('hex')
    await myKeyStore.setKey("testnet", `${newAccountencoded}.${contractId}`, keyPair);
    const viewMethods = ["get_accounts_count"];
    const changeMethods = ["create_subaccount"];
    await nearClient.createContract(contractId, viewMethods, changeMethods);
    const methodName = "create_subaccount";
    const args = { pre_fix: newAccountencoded, public_key: pKey, access_key: publicKey  };
    const result = await nearClient.callContractMethod(methodName, args);
  
    
    return result;
  }

  return (
    <>
      <div>
        <Button color='primary'  className="btn-success btn-label left" onClick={() => tog_signUpModals()} data-bs-toggle="modal" data-bs-target="#signupModals">Click me</Button>
      </div>

      <Modal id="signupModals" tabIndex="-1" isOpen={modal_signUpModals} toggle={() => { tog_signUpModals(); }} centered>
        <ModalHeader className="p-3" toggle={() => { tog_signUpModals(); }}>
          Sign Up
        </ModalHeader>
        <Alert color="success" className="rounded-0 mb-0">
          <p className="mb-0">Up to <span className="fw-semibold">50% OFF</span>, Hurry up before the stock ends</p>
        </Alert>
        {error && 
          <Alert color="danger" className="rounded-0 mb-0">
            <p className="mb-0">{error}</p>
          </Alert>
        }
        <ModalBody>
          <Form action="#" className="form-steps">
            <div className="text-center pt-3 pb-4 mb-1">
              <h5>Signup Your Account</h5>
            </div>

            <div className="progress-nav mb-4">
              <Progress
                value={progressbarvalue}
                style={{ height: "1px" }}
              />

              <Nav
                className="nav-pills progress-bar-tab custom-nav"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    to="#"
                    id="pills-gen-info-tab"
                    className={classnames(
                      {
                        active: activeTab === 1,
                        done: activeTab <= 4 && activeTab >= 0,
                      },
                      "rounded-pill"
                    )}
                    /*
                    onClick={(e) => {
                      e.preventDefault();
                      toggleTab(1, 0);
                    }}
                    */
                    tag="button"
                  >
                    1
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    id="pills-gen-info-tab"
                    className={classnames(
                      {
                        active: activeTab === 2,
                        done: activeTab <= 4 && activeTab > 1,
                      },
                      "rounded-pill"
                    )}
                    /*
                    onClick={(e) => {
                      e.preventDefault();
                      toggleTab(2, 50);
                    }}
                    */
                    tag="button"
                  >
                    2
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    id="pills-gen-info-tab"
                    className={classnames(
                      {
                        active: activeTab === 3,
                        done: activeTab <= 4 && activeTab > 2,
                      },
                      "rounded-pill"
                    )}
                    /*
                    onClick={(e) => {
                      e.preventDefault();
                      toggleTab(3, 100);
                    }}
                    */
                    tag="button"
                  >
                    3
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    id="pills-gen-info-tab"
                    className={classnames(
                      {
                        active: activeTab === 4,
                        done: activeTab <= 4 && activeTab > 3,
                      },
                      "rounded-pill"
                    )}
                    /*
                    onClick={(e) => {
                      e.preventDefault();
                      toggleTab(4, 100);
                    }}
                    */
                    tag="button"
                  >
                    4
                  </NavLink>
                </NavItem>
              </Nav>
            </div>

            <TabContent activeTab={activeTab}>

              <TabPane tabId={1}>
                <TwitterVerification 
                  toggleTab={toggleTab} 
                  activeTab={activeTab} 
                  setError={setError}
                  username={username} 
                  setUsername={setUsername} />
              </TabPane>

              <TabPane tabId={2}>
                <GeneratePassphrase 
                  toggleTab={toggleTab} 
                  activeTab={activeTab} 
                  currentPassphrase={currentPassphrase} 
                  setCurrentPassphrase={setCurrentPassphrase}
                  setWordNumber={setWordNumber}
                  account={account}
                  setAccount={setAccount} />
              </TabPane>

              <TabPane tabId={3}>
                <ValidatePassphrase 
                  username={username}
                  toggleTab={toggleTab} 
                  activeTab={activeTab} 
                  setError={setError}
                  wordNumber={wordNumber}
                  word={word}
                  setWord={setWord}
                  isPassphraseValid={isPassphraseValid}
                  startOver={startOver}
                  account={account}
                  setAccount={setAccount}
                  createAccount={createAccount} />
              </TabPane>

              <TabPane tabId={4}>
                <SigninSuccessful 
                  toggleTab={toggleTab} 
                  activeTab={activeTab} 
                  setError={setError} />
              </TabPane>

            </TabContent>
          </Form>
        </ModalBody>
        <div className="modal-footer  p-3 justify-content-center" >
                    <p className="mb-0 text-muted">You like our service? <Button size="sm" color="link"> Small button </Button></p>
                </div>
      </Modal>
    </>
  );
};



export default ModalCTest;