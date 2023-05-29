import React, { useState, useEffect, useMemo } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { Chart2 } from "./Chart";
import FeatherIcon from "feather-icons-react";
import { TopWhales } from './TopPerformersNear';
import { format, formatNumber, formatyocto } from '../../helpers/lib';
import Loader from './Loader';
import { Cards } from './CollectionProfileItems';

    const Whales = () => {
        const dispatch = useDispatch();
        const [periodType, setPeriodType] = useState("halfyearly");
        const [topDataBuyers, setTopDataBuyers] = useState([]);
        const [topDataSellers, setTopDataSellers] = useState([]);
        const [buyersIds, setbuyersIds] = useState([]);
        const [buyersData, setbuyersData] = useState([]);
        const [totalBuysData, settotalBuysData] = useState([]);
        const [sellersIds, setsellersIds] = useState([]);
        const [sellersData, setsellersData] = useState([]);
        const [activitiesSellers, setActivitiesSellers] = useState([]);
        const [totalSellsData, settotalSellsData] = useState([]);
        const [totalBuysAvr, setTotalBuysAvr] = useState(0);
        const [totalSellsAvr, setTotalSellsAvr] = useState(0);
        const [loading, setLoading] = useState(false);
        const fetchCountryData = async (period) => {
            setLoading(true);
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + '/activities/top-users?__limit=30');
                const data = await response.json();
                setTopDataBuyers(data.data.buyers);
                setTopDataSellers(data.data.sellers);
                let actBuyersIds = [];
                let actBuyersTotal = [];
                data.data.buyers.map((buyer) => actBuyersIds.push(buyer.account_id));
                setbuyersIds(actBuyersIds);
                data.data.buyers.map((buyer) => actBuyersTotal.push(parseInt(formatyocto(buyer.total_sum, 0))));
                setbuyersData(actBuyersTotal);
                const sumBuyers = actBuyersTotal.reduce((acc, val) => acc + val, 0);
                settotalBuysData(sumBuyers);
                // Calculate the average by dividing the sum by the number of elements

                
                
                let actSellers = [];
                let actSellerstotal = [];
                data.data.sellers.map((seller) => actSellers.push(seller.account_id));
                setsellersIds(actSellers);
                data.data.sellers.map((seller) => actSellerstotal.push(parseInt(formatyocto(seller.total_sum, 0))));
                setsellersData(actSellerstotal);
                const sumSellers = actSellerstotal.reduce((acc, val) => acc + val, 0);
                settotalSellsData(sumSellers);
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching country data:', error);
                setLoading(false);
            }
        };
        const newTotalBuysAvr = useMemo(() => formatNumber(totalBuysData / buyersData.length), [totalBuysData, buyersData]);
        const newTotalSellsAvr = useMemo(() => formatNumber(totalSellsData / sellersData.length), [totalSellsData, sellersData]);
        
        useEffect(() => {
            // Set the new averages
            setTotalBuysAvr(newTotalBuysAvr);
            setTotalSellsAvr(newTotalSellsAvr);
        }, [newTotalBuysAvr, newTotalSellsAvr]);
        
        const onChangeChartPeriod = pType => {
            setPeriodType(pType);
            fetchCountryData(pType);
        };

     

        useEffect(() => {
            fetchCountryData("halfyearly");
        }, []);

        if (loading || !topDataBuyers) {
            return <div className="page-content">
                <Container fluid={true}>
                    <Loader />
                </Container>
            </div>
        }

    return (
        <React.Fragment>
            <Row >
            <Col xl={6} >
                <Row>
                        <Col >
                            <Card className={"card-animate"}>
                                <CardBody>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h1 className="ff-secondary fw-semibold text-center text-uppercase text-primary">
                                            Top Buyers Whales
                                        </h1>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Cards data={totalBuysData } Title="Top 20 Whales Total buy volume" icon={"trending-up"} name={"text-success"} nearicon={1}/>
                        <Cards data={totalBuysAvr } Title="Avr. top buyer volume" icon={"activity"} name={"text-primary"} nearicon={1}/>
                    </Row>
                    <Row>
                        {topDataBuyers && !!topDataBuyers &&
                            <TopWhales data={topDataBuyers} Label="Top Buyers 7D" className=" flex-grow-1"/>
                        }
                    </Row>
                    <Row>
                        <Card className="card-height-200">
                            <div className="card-header align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">TOP 20 BUYERS WHALES </h4>
                            </div>
                            <div className="card-body p-0">
                                <div>
                                    <div
                                        id="countries_charts"
                                        className="apex-charts" dir="ltr">
                                        <Chart2
                                            dataseries={buyersData}
                                            dataColors='["--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary-rgb, 0.45", "--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary"]'
                                            datausers={buyersIds}
                                            className="ms-2 flex-grow-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Row>


                </Col>
                <Col xl={6} >
                    <Row>
                        <Col >
                            <Card className={"card-animate"}>
                                <CardBody>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h1 className="text-center  ff-secondary fw-semibold  text-uppercase text-primary">
                                            Top Sellers Whales
                                        </h1>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Cards data={totalSellsData} Title="Top 20 Whales Total sold volume" icon={"trending-up"} name={"text-success"} nearicon={1}/>
                        <Cards data={totalSellsAvr} Title="Avr. top sellers volume" icon={"activity"} name={"text-primary"} nearicon={1}/>
                    </Row>
                    <Row>
                        {topDataSellers && !!topDataSellers &&
                            <TopWhales data={topDataSellers} Label="Top Sellers 7D" />
                        }
                    </Row>
                    <Row>
                        <Card className="card-height-100 me-2">
                            <div className="card-header align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">TOP 20 Sellers WHALES </h4>
                            </div>
                            <div className="card-body p-0">
                                <div>
                                    <div
                                        id="countries_charts"
                                        className="apex-charts" dir="ltr">
                                        <Chart2
                                            dataseries={sellersData}
                                            dataColors='["--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary-rgb, 0.45", "--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary"]'
                                            datausers={sellersIds}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Row>


                </Col>
                
                
                
            </Row>



        </React.Fragment>
    );
};

export default Whales;
