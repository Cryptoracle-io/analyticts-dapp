import React,{ useEffect, useState } from 'react';
import { Container,Row, Col } from 'reactstrap';
import BreadCrumb from  "../Components/Common/BreadCrumb";
import FeaturedBlogs from '../Components/Common/FeaturedBlogs'
import Whales from '../Components/Common/Whales';
import { Wallet } from '../near/near-wallet';
import Signup from '../assets/images/near/signup.png'
export default function WhalesTracker(props){

    const [storedValue, setStoredValue] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [wallet] = useState(new Wallet({ createAccessKeyFor: process.env.REACT_APP_CONTRACT_NAME }));
    
    useEffect(() => {
        const initialize = async () => {
            const signedIn = await wallet.startUp();
            setIsSignedIn(signedIn);
            // Get the value from local storage
            const storedData = localStorage.getItem('signedInAccount');

            // Update the state if the stored value exists
            if (storedData) {
                setStoredValue(storedData);
            }
            //console.log(storedData)

        };
        initialize();
    }, [wallet]);

    if (!isSignedIn && !storedValue) {
        return (

          <div className="page-content">
          <Container fluid={true}>
              <BreadCrumb title="Whales Tracker" breadcrumbItem="Whales" />
              <Row className="justify-content-center">
                    <Col lg={8} sm={10}>
                        <div className="text-center">
                        <div data-aos="fade-right">   
                        <img src={Signup} alt="" className="img-fluid mx-auto mb-4" />
                        </div> 

   
                        </div>
                    </Col>
                </Row>
          </Container>
      </div>
        );
      }
    return (
          ( (storedValue!=null  || wallet.accountId.toString().includes("cryptoracleio.near")) ? (
            <div className="page-content">
                <Container fluid={true}>
                    <BreadCrumb title="Whales Tracker" breadcrumbItem="Whales" />
                            <Whales/>
                            <FeaturedBlogs/>
                </Container>
            </div>) : 
            (          <div className="page-content">
            <Container fluid={true}>
                <BreadCrumb title="Whales Tracker" breadcrumbItem="Whales" />
                <Row className="justify-content-center">
                      <Col lg={8} sm={10}>
                          <div className="text-center">
                          <div data-aos="fade-right">   
                          <img src={Signup} alt="" className="img-fluid mx-auto mb-4" />
                          </div> 

                          </div>
                      </Col>
                  </Row>
            </Container>
        </div>))
        
        );
}