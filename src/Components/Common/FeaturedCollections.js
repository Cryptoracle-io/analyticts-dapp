import React,{ useMemo, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";

import {featuredCollections } from "../../data/FeaturedPartners";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { formatyocto , format } from '../../helpers/lib';
import { NearSvg } from './utils';


const FeaturedCollections = () => {
    const [data, setData] = useState(null);
    const init = async () => {
        let colsActivities = [];
        
        for(let collectionActivities of featuredCollections){
            if(collectionActivities.collectionID !== "partner"){
                let op = await fetch(process.env.REACT_APP_API_URL + '/collections?collection_id=' + collectionActivities.collectionID + '&__lookup_collection_volumes=true') ;
                const resultActivities = await op.json();
                colsActivities.push(resultActivities.data.results[0]);
            }else{
                colsActivities.push("0");
            }
        }
        
        let colDetails = await  Promise.all(colsActivities);

        for (let i = 0; i < featuredCollections.length; i++) {
            // Edit the properties of the current object in the array
            //console.log(featuredCollections[i].collectionID, colDetails[i].collection,"num " + i );
            if(featuredCollections[i].collectionID !== "partner"){
                
                featuredCollections[i].title = colDetails[i].collection;
                featuredCollections[i].collection_id = colDetails[i].collection_id;
                if (colDetails[i].media.includes("https://")){
                    featuredCollections[i].img = process.env.REACT_APP_IMAGES + '/image-resizing?width=499&image=' + colDetails[i].media;
                } else {
                    featuredCollections[i].img = process.env.REACT_APP_IMAGES + '/image-resizing?width=499&image=' + process.env.REACT_APP_IPFS_URL2 + '/' + colDetails[i].media;
                }
                featuredCollections[i].real = true;
            
                featuredCollections[i].description = colDetails[i].description;
            
                // Add a new property to the current object
                featuredCollections[i].price = formatyocto(colDetails[i].floor_price,0);
                featuredCollections[i].volume = formatyocto(colDetails[i].volume,0);
            }
        }
        setData(featuredCollections);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <React.Fragment>
            {data &&
            <Col className="col-lg-12 borer-0">
                <div className="d-flex pt-2 mb-n4">
                    <h1 className="card-title fs-24 mb-0 text-primary"><i className="mdi  mdi-star-outline align-bottom"></i> Featured collections & partners</h1>
                </div>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1900: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    loop={true}
                    autoplay={{ delay: 9500, disableOnInteraction: false }}
                    className="mySwiper marketplace-swiper rounded gallery-light pt-5"
                >
                    <div className="swiper-wrapper">
                        {featuredCollections.map((item, key) => (
                            
                            <SwiperSlide key={key}>
                            { item.collectionID !=="partner"  ?
                                <Link to={'/collections/' + item.collection_id}>
                                <div className="card explore-box card-animate rounded">
                                <div className="explore-place-bid-img">
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="card-img-top explore-img"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                                                                
                                                                                <div className="bg-overlay"></div>
                                    <div className="place-bid-btn">
                                        <a
                                            href={'/collections/' + item.collection_id}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="btn btn-primary"
                                        >
                                            <i className="ri-funds-line align-bottom me-1"></i>Level up
                                        </a>
                                    </div>
                                </div>

                                <CardBody>

                                    <h4 className="mb-1"><Link to={'/collections/' + item.collection_id} className="link-dark">{item.title}</Link></h4>
                                    <p className="text-muted mt-2">{(item.description.slice(0,90)) + "..."}</p>
                                    <div className="d-flex align-items-center">
                                        <Col>
                                        <h5 className="flex-shrink-0 fs-14  mb-1 text-muted">Volume:</h5>
                                        <h5 className="fw-medium text-primary ms-2"><NearSvg size=".8em"/> {item.volume}</h5>
                                        </Col>
                                        <Col >
                                        <h5 className="flex-shrink-0 fs-14  mb-1 text-muted">Flor price:</h5>
                                        <h5  className="fw-medium text-primary ms-2"><NearSvg size=".8em"/> {item.price}</h5>
                                        </Col>
                                    </div>
                                </CardBody>

                            </div>
                            </Link>
                            :
                                <div className="card explore-box card-animate rounded">
                                    <div className="explore-place-bid-img">
                                        <img
                                            src={item.img}
                                            alt=""
                                            className="card-img-top explore-img"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                }}
                                            />

                                            <div className="bg-overlay"></div>
                                            <div className="place-bid-btn">
                                                <a
                                                    href={`https://${item.web}`}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="btn btn-primary"
                                            >
                                                <i className="ri-funds-line align-bottom me-1"></i>
                                                connect
                                            </a>
                                        </div>
                                        </div>
                                        <CardBody>

                                            <h4 className="mb-1">{item.title}</h4>
                                            <p className="text-muted mt-2">{(item.description.slice(0, 90)) + "..."}</p>
                                            <div className="d-flex align-items-center">
                                                <Col>
                                                
                                                    <h5 className="flex-shrink-0 fs-14  mb-1 text-muted">Twitter:</h5>
                                                  
                                   
                                                    <a href={`https://twitter.com/${item.twitter}`} target="_blank" rel="noreferrer noopener" >
                                                        <h5 className="fw-medium text-primary ms-2"> @{item.twitter}</h5>
                                                    </a>
                                                </Col>
                                                <Col >
                                                    <h5 className="flex-shrink-0 fs-14  mb-1 text-muted">Web:</h5>
                                                    <a href={`https://${item.web}`} target="_blank" rel="noreferrer noopener" >
                                                        <h5 className="fw-medium text-primary ms-2"> {item.web}</h5>
                                                    </a>
                                                </Col>
                                            </div>
                                        </CardBody>

                                    </div>
                                 
                                }
                            </SwiperSlide>
                            
                        ))}
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </Swiper>
            </Col>}

        </React.Fragment>
    );
};
export default FeaturedCollections;