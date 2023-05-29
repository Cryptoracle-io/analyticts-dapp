import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Badge, Card, CardHeader, CardBody, Col, Container, FormGroup, Label, DropdownItem, DropdownMenu, DropdownToggle, Input, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledTooltip, UncontrolledCollapse, UncontrolledDropdown } from "reactstrap";
import { useParams, Link } from 'react-router-dom';
import classnames from "classnames";
import FeatherIcon from "feather-icons-react";
import CountUp from "react-countup";
import ReactTooltip from 'react-tooltip';
import Loader from './Loader';
import SimpleBar from "simplebar-react";
import BreadCrumb from "./BreadCrumb";
import { formatyocto, format, formatNumber } from '../../helpers/lib';
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import nearsvg from '../../assets/images/near.svg'
const Cards = ({ data, Title, icon, name, cols = 4 }) => {


    return (
        <React.Fragment>
            <Col md={cols}>
                <Card className={"card-animate"}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className="text-muted text-uppercase fs-13">{Title}</h5>
                                <h2 className="mt-4 ff-secondary fw-semibold ">
                                    {data}
                                </h2>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title rounded-circle fs-2 bg-soft-primary">
                                    <FeatherIcon
                                        icon={icon}
                                        className={name}
                                    />
                                </span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
}
const CardTitle = ({  Title, icon,name,  cols = 4 }) => {


    return (
        <React.Fragment>
            <Col md={cols}>
                <Card className={"card-animate"}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h1 className="text-muted text-uppercase fs-13">{Title}</h1>
                                {/* <h2 className="mt-4 ff-secondary fw-semibold ">
                                    {data}
                                </h2> */}
                            </div>
                            {icon?<div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title rounded-circle fs-2 bg-soft-primary">
                                    <FeatherIcon
                                        icon={icon}
                                        className={name}
                                    />
                                </span>
                            </div>:""}
                        </div>
                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
}
const Popularity = ({ data, Title, Cols = 12 }) => {

    if (!Array.isArray(data)) {
        console.error('Data prop is not an array');
        return null; // You can also return a message, e.g., "Invalid data"
    }
    return (
        <React.Fragment>
            <Col >
                <Card>
                    <CardHeader className="d-flex align-items-center">
                        <h6 className="card-title mb-0 flex-grow-1">{Title}</h6>
                        <Badge color="primary fs-13"> {data.length} </Badge>
                    </CardHeader>
                    <CardBody>
                        <div className="table-responsive table-card">
                            <SimpleBar style={{ maxHeight: "800px" }}>
                                <ul className="list-group list-group-flush">
                                    {data.map((item, key) => (
                                        <li key={key} className="list-group-item list-group-item-action">
                                            <div className="d-flex align-items-center">

                                                {item.media && item.media.includes("https://") ?
                                                    <img src={process.env.REACT_APP_IMAGES + "/image-resizing?width=48&image=" + item.media} alt="" className="avatar-sm object-cover rounded-circle" />
                                                    : <img src={process.env.REACT_APP_IMAGES + "/image-resizing?width=48&image=" + process.env.REACT_APP_IPFS_URL2 + "/" + item.media} alt="" className="avatar-sm object-cover rounded-circle" />
                                                }
                                                <div className="ms-3 flex-grow-1">
                                                    <Link to={"/collections/" + item.collection_id} className="stretched-link">
                                                        <h6 className="fs-13 mb-1">{item.collection}</h6>
                                                    </Link>
                                                    <p className="mb-0 fs-12 text-muted">{item.collection_id.slice(0, 20)}</p>
                                                </div>
                                                {/* <div>
                                                    <h6>{item.total_cards}</h6>
                                                </div> */}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </SimpleBar>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

const Widgets = ({ Label, Icon, counter, decimal = "2", prefix = "Ⓝ", separator = "," }) => {

    // {
    //     id: 1,
    //     icon: "ri-money-dollar-circle-fill",
    //     label: "Total Invested",
    //     counter: "2390.68",
    //     badge: "ri-arrow-up-s-fill",
    //     badgeColor: "success",
    //     percentage: "6.24",
    //     decimal: "2",
    //     prefix: "$",
    //     separator: ","
    // },
    if(prefix==="Ⓝ"){prefix="1"}
    return (
        <React.Fragment>
            <Col md={10} >
                <Card>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                                    <i className={"align-middle " + Icon}></i>
                                </span>
                            </div>
                            {/* <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title rounded-circle fs-2 bg-soft-primary">
                                        <FeatherIcon
                                            icon={icon}
                                            className={name}
                                        />
                                    </span>
                                </div> */}
                            <div className="flex-grow-1 ms-3">
                                <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">{Label}</p>
                                <div className="d-flex align-items-center ms-2">
                                    {prefix === "1" && (
                                    <NearSvg/>
                                    )}
                                    <h4 className="mb-1 ms-1">
                                        <CountUp
                                            start={0}
                                            end={counter}
                                            decimals={decimal}
                                            separator={separator}
                                            prefix={prefix}
                                            duration={3}
                                        />
                                    </h4>
                                </div>
                            </div>
                            {/* <div className="flex-shrink-0 align-self-end">
                                    <span className={"badge badge-soft-" + item.badgeColor}><i className={"align-middle me-1 " + item.badge}></i>{item.percentage} %<span>
                                    </span></span></div> */}
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

const NearSvg = ({size=".99em"}) => (
<svg width={size} height={size} fill="none" viewBox="0 0 15 15" className="mb-1"><path d="m12.032 0.762-3.135 4.655c-0.05 0.067-0.074 0.151-0.065 0.235 8e-3 0.083 0.048 0.161 0.11147 0.21644 0.06331 0.05554 0.14528 0.08503 0.22944 0.08254 0.08415-0.00249 0.16424-0.03678 0.22416-0.09596l3.0846-2.6667c0.0178-0.01632 0.0399-0.02706 0.0638-0.03088 0.0238-0.00382 0.0482-5.6e-4 0.0702 0.00937 0.022 0.00994 0.0406 0.02612 0.0535 0.04654 0.0129 0.02041 0.0195 0.04416 0.019 0.0683v8.3816c-2e-4 0.0255-0.0083 0.0503-0.0229 0.071-0.0147 0.0208-0.0354 0.0366-0.0593 0.0453s-0.0499 0.0099-0.0745 0.0034-0.0466-0.0203-0.0631-0.0397l-9.3272-11.167c-0.1489-0.17927-0.33519-0.32378-0.5458-0.4234-0.21061-0.099616-0.44044-0.15193-0.67339-0.15327h-0.32478c-0.42362 0-0.8299 0.16839-1.1294 0.46814s-0.46783 0.70629-0.46783 1.1302v11.803c0 0.4239 0.16828 0.8304 0.46783 1.1302 0.29955 0.2997 0.70582 0.4681 1.1294 0.4681 0.27295 0 0.54134-0.0701 0.77956-0.2034s0.43832-0.3255 0.5812-0.5583l3.1346-4.655c0.05079-0.06718 0.07427-0.15112 0.06573-0.23494-0.00855-0.08381-0.04849-0.16127-0.1118-0.21681s-0.14529-0.08502-0.22944-0.08253-0.16424 0.03677-0.22416 0.09595l-3.0846 2.6667c-0.01779 0.0163-0.03997 0.027-0.06379 0.0309-0.02383 0.0038-0.04825 5e-4 -0.07024-0.0094-0.02199-0.01-0.04059-0.0261-0.05347-0.0466-0.01289-0.0204-0.01951-0.0441-0.01903-0.0683v-8.3733c2.5e-4 -0.02544 0.00826-0.05021 0.02295-0.07098s0.03537-0.03656 0.05927-0.04526c0.0239-0.00869 0.04988-0.00988 0.07448-0.00341 0.02459 0.00648 0.04663 0.02031 0.06315 0.03965l9.3272 11.167c0.15 0.1776 0.337 0.3204 0.5478 0.4182 0.2109 0.0979 0.4406 0.1486 0.673 0.1484h0.3331c0.2098 0 0.4175-0.0413 0.6113-0.1216 0.1938-0.0804 0.3699-0.1981 0.5182-0.3465s0.2659-0.3246 0.3462-0.5185c0.0803-0.194 0.1216-0.4018 0.1216-0.6117v-11.802c0-0.21074-0.0416-0.4194-0.1225-0.61397-0.0809-0.19457-0.1995-0.37122-0.3489-0.51977-0.1493-0.14855-0.3266-0.26607-0.5215-0.34581-0.195-0.079733-0.4038-0.1201-0.6144-0.11878-0.2729 3.2768e-5 -0.5413 0.07006-0.7795 0.2034-0.2382 0.13334-0.4383 0.32554-0.5812 0.55826z" fill="currentColor"></path></svg>
  );

export { Cards, Popularity, Widgets, NearSvg };