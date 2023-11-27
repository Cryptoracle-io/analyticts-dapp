import { useMemo, useEffect, useState } from 'react';
import { Container, Card, CardBody, Col, Row, CardHeader } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import BreadCrumb from "../Components/Common/BreadCrumb";
import { formatyocto, format } from '../helpers/lib';
import { Cards , Popularity , Widgets  } from '../Components/Common/utils';
import { Tabs  } from '../Components/Common/UserProfile';
import user from '../assets/images/users/user.png'
import premiumuser from '../assets/images/users/premium-user.png'
import * as nearAPI from "near-api-js";
import { getConfig } from '../near/confign';
export default function CollectionProfile(props) {

    let { userId } = useParams();

    const [userBalance, setUserBalance] = useState("0");
    const [profileData, setProfileData] = useState({ data: { results: [{}] } });
    const [collectionsData, setCollectionsData] = useState({ result: [] });
    const [tokensData, setTokensData] = useState({ count: 0 });



    const init = async () => {

        const userbalance = await RPCCALL(userId)
        setUserBalance(userbalance)

        const requestProfile = await fetch(process.env.REACT_APP_API_URL + '/profiles?accountId=' + userId + '&__skip=0&__limit=1');
        const resultProfile = await requestProfile.json()
        setProfileData(resultProfile.data.results[0])
        
        const requestCollections = await fetch(process.env.REACT_APP_API_URL + '/owned-collections?accountId=' + userId);
        const resultCollections = await requestCollections.json()
        setCollectionsData( resultCollections)
        
        const requestTokens = await fetch(process.env.REACT_APP_API_URL + '/token?exclude_total_burn=true&lookup_token=true&owner_id=' + userId + '&__sort=_id::-1&__limit=30');
        const resultTokens = await requestTokens.json()
        setTokensData(resultTokens.data)
        
        ///token?exclude_total_burn=true&lookup_token=true&owner_id=cryptoracle.near&__sort=_id::-1&__limit=12
        ///owned-collections?accountId=cryptoracle.near
        ///profiles?accountId=irfi.near&__skip=0&__limit=1
        
    };
    async function RPCCALL(user) {
        const { connect } = nearAPI;

        const connectionConfig = getConfig("mainnet");
        const nearConnection = await connect(connectionConfig);
        
        const account = await nearConnection.account(user);
        const balance = await account.getAccountBalance()
        
        return formatyocto(balance.total,2);
    }

    useEffect(() => {
        init();
    }, []);

 

    return (
        <div className="page-content">
            <Container fluid={true}>
                <BreadCrumb title="Trader Profile" breadcrumbItem="Trader Profile" />
                <Card >
                    <CardBody className="mt-4" >
                        <Row className="position-relative mb-4 ms-auto">
                            <Col md={1} className="ms-3">
                                
                                
                            {userId.toString().includes("cryptoracleio.near") ? (
      <img className="mb-4 align-items-center rounded-circle text-center"
      alt="200x200"
        src={premiumuser}
        style={{ maxWidth: 200 }}
      />
    ) : (
                                <img className="mb-4 align-items-center rounded-circle text-center"
                                    alt="200x200"
                                    src={(profileData && profileData.data && profileData.data.results[0] && profileData.data.results[0].imgUrl
                                        ? (process.env.REACT_APP_IMAGES + '/image-resizing?width=200&image=' + process.env.REACT_APP_IPFS_URL2 + '/' + (profileData.data.results[0].imgUrl.replace("ipfs://", "",)))
                                        : user)}
                                    style={{ maxWidth: 200 }} />
                                    )}
                            </Col>
                            
                            <Col md={5} className="ms-5 align-items-center " >
                                
                                <h1 className="ms-5">{userId.length<28 ? userId : userId.slice(0,28)+"..."}</h1>

                                <span className="ms-5">See in Explorer: </span>
                                    {/* <i className={"align-middle " + Icon}></i> */}
                                    
                                    <a href={'https://explorer.mainnet.near.org/accounts/'+userId} target="_blank" rel="noreferrer" className=" text-primary">
                                        {userId.length<28 ? userId : userId.slice(0,28)+"..."}
                                        </a>
                                
                                
                            </Col>
                            <Col> 
                                <Widgets Label={"Total Items"} prefix="" decimal="" Icon={"ri-hand-coin-line"} counter={tokensData.count}/>
                            </Col>
                            <Col>
                                <Widgets Label={"$Near Balance"} Icon={"ri-money-dollar-circle-fill"} prefix="" counter={userBalance}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                <div className="sticky-side-div">
                                    {collectionsData.result && <Popularity data={collectionsData.result} Title={"Collections"} />}
                                </div>
                            </Col>
                            <Tabs items={tokensData.count}/>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}