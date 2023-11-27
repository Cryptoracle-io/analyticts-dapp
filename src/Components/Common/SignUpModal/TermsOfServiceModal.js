import React, { useState } from 'react';
import { Modal, ModalHeader, Button } from 'reactstrap';

const TermsOfServiceModal = ({ isOpen, toggle }) => {
    const [modal_scroll, setmodal_scroll] = useState(false);
    function tog_scroll() {
        setmodal_scroll(!modal_scroll);
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} scrollable={true} id="exampleModalScrollable">
            <ModalHeader>
                <h6 className="fs-15">Cryptoracle.io Raffle Terms of Service</h6>
            </ModalHeader>
            <div className="modal-body">
                <h6 className="fs-15">Eligibility</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">To participate in the Cryptoracle.io raffle, participants must be at least 18 years of age.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2 ">
                        <p className="text-muted mb-0">Participants should have a valid Twitter account and must follow the "@Cryptoracleio" Twitter account.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2 ">
                        <p className="text-muted mb-0">Employees, contractors, directors, and officers of Cryptoracle.io or affiliated companies are not eligible to participate.</p>
                    </div>
                </div>

                <h6 className="fs-15 mt-3">Entry Procedure</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">Participants must follow "@Cryptoracleio" on Twitter.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">Participants must retweet the designated raffle post and tag 3 friends in the retweet.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">Participants must enter their Twitter username on the follow the Procedure to create a wallet with an anonymous username.</p>
                    </div>
                </div>
                

                <h6 className="fs-15 mt-3">Selection of Winner</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">Once "@Cryptoracleio" reaches more than 1000 followers on Twitter and more than 1000 wallets have been created on the Cryptoracle.io platform, one winner will be chosen randomly.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">The selected winner will be notified via Twitter Direct Message.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">If the winner does not respond within 72 hours, a new winner may be selected.</p>
                    </div>
                </div>

                <h6 className="fs-15 mt-3">Prize</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">The 5 winners will receive $20 in USDC. The prize is non-transferable.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">The prize is non-transferable and non-exchangeable.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">The prize will be send to the users wallet created in our website.</p>
                    </div>
                </div>

                <h6 className="fs-15 mt-3">General Provisions</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">Cryptoracle.io reserves the right to modify or cancel the raffle at any time.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">By participating, entrants agree to these terms and conditions.</p>
                    </div>
                </div>
            </div>


            <div className="modal-footer">
                <Button
                    color="light"
                    onClick={toggle}
                >
                    Close
                </Button>
            </div>
        </Modal>
    );
}

export default TermsOfServiceModal;
