import React, { useState, useEffect } from "react";

import { Button } from "reactstrap";
import { signOutNearWallet } from "../../near-api";
import { Wallet } from './../../near/near-wallet';
import ProfileDropdown from "./ProfileDropdown";


const Login = () => {
  
  // When creating the wallet you can choose to create an access key, so the user
  // can skip signing non-payable methods when interacting with the contract
  //const wallet = new Wallet({ createAccessKeyFor: "dev-1666176534370-56189442712103" })

  // Abstract the logic of interacting with the contract to simplify your project
  // const counter = new Counter({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });
  
  const wallet = new Wallet({ createAccessKeyFor: process.env.REACT_APP_CONTRACT_NAME })

  wallet.startUp();

  const handleSignOut = () => {
    wallet.signOut();
    signOutNearWallet();
    
  }

  if (!window.walletConnection.isSignedIn()) {

    return (
      <>

              <Button color="link"  onClick={() => wallet.signIn()}>
          
          Login
        </Button>
      </>
    );
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      {/* <ProfileDropdown userId="{accountId}"/> */}
        <button 
          className="btn btn-success" 
          style={{backgroundColor: "grey", border: "none"}} 
          onClick={handleSignOut}>
          Sign out
        </button>
    </>
  );
};
export default Login;
