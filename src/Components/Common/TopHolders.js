import React, { useState , useParams } from 'react';
import { useMemo, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const TopHolders = ({ data, performer }) => {
    const [topHoldersData, settopHoldersData] = useState(null);
    
    const init = async () => {
        const requestTopHolders = await fetch(
            process.env.REACT_APP_API_URL + '/collection-holders?' + data
        );
        const resultsetTopHolders = await requestTopHolders.json();
        settopHoldersData(resultsetTopHolders.slice(0, 10));
    };

    useEffect(() => {
        init();
    }, []);
    return (
        <React.Fragment>
            <Card >
                <CardHeader className="align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Top Holders</h4>
                </CardHeader>
                <CardBody className="p-0">
                    {topHoldersData ? (
                        <>
                            <ul className="list-group list-group-flush border-dashed mb-0">
                                <li className="list-group-item d-flex aling-items-center">
                                    <div className="flex-grow-1 ms-3" style={{ width: "60%" }}>
                                        <h6 className="fs-14 mb-1">Account Id:</h6>
                                    </div>
                                    <div className="flex-grow-1 ms-3" style={{ width: "25%" }}>
                                        <h6 className="fs-14 mb-1 text-center">Total NFTs</h6>
                                    </div>
                                    <div className="flex-grow-1 ms-3" style={{ width: "15%" }}>
                                        <h6 className="fs-14 mb-1 text-center">%</h6>
                                    </div>
                                    {/* <div className="flex-grow-1 ms-3" style={{width:"30%"}}>
                                        <h6 className="fs-14 mb-1">Staked:</h6>
                                    </div> */}
                                </li>
                                {topHoldersData && topHoldersData.map((dataCustom, key) => (
                                    <li className="list-group-item d-flex align-items-center" key={key}>
                                        <div className="flex-grow-1 ms-2" style={{ width: "60%"}}>
                                            {/* { (String(dataCustom.owner).includes("stak")) ? 
                                            <button data-tip data-for={dataCustom.owner + "registerTipAccount"} className='toolTipButton fs-12 mb-1 text-center text-info'><h6 className=' text-warning opacity-10'>{String(dataCustom.owner).substring(0, 22)}</h6></button>
                                            : <button data-tip data-for={dataCustom.owner + "registerTipAccount"} className='toolTipButton fs-12 mb-1 text-center'><h6>{String(dataCustom.owner).substring(0, 22)}</h6></button>
                                            } */}
                                            {(String(dataCustom.owner).includes("stak")) ?
                                                <Link to={'/profile/' + dataCustom.owner} data-tip data-for={dataCustom.owner + "registerTipAccount"} >
                                                    <h6 className='text-warning opacity-10 toolTipButton fs-12 mb-1 text-info ms-2'>{String(dataCustom.owner).substring(0, 24)}</h6>
                                                </Link>
                                                :
                                                <Link to={'/profile/' + dataCustom.owner} data-tip data-for={dataCustom.owner + "registerTipAccount"} >
                                                    <h6 className='fs-12 mb-1 ms-2'>{String(dataCustom.owner).substring(0, 24)}</h6>
                                                </Link>
                                            }
                                            <ReactTooltip id={dataCustom.account_id + "registerTipAccount"} place="top" effect="solid">{dataCustom.owner}</ReactTooltip>
                                        </div>
                                        <div className="flex-grow-1 me-2" style={{ width: "25%" }}>
                                        {(dataCustom.count >= dataCustom.staked) ?

                                            <h6 className="fs-14 mb-1 text-end">{dataCustom.count}</h6>
                                            :<h6 className="fs-14 mb-1 text-end">{dataCustom.staked}</h6>
                                        }
                    
                                        </div>
                                        <div className="flex-grow-1 ms-3" style={{ width: "15%" }}>
                                            <h6 className="fs-14 mb-1 text-end"><span className="badge bg-soft-primary text-primary mb-0 me-1">  {(dataCustom.count >= dataCustom.staked) ? ((dataCustom.count * 100)/performer).toFixed(2) + "%" : ((dataCustom.staked * 100)/performer).toFixed(2) + "%"}</span></h6>
                    
                                        </div>
                                        {/* <div className="flex-grow-1 ms-3 text-center" style={{width:"30%"}}>
                                        <h6 className="fs-14 mb-1 text-right">{dataCustom.staked}</h6>
                                    </div> */}
                                        
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <Loader />
                    )}

                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default TopHolders;