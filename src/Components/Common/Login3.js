import React, { useState, useEffect } from "react";

import { Button } from "reactstrap";
import { signOutNearWallet } from "../../near-api";
import { Wallet } from '../../near/near-wallet';
import ProfileDropdown from "./ProfileDropdown";


const Login = () => {
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [wallet] = useState(new Wallet({ createAccessKeyFor: process.env.REACT_APP_CONTRACT_NAME }));
  

  useEffect(() => {
    const initialize = async () => {
      const signedIn = await wallet.startUp();
      setIsSignedIn(signedIn);

    };
    initialize();
  }, [wallet]);




  if (!isSignedIn) {
    return (
      <div>
        
        <Button color="primary" className="btn-success btn-label right" onClick={() => wallet.signIn()}>
          <i className="bx bx-wallet label-icon align-middle fs-16 ms-2"></i>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <ProfileDropdown userId={wallet.accountId} wallet1={wallet}/>
      
      {/* <button onClick={() => wallet.signOut()}>Sign Out</button> */}
    </>
  );
};
export default Login;
