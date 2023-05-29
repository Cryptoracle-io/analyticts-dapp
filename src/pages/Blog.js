import React, { useEffect, useState } from "react";
import BlogClassicData from "../data/BlogData.json";
import BlogItem from "../Components/Common/BlogItem";
import BreadCrumb from "../Components/Common/BreadCrumb";
import Loader from './../Components/Common/Loader';
import { Card, CardBody, CardHeader, Col, Collapse, Container, Row } from 'reactstrap';
import UiContent from '../Components/Common/UiContent';
const Blog = () => {

  const [ blogData, setBlogData] =  useState([]);

  useEffect(() => {
    setBlogData(BlogClassicData);
  }, [])

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Blog" breadcrumbItem="Blog" />
          <Row >
            
              {!blogData.length && <div className="row row-cols-lg-1 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n6">
                <Loader />
              </div>}

              {blogData &&
                blogData.map((single, key) => {
                  return (
                      <BlogItem data={single} key={key} />
                  );
                })}

            
          </Row>
        </Container>
      </div>
    </React.Fragment>
)};

export default Blog;
