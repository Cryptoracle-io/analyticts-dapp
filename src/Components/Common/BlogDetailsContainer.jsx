import PropTypes from "prop-types";
import React from 'react';
import BlogDetails from './BlogDetails.jsx';
import { Row, Card, CardBody, CardHeader, Col } from 'reactstrap';
import {Link} from "react-router-dom";
import BlogClassicData from "../../data/BlogData.json";
import BreadCrumb from "./BreadCrumb.js";

const BlogDetailsContainer = ({data}) => {
    return (
        <div className="section section-padding fix">
            <BreadCrumb title={data.title} breadcrumbItem={data.title} />
            <div className="container">
                <div className="row mb-n10">

                    <div className="col-lg-8 col-12 order-lg-1 mb-10">
                        <div className="row row-cols-1s">
                            
                            <BlogDetails data={data} />
                        </div>
                    </div>
                
                    <div className="col-lg-4 col-12 order-lg-2 mb-10">
                        <Card>
                            <CardHeader className="align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Blog Feed</h4>
                            </CardHeader>

                            <CardBody>
                                {BlogClassicData && BlogClassicData.map((item, key) => (
                                    <div className={item.id === 1 ? "d-flex mt-4" : "d-flex mt-4"} key={key}>
                                        <div className="flex-shrink-0">
                                        <Link to={item.url} className="text-reset"><img src={`${process.env.PUBLIC_URL}/${item.image}`} className="rounded img-fluid" style={{ height: "60px" }} alt={item.title}/></Link>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-1 lh-base"><Link to={item.url} className="text-reset">{item.title}</Link></h6>
                                            <p className="text-muted fs-12 mb-0">{item.date}</p>
                                        </div>
                                    </div>

                                ))}
                                <div className="mt-3 mb-2 text-center">
                                    <Link to="/blog" className="text-muted text-decoration-underline">View all News</Link>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
BlogDetailsContainer.propTypes = {
    data: PropTypes.object
};
export default BlogDetailsContainer;