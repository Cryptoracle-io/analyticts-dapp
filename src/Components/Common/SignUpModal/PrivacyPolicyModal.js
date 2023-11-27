import React, { useState } from 'react';
import { Modal, ModalHeader, Button } from 'reactstrap';

const PrivacyPolicyModal = ({ isOpen, toggle }) => {
    const [modal_scroll, setmodal_scroll] = useState(false);
    function tog_scroll() {
        setmodal_scroll(!modal_scroll);
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} scrollable={true} id="exampleModalScrollable">
            <ModalHeader>
                <h6 className="fs-15">Cryptoracle.io Raffle Privacy Policy</h6>
            </ModalHeader>
            <div className="modal-body">

                <h6 className="fs-15">1. Data Collection</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">We collect participants' Twitter usernames and anonymous wallet usernames for the purpose of the raffle. No other personal data is collected or stored.</p>
                    </div>
                </div>

                <h6 className="fs-15 mt-3">2. Data Use</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">Data collected will solely be used for the purpose of the raffle and will not be used for any other marketing initiatives unless consent has been expressly given.</p>
                    </div>
                </div>

                <h6 className="fs-15 mt-3">3. Data Sharing</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">Cryptoracle.io does not share, sell, or disclose the collected data with third parties. Data may be disclosed if required by law.</p>
                    </div>
                </div>

                <h6 className="fs-15 mt-3">4. Data Retention</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">The data collected will be retained for a period necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.</p>
                    </div>
                </div>

                <h6 className="fs-15 mt-3">5. Your Rights</h6>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">Participants have the right to request access to and rectification or erasure of their personal data. Any concerns or questions about this policy should be directed to our contact email provided on the Cryptoracle.io website.</p>
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

export default PrivacyPolicyModal;
