import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ModalFeedback from '../Components/Common/ModalFeedback';
const Footer = () => {
    return (
        <React.Fragment>
            <footer className="custom-footer py-5 position-relative">
                <Container fluid>
                    <Row className="text-center text-sm-start align-items-center mt-5">
                        <Col sm={4}>
                            {new Date().getFullYear()} © {process.env.REACT_APP_NAME}. All data is for informational purposes only.
                        </Col>

                        <Col sm={3}>
                            <div className="text-sm-end mt-3 mt-sm-0">
                                <ul className="list-inline mb-0 footer-social-link ">
                                    <li className="list-inline-item px-2">
                                        <a href="https://discord.gg/dzXAdqwrCU" target="_blank" rel="noreferrer noopener" className="avatar-xs d-block">
                                            <div className="social-media-size avatar-title rounded-circle">
                                                <i className="ri-discord-fill"></i>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-inline-item px-2">
                                        <a href="https://twitter.com/Cryptoracleio" target="_blank" rel="noreferrer noopener" className="avatar-xs d-block">
                                            <div className="social-media-size avatar-title rounded-circle">
                                                <i className="ri-twitter-fill"></i>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-inline-item px-2">

                                        <a href="https://open.spotify.com/show/43zkE1TyGBE1GKDUUnQ5b2" target="_blank" rel="noreferrer noopener" className="avatar-xs d-block">
                                            <div className="social-media-size avatar-title rounded-circle">
                                                <i className="ri-spotify-fill"></i>
                                            </div>
                                        </a>

                                    </li>
                                    <li className="list-inline-item px-2">

                                        <a href="https://www.youtube.com/channel/UCzSXoOoUHVt5zYQFORxjvOQ" target="_blank" rel="noreferrer noopener" className="avatar-xs d-block">
                                            <div className="social-media-size avatar-title rounded-circle">
                                                <i className="ri-youtube-line"></i>
                                            </div>
                                        </a>

                                    </li>
                                    <li className="list-inline-item px-2">

                                            <ModalFeedback/>

                                    </li>

                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;