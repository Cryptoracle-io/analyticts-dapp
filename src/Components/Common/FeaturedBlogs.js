import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

import BlogClassicData from "../../data/BlogData.json";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

import { Link } from 'react-router-dom';
const FeaturedBlogs = () => {
    return (
        <React.Fragment>
            
                <Col className="col-lg-12 borer-0">
                    <div className="d-flex pt-2 mb-n4">
                        <h2 className="card-title fs-24 mb-0 text-warning"><i className="mdi  mdi-brain align-bottom"></i> Learn</h2>
                    </div>
                    <Swiper modules={[Navigation, Autoplay]}
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
                        }}
                        loop={true}
                        autoplay={{ delay: 13500, disableOnInteraction: false }}
                        className="mySwiper marketplace-swiper rounded gallery-light pt-5 border-0">
                        <div className="swiper-wrapper">
                            {BlogClassicData.map((item, key) => (
                                <SwiperSlide key={key}>
                                    <div className="card explore-box card-animate rounded">
                                        <div className="bookmark-icon position-absolute top-0 end-0 p-2">
                                            <button type="button" className="btn btn-icon active" data-bs-toggle="button" aria-pressed="true"><i className="mdi fs-16"></i></button>
                                        </div>
                                        <div className="explore-place-bid-img">
                                            
                                            
                                                <Link to={process.env.PUBLIC_URL + `/blog-details/${item.url}`} className="image"><img src={process.env.PUBLIC_URL + item.image} alt={process.env.PUBLIC_URL + `/blog-details/${item.url}`} className="img-fluid card-img-top explore-img" /></Link>
                                            
                                        </div>
                                        <CardBody>
                                            
                                            <h5 className="mb-1"><Link to={process.env.PUBLIC_URL + `/blog-details/${item.url}`} className="link-dark">{item.title}</Link></h5>
                                            <p className="text-muted mb-0">{(item.excerpt).slice(0,45)}...</p>
                                        </CardBody>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </Swiper>
                </Col>
            
        </React.Fragment>
    );
};
export default FeaturedBlogs;