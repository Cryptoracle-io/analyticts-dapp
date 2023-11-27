
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


const ExploreNow = (items = 31) => {
    let { userId } = useParams();
    document.title = "NFTs Explorer";
    const [NFTList, setNFTList] = useState(null);
    const [selectedValue, setSelectedValue] = useState('Dropdown link');
    const [fetchedData, setFetchedData] = useState(null);
    const [selectedSort, setSelectedSort] = useState({ __sort: 'lowest_price::1' });
    const [selectedType, setSelectedType] = useState({});
    const [validationError, setValidationError] = useState('');
    const [skip, setSkip] = useState('');
    const loadMoreButtonRef = useRef(null);
    const [nomore, setNomore] = useState(false);
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
            owner_id: userId,
            __skip: skip,
        };
        const urlParams = buildQueryString({ ...defaultParams, ...params });
        const url = `${process.env.REACT_APP_API_URL}/token?${urlParams}`;

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
      
          fetchData(params);
        } else{
            setNomore(true)
        }
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
            }[selectedLabel]
        );

    };

    const sortBy = (e) => {
        const selectedLabel = e.target.value;
        setSelectedSort(
            {
                'Lowest price': { __sort: 'lowest_price::1' },
                'Highest price': { __sort: 'lowest_price::-1' },
                'Rare to common': { __sort: 'metadata.rank::1' },
                'Market update': { __sort: 'updated_at::-1' },
            }[selectedLabel]
        );

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

                <Col lg={12} >
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
                                            <option value="Market update">Market update</option>
                                        </select>
                                    </Col>


                                </Row>
                            </UncontrolledCollapse>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
            <Row className="g-1">

                {NFTList && NFTList.data.results.map((item, key) => (
                    <Col xxl={3} lg={4} md={6} className="product-item upto-15" key={key}>
                        <Card className="explore-box card-animate">
                            <div className="position-relative rounded overflow-hidden explore-place-bid-img">
                                {/* <img src={item.metadata.media} alt="" className="card-img-top explore-img" /> */}
                                {!!item.metadata.media.includes("https://") &&
                                    <img src={process.env.REACT_APP_IMAGES + '/image-resizing?width=300&image=' + item.metadata.media} alt="" key={key} className="card-img-top explore-img" style={{ maxWidth: '399px', maxHeight: '399px' }} />
                                }
                                {!item.metadata.media.includes("https://") &&
                                    <img src={process.env.REACT_APP_IMAGES + '/image-resizing?width=300&image=' + process.env.REACT_APP_IPFS_URL2 + '/' + item.metadata.media} alt="" className="card-img-top explore-img" style={{ maxWidth: '399px', maxHeight: '399px' }} />
                                }

                                <div className="bg-overlay">
                                    <div className="place-bid-btn">
                                        <a href="" target="_blank" rel="noreferrer noopener" className="btn btn-primary">Coming soon
                                        </a>
                                    </div></div>
                            </div>
                            <CardBody>
                                <p className="fw-medium mb-0 float-end"><i className="mdi mdi-asterisk text-danger align-middle"></i>Score:{formatNumber(item.metadata.score)} Rank:{formatNumber(item.metadata.rank, 0)}</p>
                                { item.price > 0 ? <h5 className="text-primary"><NearSvg size=".7em"/> {formatyocto(item.price, 1)}</h5>
                                    : <h6 className="text-primary mt-1 ">Place an offer </h6>}
                                <h6 className="fs-15 mb-3"><Link to="" className="link-dark">{item.metadata.title}</Link></h6>
                               
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

const Tabs = ({ data, Title, icon, name, items }) => {
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
                                    Explore NFTs  <i className=" bx bx-image"></i>
                                </NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: navBadgeTab === "2", })} onClick={() => { navBadgeToggle("2"); }} >
                                    Last Sales
                                </NavLink>
                            </NavItem> */}
                            {/* <NavItem>
                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: navBadgeTab === "3", })} onClick={() => { navBadgeToggle("3"); }} >
                                    Messages <span className="badge bg-danger rounded-circle">5</span>
                                </NavLink>
                            </NavItem> */}
                        </Nav>

                        <TabContent activeTab={navBadgeTab} className="text-muted">
                            <TabPane tabId="1" id="nav-badge-home">
                                <ExploreNow items={items} />
                            </TabPane>

                            <TabPane tabId="2" id="nav-badge-profile">

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
export { Tabs };