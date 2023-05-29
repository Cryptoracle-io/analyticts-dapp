
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardBody, Col, Container, FormGroup, Label, DropdownItem, DropdownMenu, DropdownToggle, Input, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledTooltip, UncontrolledCollapse, UncontrolledDropdown } from "reactstrap";
import { useParams, Link } from 'react-router-dom';
import classnames from "classnames";
import FeatherIcon from "feather-icons-react";
import ReactTooltip from 'react-tooltip';
import Loader from './Loader';
import TableContainer from './TableContainer';
import BreadCrumb from "./BreadCrumb";
import { formatyocto, format, formatNumber } from '../../helpers/lib';
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import { NearSvg } from './utils';

import Nouislider from "nouislider-react";


const ExploreNow = () => {
    let { collectionId } = useParams();
    document.title = "NFTs Explorer";
    const [NFTList, setNFTList] = useState(null);
    const [selectedValue, setSelectedValue] = useState('Dropdown link');
    const [fetchedData, setFetchedData] = useState(null);
    const [lowestPrice, setLowestPrice] = useState('');
    const [highestPrice, setHighestPrice] = useState('');
    const [selectedSort, setSelectedSort] = useState({ __sort: 'lowest_price::1' });
    const [selectedType, setSelectedType] = useState({});
    const [validationError, setValidationError] = useState('');
    const loadMoreButtonRef = useRef(null);
    const [nomore, setNomore] = useState(false);
    const [skip, setSkip] = useState('');
    let observer; // Declare the observer variable here
    const buildQueryString = (params) => {
        return Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&');
    };
      
    const fetchData = async (params) => {
        const defaultParams = {
            exclude_total_burn: true,
            lookup_token: true,
            __limit: 30,
            collection_id: collectionId,
            __skip: skip,
        };
        const urlParams = buildQueryString({ ...defaultParams, ...params });
        
        const url = `${process.env.REACT_APP_API_URL}/token-series?${urlParams}`;
        
        const response = await fetch(url);
        const data = await response.json();
        if (skip === 0) {
            setFetchedData(data);
            setNFTList(data);
        } else {
            setFetchedData((prevData) => {
                if (!prevData) return data;
                return {
                    ...prevData,
                    data: {
                        ...prevData.data,
                        results: [...prevData.data.results, ...data.data.results],
                    },
                };
            });
            setNFTList((prevData) => {
                if (!prevData) return data;
                return {
                    ...prevData,
                    data: {
                        ...prevData.data,
                        results: [...prevData.data.results, ...data.data.results],
                    },
                };
            });
        }
    };
    
    const fetchDataWithFilters = () => {
        if (!fetchedData || (fetchedData && fetchedData.data.count >= skip )) {
        const params = {
            ...selectedType,
            ...selectedSort,
            __skip: skip,
        };
        
        if (lowestPrice > 0) {
            params.min_price = parseNearAmount(lowestPrice);
        }
        
        if (highestPrice > 0) {
            params.max_price = parseNearAmount(highestPrice);
        }
        
                  fetchData(params);
        } else{
            setNomore(true)
        }
     
    };
    const resetNFTListAndFetchData = () => {
        setSkip(0);
        setNFTList(null);
        fetchDataWithFilters();
    };
    

    const handleLoadMoreClick = () => {
        setSkip((prevSkip) => (Number(prevSkip) + 30));
      };

      const nftType = (e) => {
        const selectedLabel = e.target.value;
        setSelectedType(
            {
                "Dropdown link": {},
                "For Sale": { has_price: true },
                "Available for offer": { has_price: false },
                "On Auction": { is_auction: true },
            }[selectedLabel]
        );
        resetNFTListAndFetchData();
    };
    
    const sortBy = (e) => {
        const selectedLabel = e.target.value;
        setSelectedSort(
            {
                'Lowest price': { __sort: 'lowest_price::1' },
                'Highest price': { __sort: 'lowest_price::-1' },
                'Rare to common': { __sort: 'metadata.rank::1' },
                'Auction ends soon': { __sort: 'end_date::1' },
                'Recently listed': { __sort: '_id::-1' },
                'Market update': { __sort: 'updated_at::-1' },
            }[selectedLabel]
        );
        resetNFTListAndFetchData();
    };
    
    const handleInputChange = (e, type) => {
        if (type === 'lowest') {
            setLowestPrice(e.target.value);
        } else if (type === 'highest') {
            setHighestPrice(e.target.value);
        }
    };

    const handleInputBlur = () => {
        if (parseFloat(lowestPrice) > parseFloat(highestPrice)) {
            setValidationError('Highest price cannot be lower than lowest price.');
        } else {
            setValidationError('');
            fetchDataWithFilters();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };
    const setupObserver = () => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const observerCallback = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                handleLoadMoreClick();
            }
        };

        const observer = new IntersectionObserver(observerCallback, options);
        if (loadMoreButtonRef.current) {
            observer.observe(loadMoreButtonRef.current);
        }
    };

    useEffect(() => {
        setupObserver();
        return () => {
            if (loadMoreButtonRef.current) {
                observer.unobserve(loadMoreButtonRef.current);
            }
        };
    }, []);

    useEffect(() => {
        fetchDataWithFilters();
    }, [selectedSort, selectedType, skip]);
    // useEffect(() => {
    //     init();
    // }, []);

    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader className="border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">

                                </h5>
                                <div>
                                    <Link
                                        className="btn btn-primary"
                                        id="filter-collapse"
                                        data-bs-toggle="collapse"
                                        to="#collapseExample"
                                    >
                                        <i className="ri-filter-2-line align-bottom"></i>
                                        Filters
                                    </Link>
                                </div>
                            </div>

                            <UncontrolledCollapse toggler="#filter-collapse" defaultOpen>
                                <Row className="row-cols-xxl-3 row-cols-lg-3 row-cols-md-2 row-cols-1 mt-3 g-3">
                                    {/* <Col xl={4}>
                                        <h6 className="text-uppercase fs-12 mb-2">Search</h6>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search NFT..."
                                            autoComplete="off"
                                            id="searchProductList"
                                            onKeyUp={searchNFT}
                                        />
                                    </Col> */}
                                    <Col xl={3}>
                                        <h6 className="text-uppercase fs-12 mb-2">Type:</h6>
                                        <select
                                            className="form-control"
                                            data-choices
                                            name="dtype"
                                            data-choices-search-false
                                            id="dtype"
                                            onChange={(e) => nftType(e)}
                                        >
                                            <option value="Dropdown link">Show All</option>
                                            <option value="For Sale">For Sale</option>
                                            <option value="Available for offer">Available for offer</option>
                                            <option value="On Auction">On Auction</option>
                                            <option value="Fresh from creator">Fresh from creator</option>
                                        </select>
                                    </Col>
                                    <Col xl={3}>
                                        <h6 className="text-uppercase fs-12 mb-2">
                                            Sort by:
                                        </h6>
                                        <select
                                            className="form-control"
                                            data-choices
                                            name='dsort'
                                            data-choices-search-false
                                            id='dsort'
                                            onChange={(e) => sortBy(e)}
                                        >
                                            <option value="Lowest price">Lowest price</option>
                                            <option value="Highest price">Highest price</option>
                                            <option value="Rare to common">Rare to common</option>
                                            <option value="Auction ends soon">Auction ends soon</option>
                                            <option value="Recently listed">Recently listed</option>
                                            <option value="Market update">Market update</option>
                                        </select>
                                    </Col>
                                    <Col xl={6}>
                                        <FormGroup>
                                            <div className="d-flex">
                                                <h6 className="text-uppercase fs-12 mb-2 ">Price</h6>
                                                <i className="ri-error-warning-line ms-2 align-middle mb-0 fs-12" style={{ marginTop: - 2 }}></i>
                                                <p className="mb-0" style={{ marginTop: - 4 }}>Press enter to update price</p>
                                            </div>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="input-group mb-3">
                                                        <Input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="Lowest..."
                                                            id="lowestPrice"
                                                            value={lowestPrice}
                                                            onChange={(e) => handleInputChange(e, 'lowest')}
                                                            onBlur={handleInputBlur}
                                                            onKeyDown={handleKeyDown}
                                                        />
                                                        <Label className="input-group-text flex-shrink-0" for="lowestPrice">
                                                            $
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-group mb-0">
                                                        <Input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="Highest..."
                                                            id="highestPrice"
                                                            value={highestPrice}
                                                            onChange={(e) => handleInputChange(e, 'highest')}
                                                            onBlur={handleInputBlur}
                                                            onKeyDown={handleKeyDown}
                                                        />
                                                        <Label className="input-group-text flex-shrink-0" for="highestPrice">
                                                            $
                                                        </Label>
                                                    </div>
                                                </Col>

                                            </Row>
                                            {validationError && <div className="text-danger mt-2">{validationError}</div>}
                                        </FormGroup>
                                    </Col>

                                </Row>
                            </UncontrolledCollapse>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
            <Row>
                {NFTList && NFTList.data.results.map((item, key) => (
                    <Col xxl={3} lg={4} md={6} className="product-item upto-15" key={key}>
                        <Card className="explore-box card-animate">
                            <div className="position-relative rounded overflow-hidden explore-place-bid-img">
                                {/* <img src={item.metadata.media} alt="" className="card-img-top explore-img" /> */}
                                { !!item.metadata.media.includes("https://") &&
                                        <img src={process.env.REACT_APP_IMAGES + '/image-resizing?width=399&image=' + item.metadata.media} alt="" key={key} className="card-img-top explore-img" />
                                        }
                                        { !item.metadata.media.includes("https://") &&
                                          <img src={process.env.REACT_APP_IMAGES + '/image-resizing?width=399&image=' + process.env.REACT_APP_IPFS_URL2 + '/' + item.metadata.media} alt="" className="card-img-top explore-img" />
                                        }
                                {/* <div className="discount-time">
                                                <Countdown date={item.date} renderer={renderer} />
                                            </div> */}
                                <div className="bg-overlay">
                                    <div className="place-bid-btn">
                                        <a href="" target="_blank" rel="noreferrer noopener" className="btn btn-primary">Coming soon
                                        </a>
                                    </div></div>
                            </div>
                            <CardBody>
                                <p className="fw-medium mb-0 float-end"><i className="mdi mdi-asterisk text-danger align-middle"></i>Rank:{formatNumber(item.metadata.rank,0)}</p>
                                {item.has_price ? <h5 className="text-primary"><NearSvg size=".8em"/> { formatyocto(item.lowest_price,1)}</h5>
                                : <h6 className="text-primary mt-1 ">Place an offer </h6> }
                                <h6 className="fs-15 mb-3"><Link to="" className="link-dark">{item.metadata.title}</Link></h6>
                                <div>
                                                {/* <span className="text-muted float-end">Available: {item.available}</span> */}
                                                {item.token && item.token.owner_id ? <span className="text-muted me-4">owner: <Link to={"/profile/" + item.token?.owner_id} className="link-dark">{item.token?.owner_id.slice(0,18)}</Link></span> : ""}
                                                {/* <div className="progress progress-sm mt-2">
                                                    <div className={"progress-bar progress-bar-striped bg-" + item.progressClass} role="progressbar" style={{ width: item.size }} aria-valuenow="67" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div> */}
                                            </div>
                            </CardBody>
                        </Card>
                    </Col>))}
            </Row>

            {nomore ? <div
                className="py-4 text-center"
                id="noresult"
                style={{ display: "none" }}
            >
                <lord-icon
                    src="https://cdn.lordicon.com/msoeawqm.json"
                    trigger="loop"
                    colors="primary:#405189,secondary:#0ab39c"
                    style={{ width: "72px", height: "72px" }}
                ></lord-icon>
                <h5 className="mt-4">Sorry! No Result Found</h5>
            </div>:
            <div className="text-center mb-3">
                <button
                    className="btn btn-link text-success mt-2"
                    id="loadmore"
                    ref={loadMoreButtonRef}
                >
                    <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                    Load More
                </button>
            </div>}
        </React.Fragment>
    );
};

