import { useMemo, useEffect, useState } from 'react';
import { Container,  Card, CardBody, Col, Row, CardHeader } from 'reactstrap';
import { useParams , Link } from 'react-router-dom';
import BreadCrumb from  "../Components/Common/BreadCrumb";
import { Chart } from "../Components/Common/Chart";
import ReactTooltip from 'react-tooltip';
import { formatyocto , format } from '../helpers/lib';
import parasicon from '../assets/images/near/paras.png';
import Loader from '../Components/Common/Loader';
import {Cards , Tabs } from '../Components/Common/CollectionProfileItems';
import {featuredCollections} from "../data/FeaturedPartners"
export default function CollectionProfile(props){
    document.title = "Collection";

    window.onscroll = function () {
        scrollFunction();
    };

    let { collectionId } = useParams();
    const [data, setData] = useState(null);
    const [historic, setHistoric] = useState(null);
    const [ready, setReady] = useState(false);
    const [volume, setVolume] = useState(null);
    const [dateSale, setDateSale] = useState(null);
    const [onSaleData, setOnSaleData] = useState(null);
    const [featured, setFeatured] = useState(null);
  
    
    const [displayCategory, setCategory] = useState("All");
    const init = async () => {
        
        const requestCollectionsId = await fetch(process.env.REACT_APP_API_URL + '/collections?collection_id=' + collectionId);
        const resultCollectionsId = await requestCollectionsId.json();
        const requestCollectionDailyId = await fetch(process.env.REACT_APP_API_URL + '/collection-daily?collection_id=' + collectionId);
        const resultCollectionDailyId = await requestCollectionDailyId.json();


        let colsVolume = [];
        let colsDate = [];
        const stringExists = featuredCollections.some(item => item.collectionID === collectionId);
        setFeatured(stringExists);
        for(let collection of resultCollectionDailyId.data.volume_daily.slice(15,29)){
        
            let opSale = String(formatyocto(collection.volume,0));
            let opDate = String(collection.date).substring(5,10);
            
            colsVolume.push(opSale);
            colsDate.push(opDate);

        }
        let colsVolumeComplete = await Promise.all(colsVolume);
        let colsDateComplete = await Promise.all(colsDate);


        setReady(true);
        setVolume(colsVolumeComplete);
        setDateSale(colsDateComplete);
        setHistoric(resultCollectionDailyId);
        setData(resultCollectionsId.data.results[0]);

    };

    useEffect(() => {
        init();
    }, []);

    const columns = useMemo(
        () => [
            {                
                Header: "Title",
                accessor: "title",
                filterable: false,
            },{                
                Header: "Price",
                accessor: "price",
                filterable: false,
            }, 
            {                
                Header: "From",
                accessor: "from",
                filterable: false,
            },
            {                
                Header: "Owner",
                accessor: "owner",
                filterable: false,
            },
            {                
                Header: "Date",
                accessor: "date",
                filterable: false,
            },                       {                
                Header: "Operation",
                accessor: "operation",
                filterable: false,
            }
        ],
    []);

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    };

    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
    //console.log("DATA", data);
    if(!data) {
        return <div className="page-content">
            <Container fluid={true}>
                <Loader />
            </Container>
        </div>
    }

    return ((<div className="page-content">
            <Container fluid={true}>                
                <BreadCrumb title="Collection Profile" breadcrumbItem="Collection Profile" />                
                <Row>
                    <Col md={3}>
                        <Card className={"card-animate"}>
                            <CardHeader className="border-0 align-items-center d-flex">
                            {featured ? <h2 className="card-title mb-0 flex-grow-1 fs-2 text-primary">{data.collection}</h2>
                            : <h2 className="card-title mb-0 flex-grow-1 fs-2">{data.collection}</h2>}
                            </CardHeader>
                            <CardBody>

                                <Card className="ribbon-box border shadow-none right">
                                {featured ? 
                                <div className="ribbon-two ribbon-two-primary"><span><i className="mdi  mdi-star-outline align-bottom"></i> Featured</span></div> : ""}                            
                                <img alt="" src={ process.env.REACT_APP_IMAGES + '/image-resizing?width=499&image=' + process.env.REACT_APP_IPFS_URL2 + '/' + data.media} style={{maxWidth: '100%'}} className="rounded" />                                
                                </Card>
                                <div className="d-flex flex-wrap gap-2 mt-4 text-center">
                                {( data.socialMedia ) ? <>
                                    {(data.socialMedia.discord && data.socialMedia.discord !== "" && data.socialMedia.discord != null) ?  
                                        <div>
                                            <a href={data.socialMedia.discord.includes("htt") ? `${data.socialMedia.discord}` : `https://discord.gg/${data.socialMedia.discord}`} className="avatar-xs d-block" target="_blank" rel="noreferrer noopener">       
                                                <span
                                                    className="avatar-title rounded-circle fs-16 bg-soft-dark text-dark text-center text-light">
                                                    <i className="ri-discord-fill"></i>
                                                </span>
                                            </a>
                                        </div> : <></> }

                                    {( data.socialMedia.twitter && data.socialMedia.twitter !== "" && data.socialMedia.twitter != null) ?
                                    <div>
                                        <a href={data.socialMedia.twitter.includes("htt") ? `${data.socialMedia.twitter}` : `https://twitter.com/${data.socialMedia.twitter}` } className="avatar-xs d-block" target="_blank" rel="noreferrer noopener">
                                            <span
                                                className="avatar-title rounded-circle fs-16 bg-soft-dark text-dark text-light">
                                                <i className="ri-twitter-fill"></i>
                                            </span>
                                        </a>
                                    </div>: ""}
                                    {( data.socialMedia.website && data.socialMedia.website != null && data.socialMedia.website !== "") ?
                                    <div>
                                        <a href={ data.socialMedia.website.includes("htt") ? `${data.socialMedia.website}` : `https://${data.socialMedia.website}` } className="avatar-xs d-block" target="_blank" rel="noreferrer noopener">
                                            <span
                                                className="avatar-title rounded-circle fs-16 bg-soft-dark text-dark text-light">
                                                <i className="ri-global-fill"></i>
                                            </span>
                                        </a>
                                    </div>: ""}
                                    </> : ""
                                }                                    
                                    <div>
                                        <a href={ `https://paras.id/collection/${data.collection_id}`} className="avatar-xs d-block" target="_blank" rel="noreferrer noopener">
                                            <span
                                                className="avatar-title rounded-circle fs-16 bg-soft-dark text-dark text-light">
                                                <img src={parasicon} alt="paras" className="rounded-circle avatar-xxs" />
                                            </span>
                                        </a>
                                    </div>
                                </div>                        
                                <div className="mt-4">
                                    {data.description}
                                </div>
                            </CardBody>
                        </Card>
                        <Card className={"card-animate"}>
                            <CardHeader className="border-0 align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Sales volume :</h4>                          
                            </CardHeader>
                            <CardBody>
                                {historic && !!historic &&                               
                                    <Chart dataColors='["#2a81b3"]' datasale={volume} datadate={dateSale} />
                                }
                            </CardBody>
                        </Card>
                        
                        
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Cards data={format(formatyocto(data.volume) * 1)} Title="Total volume" icon={"trending-up"} name={"text-success"} nearicon={true}/>
                            <Cards data={formatyocto(data.floor_price ) } Title="Floor price" icon={"activity"} name={"text-primary"} nearicon={true} />
                            <Cards data={formatyocto(data.avg_price ) } Title="Avg price" icon={"bar-chart-2"} name={"text-primary"} nearicon={true}/>
                        </Row>
                        <Row>
                            <Cards data={data.total_sales} Title="Total sales" icon={"arrow-up"} name={"text-primary"}/>   
                            <Cards data={data.total_owners} Title="Total owners" icon={"users"} name={"text-primary"}/>                        
                            <Cards data={data.total_cards} Title="Total cards" icon={"layers"} name={"text-primary"}/>
                        </Row>
                            <Tabs/>
                    </Col>                    
                </Row>               
            </Container>
            <button onClick={() => toTop()} className="btn btn-primary btn-icon landing-back-top" id="back-to-top">
                    <i className="ri-arrow-up-line"></i>
                </button>
        </div>
        ));
}