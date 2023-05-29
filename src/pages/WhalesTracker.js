import React,{ useEffect, useState } from 'react';
import { Container,Row, Col } from 'reactstrap';
import BreadCrumb from  "../Components/Common/BreadCrumb";
import FeaturedBlogs from '../Components/Common/FeaturedBlogs'
import Loader from '../Components/Common/Loader';
import Whales from '../Components/Common/Whales';
export default function WhalesTracker(props){

    const [collections, setCollections] = useState(null);
    const [highestSales, setHighestSales] = useState([]);
    const [nearPrice, setnearPrice] = useState(null);
    const [activitiesBuyers, setActivitiesBuyers] = useState([]);
    const [activitiesSellers, setActivitiesSellers] = useState([]);
    const init = async () => {

    };
    
    useEffect(() => {
        init();
    }, []);


    return (
        
            <div className="page-content">
                <Container fluid={true}>
                    <BreadCrumb title="Whales Tracker" breadcrumbItem="Whales" />
                            <Whales/>
                            <FeaturedBlogs/>
                </Container>
            </div>
        
        );
}