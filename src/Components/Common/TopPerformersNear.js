import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, UncontrolledTooltip } from 'reactstrap';
import { formatyocto } from '../../helpers/lib';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import SimpleBar from "simplebar-react";
import { NearSvg } from './utils';

const TopPerformersNear = ({ data, performer }) => {
    return (
        <React.Fragment>
            <Col xxl={4} lg={6}>
                <Card className="card-height-80">
                    <CardHeader className="align-items-center d-flex">
                        {performer === "Buyers" ?
                            <h4 className="card-title mb-0 flex-grow-1">{"Top " + performer}</h4>
                            :
                            <h4 className="card-title mb-0 flex-grow-1">{"Top " + performer}</h4>
                        }
                    </CardHeader>
                    <CardBody className="p-0">
                        <ul className="list-group list-group-flush border-dashed mb-0">
                            <li className="list-group-item d-flex aling-items-center">
                                <div className="flex-grow-1 ms-3" style={{ width: "50%" }}>
                                    <h6 className="fs-14 mb-1">Account Id:</h6>
                                </div>
                                <div className="flex-grow-1 ms-3" style={{ width: "30%" }}>
                                    <h6 className="fs-14 mb-1">Total Value</h6>
                                </div>
                                <div className="flex-grow-1 ms-3" style={{ width: "30%" }}>
                                    {
                                        performer === "Buyers" ?
                                            <h6 className="fs-14 mb-1">NFTs Bought:</h6>
                                            :
                                            <h6 className="fs-14 mb-1">NFTs Sold:</h6>
                                    }
                                </div>
                            </li>
                            {data.map((dataCustom, key) => (
                                <li className="list-group-item d-flex align-items-center" key={key}>
                                    <div className="flex-grow-1 ms-3" style={{ width: "40%" }}>
                                        <button data-tip data-for={dataCustom.account_id + "registerTipAccount"} className='toolTipButton fs-14 mb-1 text-center'><h6>{String(dataCustom.account_id).substring(0, 18)}</h6></button>
                                        <ReactTooltip id={dataCustom.account_id + "registerTipAccount"} place="top" effect="solid">{dataCustom.account_id}</ReactTooltip>
                                    </div>
                                    <div className="flex-grow-1 ms-3" style={{width:"30%"}}>
                                        <h6 className="fs-14 mb-1 text-center"><NearSvg size=".7em"/> {formatyocto(dataCustom.total_sum , 0)}</h6>
                                    </div>
                                    <div className="flex-grow-1 ms-3 text-center" style={{ width: "30%" }}>
                                        <h6 className="fs-14 mb-1 text-right">{dataCustom.contract_token_ids.length}</h6>
                                    </div>
                                    <div className="flex-shrink-0 text-end">
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
};

const TopWhales = ({ data , Label }) => {
    return (
        <React.Fragment>
            <Col >
                <Card>
                    <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">{Label}</h4>
                        <div className="flex-shrink-0"></div>

                    </div>
                    <CardBody>
                        <div className="table-responsive table-card">
                            <SimpleBar style={{ maxHeight: "655px" }}>
                                <table className="table table-borderless align-middle">
                                    <tbody>
                                        {data.map((item, key) => (
                                            <tr key={key}>
                                                <td>
                                                    <div className="d-flex">
                                                   
                                                        <div >
                                                            <Link to={"/profile/" + item.account_id } id={"acco" + key}>
                                                            <h6 className="fs-15 mb-1">{"#"+ (key+1) + " " +item.account_id.substring(0, 18)}</h6>
                                                                {/* <button data-tip data-for={item.account_id + "registerTipAccount"} className='toolTipButton'>{item.account_id.substring(0, 18)}</button>
                                                                <ReactTooltip id={item.account_id + "registerTipAccount"} place="top" effect="solid">{item.account_id}</ReactTooltip> */}
                                                            </Link>
                                                            <UncontrolledTooltip placement="top" target={"acco" + key} > {item.account_id}</UncontrolledTooltip>
                                                            <p className="mb-0 text-muted"><NearSvg size=".7em"/>  {formatyocto(item.total_sum)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.previews ? <div className="mt-lg-0 mt-3">
                                                        <div className="avatar-group">

                                                            {item.previews[0] ?
                                                                <Link to="#" className="avatar-group-item" id="img1">
                                                                    {item.previews[0].includes("https://") ?
                                                                        <img src={process.env.REACT_APP_IMAGES + "/image-resizing?width=48&image=" + item.previews[0]} alt="" className="rounded-circle avatar-sm" />
                                                                        : <img src={process.env.REACT_APP_IMAGES + "/image-resizing?width=48&image=" + process.env.REACT_APP_IPFS_URL2 + "/" + item.previews[0]} alt="" className="rounded-circle avatar-sm" />
                                                                    }
                                                                </Link> : ""}
                                                            {item.previews[1] ?
                                                                <Link to="#" className="avatar-group-item" id="img2">
                                                                    {item.previews[1].includes("https://") ?
                                                                        <img src={process.env.REACT_APP_IMAGES + "/image-resizing?width=48&image=" + item.previews[1]} alt="" className="rounded-circle avatar-sm" />
                                                                        : <img src={process.env.REACT_APP_IMAGES + "/image-resizing?width=48&image=" + process.env.REACT_APP_IPFS_URL2 + "/" + item.previews[1]} alt="" className="rounded-circle avatar-sm" />
                                                                    }
                                                                </Link> : ""}
                                                            {item.previews[2] ?
                                                                <Link to="#" className="avatar-group-item" id="img3">
                                                                    {item.previews[2].includes("https://") ?
                                                                        <img src={process.env.REACT_APP_IMAGES + "/image-resizing?width=48&image=" + item.previews[2]} alt="" className="rounded-circle avatar-sm" />
                                                                        : <img src={process.env.REACT_APP_IMAGES + "/image-resizing?width=48&image=" + process.env.REACT_APP_IPFS_URL2 + "/" + item.previews[2]} alt="" className="rounded-circle avatar-sm" />
                                                                    }
                                                                </Link> : ""}
                                                           {item.contract_token_ids.length > item.previews.length ?
                                                                <Link to="#" className="avatar-group-item" id="img4">
                                                                    <div className="avatar-sm">
                                                                        <div className="avatar-title rounded-circle">
                                                                            {item.contract_token_ids.length - 3}+
                                                                        </div>
                                                                    </div>
                                                                </Link> : ""}
                                                            {/* <UncontrolledTooltip placement="top" target="img4" > mORE </UncontrolledTooltip> */}
                                                        </div>
                                                    </div>:""}
                                                </td>
                                                <td className="text-end">
                                                    
                                                <h6 className="fs-15 mb-1 me-2">{item.contract_token_ids.length}</h6>
                                                        {Label==="Top Buyers" ? <p className="mb-0 text-muted text-end">NFTs Bought</p> : 
                                                        <p className="mb-0 text-muted text-end">NFTs Sold</p> }    
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                            </SimpleBar>
                        </div>
                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
};
export { TopPerformersNear, TopWhales };



