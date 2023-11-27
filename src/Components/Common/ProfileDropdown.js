import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { getConfig } from "../../near/confign";
import { formatyocto } from "../../helpers/lib";
import { Wallet } from '../../near/near-wallet';
import * as nearAPI from "near-api-js"; 
import { signOutNearWallet } from "../../near-api";
import {NearSvg} from './utils';

//import images
import avatar1 from "../../assets/images/users/user.png";
import avatar2 from "../../assets/images/users/premium-user.png";
async function RPCCALL(user) {
    const { connect } = nearAPI;

    const connectionConfig = getConfig('mainnet');
    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account(user);
    const balance = await account.getAccountBalance()
    return formatyocto(balance.total,2);
}

  
const ProfileDropdown = ({ userId, wallet1 }) => {
    const [userName, setUserName] = useState('');
    const [userBalance, setUserBalance] = useState(0);
    const [wallet] = useState(wallet1);
    
    useEffect(() => {
        if (userId) {
            setUserName(userId); // set the userName state as the userId prop if userId is defined
        }
    }, [userId]);

    useEffect(() => {
        if (userName) {
            RPCCALL(userName)
                .then(userbalance => {
                    setUserBalance(userbalance);
                })
                .catch(err => {
                    console.error(err);
                    // handle error
                });
        }
    }, [userName]);

    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    const signOut = () => {
        // Check if the key exists in local storage
        if (localStorage.getItem('signedInAccount')) {
          localStorage.removeItem('signedInAccount'); // Replace 'myKey' with the key you want to remove
          // Add any other operations you want to perform when the key exists
        } else {
          // If the key doesn't exist, execute wallet.signOut()
          wallet.signOut();
        }
      };
       
    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
            <DropdownToggle tag="button" type="button" className="btn">
  <span className="d-flex align-items-center">
    
      <img
        className="rounded-circle header-profile-user"
        src={(userName && userName.toString().includes("cryptoracleio.near") ? (avatar2):(avatar1))}
        alt="Header Avatar"
      />
    
    <span className="text-start ms-xl-2">
    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
        {userName && userName.toString().slice(0, 15)}
        </span>
    </span>
  </span>
</DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">

                    <h6 className="dropdown-header">Welcome {userName}!</h6>
                    <DropdownItem href={"/profile/" + userName}><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Profile</span></DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem ><i
                        className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Balance : <b><NearSvg size=".8em" /> {userBalance}</b></span></DropdownItem>
                    {/* <DropdownItem href={process.env.PUBLIC_URL + "/pages-profile-settings"}><span
                        className="badge bg-soft-success text-success mt-1 float-end">New</span><i
                            className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle">Settings</span></DropdownItem> */}
                    <DropdownItem href={process.env.PUBLIC_URL + "/logout"}>
                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                        <span
                            className="align-middle"
                            data-key="t-logout"
                            onClick={() => signOut()} // Call the function to delete from local storage or sign out
                        > Logout
                        </span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;