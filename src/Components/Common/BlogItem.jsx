import PropTypes from "prop-types";
import React from 'react';
import {Link} from "react-router-dom";
import { Button } from "reactstrap";

import { Card, CardBody, CardHeader, Col, Collapse, Container, Row } from 'reactstrap';
import UiContent from './UiContent';

const BlogItem = ({ data }) => {
    return (
        <Col className="col-lg-6 col-xxl-4 mb-5">
            <Card className="mb-1 blog">
                
                    
                        <Link to={process.env.PUBLIC_URL + `/blog-details/${data.url}`} className="image"><img className="card-img-top img-fluid thumbnail" src={process.env.PUBLIC_URL + data.image} alt="blog" /></Link>
                    
                    <div className="info">
                        <ul className="meta">
                            <li><i className="far fa-calendar"></i>{data.date}</li>
                        </ul>
                        <CardBody>
                            <h3 className="title">< Link to={process.env.PUBLIC_URL + `/blog-details/${data.url}`}>{data.title}</Link></h3>
                            <Link to={process.env.PUBLIC_URL + `/blog-details/${data.url}`} className="link"><Button color="primary">Read More</Button></Link>
                        </CardBody>
                    </div>
                
            </Card>
        </Col>    
        )
}

BlogItem.propTypes = {
    data: PropTypes.object
};

export default BlogItem