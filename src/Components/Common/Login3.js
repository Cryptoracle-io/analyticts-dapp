import React, { useState, useEffect } from "react";

import { Wallet } from '../../near/near-wallet';
import ProfileDropdown from "./ProfileDropdown";
import ModalCTest from "./SignUpModal/ModalCTest";

const Login = ({ onClick }) => {
  const [storedValue, setStoredValue] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [wallet] = useState(new Wallet({ createAccessKeyFor: process.env.REACT_APP_CONTRACT_NAME }));
  

useEffect(() => {
  const initialize = async () => {
    const signedIn = await wallet.startUp();
    setIsSignedIn(signedIn);
    // Get the value from local storage
    const storedData = localStorage.getItem('signedInAccount');

    // Update the state if the stored value exists
    if (storedData) {
      setStoredValue(storedData);
    }
    

    };
    initialize();
  }, [wallet]);




  if (!isSignedIn && !storedValue) {
    return (

      <div>
      <ModalCTest wallet1={wallet}/>
    </div>
    );
  }

  return (
    (!isSignedIn && storedValue!=null ? (<>
      <ProfileDropdown userId={storedValue} wallet1={wallet}/>
      
      {/* <button onClick={() => wallet.signOut()}>Sign Out</button> */}
    </>):(    <>
      <ProfileDropdown userId={wallet.accountId} wallet1={wallet}/>
      
      {/* <button onClick={() => wallet.signOut()}>Sign Out</button> */}
    </>)
    
)
  );
};
export default Login;