const LastSales = ({ dataa, Title, icon, name }) => {
    let { collectionId } = useParams();
    const [ready, setReady] = useState(false);
    const [data, setData] = useState(null);
    const [tableData, setTableData] = useState(null);
    const init = async () => {
        let requestCollectionActivities = await fetch(process.env.REACT_APP_API_URL + '/collection-activities?collection_id=' + collectionId + '&filter=sale&__skip=0&__limit=10&__sort=des_issued_at');
        let resultCollectionActivities = await requestCollectionActivities.json();
        let colsTableData = [];
        for (let collection2 of resultCollectionActivities.data) {

            let metadataTitle = collection2.data.map((metad) => metad.metadata.title);
            let metadataImage = collection2.data.map((metad) => metad.metadata.media);

            let opDate = collection2.msg.datetime;
            let opTitle = metadataTitle;
            let opImage = String(metadataImage);
            let isHttp = opImage.includes("://");
            let opFrom = collection2.from;
            let opOwner = collection2.to;
            let opSale = String(formatyocto(collection2.price));
            let opStatus = collection2.type;
            let ipfspic
            if (isHttp > 0) {
                ipfspic = process.env.REACT_APP_IMAGES + '/image-resizing?width=72&image=' + opImage
            } else {
                ipfspic = process.env.REACT_APP_IMAGES + '/image-resizing?width=72&image=' + process.env.REACT_APP_IPFS_URL2 + "/" + opImage
            }

            colsTableData.push(
                {
                    title:
                        <>
                            <div className="d-flex align-items-center">
                                <img alt="" className="avatar-md rounded" src={ipfspic} />

                                <div className="ms-3">
                                    <p className="mb-0 text">{opTitle}</p>
                                </div>
                            </div>
                        </>,
                    from:
                        <>
                            <>
                                <button data-tip data-for={opDate + "registerTipFrom"} className='toolTipButton'><h6>{String(opFrom).substring(0, 16)}</h6></button>
                                <ReactTooltip id={opDate + "registerTipFrom"} place="top" effect="solid">{opFrom}</ReactTooltip>
                            </>
                        </>,
                    owner:
                        <>
                            <>
                                <button data-tip data-for={opDate + "registerTipOwner"} className='toolTipButton'><h6>{String(opOwner).substring(0, 16)}</h6></button>
                                <ReactTooltip id={opDate + "registerTipOwner"} place="top" effect="solid"><h6>{opOwner}</h6></ReactTooltip>
                            </>
                        </>
                    ,
                    date: String(opDate).substring(0, 10),
                    price: <><NearSvg/> {opSale}</>,
                    operation: opStatus
                }

            );
        }
        let colsTableDataComplete = await Promise.all(colsTableData);
        setReady(true);
        setTableData(colsTableDataComplete);
    }
    useEffect(() => {
        init();
    }, []);
    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
                filterable: false,
            }, {
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
            }, {
                Header: "Operation",
                accessor: "operation",
                filterable: false,
            }
        ],
        []);
    //console.log("DATA", data);
    if (!tableData) {
        return <div className="page-content">
            <Container fluid={true}>
                <Loader />
            </Container>
        </div>
    }

    return (
        <React.Fragment>
            <Col md={12} className="w-100">
                <CardBody className="w-100">
                    {!!tableData &&
                        <TableContainer
                            columns={columns}
                            data={(tableData || [])}
                            isGlobalFilter={false}

                            customPageSize={10}
                            className="custom-header-css w-100"
                            divClass="table-responsive table-card mb-1"
                            tableClass="align-middle table-nowrap"
                            theadClass="table-light text-muted"
                            isNFTRankingFilter={false}
                        />
                    }
                    {!tableData &&
                        <Loader />
                    }
                </CardBody>
            </Col>

        </React.Fragment>
    );
}

