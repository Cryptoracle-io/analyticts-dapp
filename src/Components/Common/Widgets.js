import React from 'react';
import CountUp from "react-countup";
import { Card, CardBody, Col ,Row , Badge} from 'reactstrap';
import { format , formatyocto} from '../../helpers/lib';
import Astronaut1 from '../../assets/images/astronautas/Astronaut-1.png';
import Astronaut7 from '../../assets/images/astronautas/Astronaut-7.png';
import Astronaut3 from '../../assets/images/astronautas/Astronaut-3.png';
import Astronaut4 from '../../assets/images/astronautas/Astronaut-4.png';
import Astronaut5 from '../../assets/images/astronautas/Astronaut-5.png';
import Astronaut6 from '../../assets/images/astronautas/Astronaut-6.png';
const Widgets = ({data, performer}) => {
    let mothTotalContracts = data.MothTotalContracts.slice(-6);
    let mothCirculatingSupply = data.MothCirculatingSupply.slice(-6);
    let monthTotalAccounts = data.MonthTotalAccounts.slice(-6);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const Astronaut = [Astronaut1,Astronaut7,Astronaut3,Astronaut4,Astronaut5,Astronaut6]
    // const d = new Date(mothTotalContracts);
    // const m = d.getMonth() 
     
    return (
        <React.Fragment>
            <Row>
                <div className="d-flex mb-3">
                    <div className="flex-grow-1">
                        <h4 className="text-muted mb-0">
                            Monthly Stats:
                        </h4>
                    </div>
                </div>
            </Row>
            {data.MothTotalTransactions && data.MothTotalTransactions.slice(-6).map((item, key) => (
                <Col lg={2} md={6} key={key}>
                    <Row>
                        <Card className="card-animate">
                            <CardBody className="text-center">
                                <img alt="astronauta 1" className="avatar-sm rounded-circle " src={Astronaut[key]} /> <h3 className="mb-2">{month[new Date(item.timestamp).getMonth()]}</h3>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <Card className="card-animate">
                            <CardBody>
                                <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">{"Transactions"}</p>
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1 ms-3">
                                        <p className="fw-semibold fs-12 text-muted mb-1">{"Total:"}</p>
                                        <h4 className=" mb-0"> {format(item.total)}
                                        </h4>
                                    </div>
                                    <div className="flex-shrink-0 align-self-end">
                                        <p className="mb-0 text-muted"><span className={(item.totalchange > 0) ? "badge badge-soft-success mb-0" : "badge badge-soft-danger mb-0"}>
                                            <i className={(item.totalchange > 0) ? "ri-arrow-up-s-fill align-middle" : "ri-arrow-down-s-fill align-middle"}></i> {item.totalchange} %
                                        </span></p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1 ms-3">
                                        <p className="fw-semibold fs-12 text-muted mb-1">{"This month:"}</p>
                                        <h4 className=" mb-0"> {format(item.newmonth)}
                                        </h4>
                                    </div>
                                    <div className="flex-shrink-0 align-self-end">
                                        <p className="mb-0 text-muted"><span className={(item.change > 0) ? "badge badge-soft-success mb-0" : "badge badge-soft-danger mb-0"}>
                                            <i className={(item.change > 0) ? "ri-arrow-up-s-fill align-middle" : "ri-arrow-down-s-fill align-middle"}></i> {item.change} %
                                        </span></p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <Card className="card-animate">
                            <CardBody>
                                <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">{"Wallets"}</p>
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1 ms-3">
                                        <p className=" fw-semibold fs-12 text-muted mb-1">{"Total:"}</p>
                                        <h4 className=" mb-0"> {format(monthTotalAccounts[key]["accounts"])}
                                        </h4>
                                    </div>
                                    <div className="flex-shrink-0 align-self-end">
                                        <p className="mb-0 text-muted"><span className={(monthTotalAccounts[key]["change"] > 0) ? "badge badge-soft-success mb-0" : "badge badge-soft-danger mb-0"}>
                                            <i className={(monthTotalAccounts[key]["change"] > 0) ? "ri-arrow-up-s-fill align-middle" : "ri-arrow-down-s-fill align-middle"}></i> {monthTotalAccounts[key]["change"]} %
                                        </span></p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <Card className="card-animate">
                            <CardBody>
                                <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">{"Circulating Supply "}</p>
                                <div className="d-flex align-items-center">

                                    <div className="flex-grow-1 ms-3">
                                        <p className=" fw-semibold fs-12 text-muted mb-1">{"Stats:"}</p>
                                        <h4 className=" mb-0"> {format(mothCirculatingSupply[key]["circulatingsupply"])}
                                        </h4>
                                    </div>
                                    <div className="flex-shrink-0 align-self-end">
                                        <p className="mb-0 text-muted"><span className={(mothCirculatingSupply[key]["change"] > 0) ? "badge badge-soft-success mb-0" : "badge badge-soft-danger mb-0"}>
                                            <i className={(mothCirculatingSupply[key]["change"] > 0) ? "ri-arrow-up-s-fill align-middle" : "ri-arrow-down-s-fill align-middle"}></i> {mothCirculatingSupply[key]["change"]} %
                                        </span></p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <Card className="card-animate">
                            <CardBody>
                                <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">{"Smart-Contracts"}</p>
                                <div className="d-flex align-items-center">
                                    {/* <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                                        <i className={"align-middle ri-arrow-up-circle-fill"}></i>
                                    </span>
                                </div> */}
                                    <div className="flex-grow-1 ms-3">
                                        <p className="fw-semibold fs-12 text-muted mb-1">{"Total:"}</p>
                                        <h4 className=" mb-0"> {format(mothTotalContracts[key]["total"])}
                                        </h4>
                                    </div>
                                    <div className="flex-shrink-0 align-self-end">
                                        <p className="mb-0 text-muted"><span className={(mothTotalContracts[key]["totalchange"] > 0) ? "badge badge-soft-success mb-0" : "badge badge-soft-danger mb-0"}>
                                            <i className={(mothTotalContracts[key]["totalchange"] > 0) ? "ri-arrow-up-s-fill align-middle" : "ri-arrow-down-s-fill align-middle"}></i> {mothTotalContracts[key]["totalchange"]} %
                                        </span></p>
                                    </div>
                                    {/* <div className="flex-shrink-0 align-self-end">
                                <p className="mb-0 text-muted"><span className="badge bg-light text-danger mb-0">
                                    <i className="ri-arrow-down-line align-middle"></i> 3.96 %
                                </span> vs. previous month</p>  
                                </div> */}
                                </div>
                                <div className="d-flex align-items-center ">
                                    <div className="flex-grow-1 ms-3">
                                        <p className="fw-semibold fs-12 text-muted mb-1">{"This month:"}</p>
                                        <h4 className=" mb-0"> {format(mothTotalContracts[key]["newmonth"])}
                                        </h4>
                                    </div>
                                    {<div className="flex-shrink-0 align-self-end">
                                        <p className="mb-0 text-muted"><span className={(mothTotalContracts[key]["change"] > 0) ? "badge badge-soft-success mb-0" : "badge badge-soft-danger mb-0"}>
                                            <i className={(item.change > 0) ? "ri-arrow-up-s-fill align-middle" : "ri-arrow-down-s-fill align-middle"}></i> {mothTotalContracts[key]["change"]} %
                                        </span></p>
                                    </div>}
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                </Col>
            ))}
        </React.Fragment>
    );
};

export default Widgets;