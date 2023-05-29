import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { formatyocto } from '../../helpers/lib';
import Loader from './Loader';
import { NearSvg } from './utils';

const TopPerformers = ({data}) => {
    //console.log("data", data);
    return (
        <React.Fragment>
            <Col xxl={4} lg={6}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1" style={{width: "74%"}}>Top Sales</h4>
                        <h4 className="card-title mb-0 flex-grow-1"style={{width: "26%"}}>Sold:</h4>
                    </CardHeader>
                    <CardBody className="p-0">
                    {data ? (
                        <>
                        <ul className="list-group list-group-flush border-dashed mb-0">
                            {data && data.map((item, key) => (
                                <li className="list-group-item d-flex align-items-center" key={key}>
                                    <div className="flex-shrink-0" >
                                        { !!item.token.metadata.media.includes("https://") &&
                                        <img src={process.env.REACT_APP_IMAGES + '/image-resizing?width=80&image=' + item.token.metadata.media}  className="avatar-sm rounded-circle" alt={item.token.metadata.title} />
                                        }
                                        { !item.token.metadata.media.includes("https://") &&
                                          <img src={process.env.REACT_APP_IMAGES + '/image-resizing?width=80&image=' + process.env.REACT_APP_IPFS_URL2 + '/' + item.token.metadata.media}  className="avatar-sm rounded-circle" alt={item.token.metadata.title} />
                                        }
                                    </div>
                                    <div className="flex-grow-1 ms-3" style={{width: "70%"}}>
                                        <h6 className="fs-14 mb-1">{item.token.metadata.title}</h6>
                                        <button data-tip data-for={item.token.owner_id+"ownerId"} className='toolTipButton text-right'><h6 className="mb-0">{String(item.token.owner_id).substring(0,22)}</h6></button> 
                                        <ReactTooltip id={item.token.owner_id+"ownerId"} place="top" effect="solid">owner:{item.token.owner_id}</ReactTooltip>

                                    </div>
                                    <div className="flex-grow-1 ms-3" style={{width: "30%"}}>
                                        <h6 className="fs-14 mb-1"><NearSvg size=".7em"/>  {formatyocto(item.volume , 0)}</h6>

                                    </div>
                                </li>
                            ))}
                        </ul>
                        </>
                    ) : (
                        <Loader />
                    )}

                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
};

export default  TopPerformers ;