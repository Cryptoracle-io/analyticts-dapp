import React, { useMemo, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import { featuredNFTData, featuredCollections } from "../data/FeaturedPartners"
import Countdown from "react-countdown";
import BreadCrumb from "../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { formatyocto, format } from '../helpers/lib';
import { NearSvg } from '../Components/Common/utils';

const FeaturedCollectionsMain = () => {

  const [data, setData] = useState(null);
  const init = async () => {
    let colsActivities = [];

    for (let collectionActivities of featuredCollections) {
      let op = await fetch(process.env.REACT_APP_API_URL + '/collections?collection_id=' + collectionActivities.collectionID + '&__lookup_collection_volumes=true');
      const resultActivities = await op.json();
      colsActivities.push(resultActivities.data.results[0]);
    }

    let colDetails = await Promise.all(colsActivities);

    for (let i = 0; i < featuredCollections.length; i++) {
      // Edit the properties of the current object in the array
      featuredNFTData[i].title = colDetails[i].collection;
      featuredNFTData[i].collection_id = colDetails[i].collection_id;
      if (colDetails[i].media.includes("https://")) {
        featuredNFTData[i].img = process.env.REACT_APP_IMAGES + '/image-resizing?width=499&image=' + colDetails[i].media;
      } else {
        featuredNFTData[i].img = process.env.REACT_APP_IMAGES + '/image-resizing?width=499&image=' + process.env.REACT_APP_IPFS_URL2 + '/' + colDetails[i].media;
      }
      featuredNFTData[i].real = true;

      featuredNFTData[i].description = colDetails[i].description;

      // Add a new property to the current object
      featuredNFTData[i].price = formatyocto(colDetails[i].floor_price, 0);
      featuredNFTData[i].volume = formatyocto(colDetails[i].volume, 0);
    }
    setData(featuredNFTData);
  }

  useEffect(() => {
    init();
  }, []);
//mdi-chat-plus-outline
const cardHeight = {
  height: '100%',
};

return (
  <div className="page-content">
    <Container fluid>
      <BreadCrumb title="Featured Collections" />
      <Row>
        <Col xxl={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-lg-flex align-items-center">
                <div className="flex-grow-1 ">
                  <h1 className="text-center  ">Featured NFT Collections</h1>
                </div>
              </div>
            </CardHeader>
          </Card>
          <h4 className="text-center p-4">
            A curated selection of digital artworks that blend creativity with blockchain technology. These collections
            highlight the infinite possibilities within the realm of NFTs and the boundless talent of our featured artists.
            Join us on this exciting journey as we continue to push the boundaries of digital art, blockchain technology,
            and collective imagination. Let's celebrate the innovation and creativity in the NFT space, creating value,
            diversity, and dynamic experiences for our communities.
          </h4>
          <Row>
            {featuredNFTData.map((item, key) => (
              <Col xxl={3} lg={4} md={6} className="product-item upto-15" key={key}>
                {item.real ? (
                  <Link to={'/collections/' + item.collection_id}>
                    <h5 className="fs-15 mb-1"></h5>
                    <div className="card explore-box card-animate rounded d-flex flex-column h-100">
                      <div className="explore-place-bid-img" style={cardHeight}>
                        <img
                          src={item.img}
                          alt=""
                          className="card-img-top explore-img"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
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
                        <h4 className="mb-1">
                          <Link to={'/collections/' + item.collection_id} className="link-dark">
                            {item.title}
                          </Link>
                        </h4>
                        <p className="text-muted mt-2">{item.description.slice(0, 90) + '...'}</p>
                        <div className="d-flex align-items-center">
                          <Col>
                            <h5 className="flex-shrink-0 fs-14 mb-1 text-muted">Volume:</h5>
                            <h5 className="fw-medium text-primary ms-2">
                              <NearSvg size=".8em" /> {item.volume}
                            </h5>
                          </Col>
                          <Col>
                            <h5 className="flex-shrink-0 fs-14 mb-1 text-muted">Flor price:</h5>
                            <h5 className="fw-medium text-primary ms-2">
                              <NearSvg size=".8em" /> {item.price}
                            </h5>
                          </Col>
                        </div>
                      </CardBody>
                    </div>
                  </Link>
                ) : (
                  <div className="card explore-box card-animate rounded d-flex flex-column h-100">
                    <div className="explore-place-bid-img" style={cardHeight}>
                      <img
                        src={item.img}
                        alt=""
                        className="card-img-top explore-img"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />

                      <div className="bg-overlay"></div>
                      <div className="place-bid-btn">
                        <a
                          href="https://discord.gg/dzXAdqwrCU"
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
                      <h5 className="mb-1">
                        <Link to="/apps-nft-item-details" className="link-dark">
                          {item.title}
                        </Link>
                      </h5>
                    </CardBody>
                    <div className="card-footer border-top border-top-dashed">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 fs-14">
                          
                          <span className="fw-medium">{item.highest}</span>
                        </div>
                        <h5 className="flex-shrink-0 fs-14 text-primary mb-0">{item.price}</h5>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
);
}
export default FeaturedCollectionsMain;