const Cards = ({ data, Title, icon, name, cols, nearicon=false}) => {


    return (
        <React.Fragment>
            <Col md={cols}>
                <Card className={"card-animate"}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className="text-muted text-uppercase fs-13">{Title}</h5>
                                <h2 className="mt-4 ff-secondary fw-semibold ">
                                    {nearicon && <NearSvg size=".8em"/> } {data}
                                </h2>
                            </div>
                            <div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title rounded-circle fs-2 bg-soft-primary">
                                        <FeatherIcon
                                            icon={icon}
                                            className={name}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
}
const Tabs = ({ data, Title, icon, name }) => {
    const [navBadgeTab, setnavBadgeTab] = useState("1");
    const navBadgeToggle = (tab) => {
        if (navBadgeTab !== tab) {
            setnavBadgeTab(tab);
        }
    };

    return (
        <React.Fragment>
            <Col >
                <Card>
                    <CardBody>
                        {/* <p className="text-muted">Example of nav tabs with badge wrapped in nav item.</p> */}

                        <Nav tabs className="nav-tabs nav-justified mb-3">
                            <NavItem>
                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: navBadgeTab === "1", })} onClick={() => { navBadgeToggle("1"); }} >
                                    Explore <i className=" bx bx-image"></i>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: navBadgeTab === "2", })} onClick={() => { navBadgeToggle("2"); }} >
                                    Last Sales  <i className="bx bx-spreadsheet"></i>  {/* Last Sales <span className="badge bg-success">Done</span> */}
                                </NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: navBadgeTab === "3", })} onClick={() => { navBadgeToggle("3"); }} >
                                    Messages <span className="badge bg-danger rounded-circle">5</span>
                                </NavLink>
                            </NavItem> */}
                        </Nav>

                        <TabContent activeTab={navBadgeTab} className="text-muted">
                            <TabPane tabId="1" id="nav-badge-home">
                                <ExploreNow />
                            </TabPane>

                            <TabPane tabId="2" id="nav-badge-profile">
                                <LastSales className="w-100" />
                            </TabPane>

                            <TabPane tabId="3" id="nav-badge-messages" >
                                <div className="d-flex">
                                    <div className="flex-shrink-0">
                                        <i className="ri-checkbox-circle-fill text-success"></i>
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your own style choices.
                                    </div>
                                </div>
                                <div className="d-flex mt-2">
                                    <div className="flex-shrink-0">
                                        <i className="ri-checkbox-circle-fill text-success"></i>
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
}
export { Cards, Tabs };