import React,{ useMemo, useEffect, useState } from 'react';
import { Container,Row } from 'reactstrap';
import BreadCrumb from  "../Components/Common/BreadCrumb";
import Widgets2 from "../Components/Common/Widgets2"
import Widgets from "../Components/Common/Widgets"
import Loader from '../Components/Common/Loader';

const NearHighlights = () => {
    const [data, setData] = useState({});
    const [ready, setReady] = useState(false);

const init = async () => { 
    
    const highlights = await fetch(process.env.REACT_APP_API_NH);
    const zero =  await highlights.json()
    let zeroArray =[];
     zeroArray.push(zero)
    //console.log("Zero log",zero);
    setData(zero)
    setReady(true);
    
};

useEffect(() => {
    init();
}, []);
if(!ready) return <div className="page-content">
        <Container fluid={true}>
            <Loader />
        </Container>
    </div>
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <BreadCrumb title="NearHighlights" />
                    <Row>
                        <Widgets2 data={data} performer="Buyers"/>
                    </Row>
                    <Row>
                        <Widgets data={data} performer="Buyers"/>
                    </Row>
                </Container>
            </div>
            {!data &&
                                            <div><Loader /></div>
                                        }
        </React.Fragment>
    );
};

export default NearHighlights;

