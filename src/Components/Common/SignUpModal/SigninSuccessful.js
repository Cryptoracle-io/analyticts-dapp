import React, { useEffect } from 'react';

const SigninSuccessful = ({ activeTab }) => {
  useEffect(() => {
    if (activeTab === 4) { // Use strict equality operator (===) for comparison
      const timeout = setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 3000); // 3 seconds
      console.log(activeTab);

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeout);
    }
  }, [activeTab]); // Include activeTab in the dependency array to track its changes

  return (
    <div>
      <div className="text-center">
        <div className="mb-4">
          {/* Any content you want to display */}
        </div>
        <h5>Well Done, you are now participating in the giveaway!</h5>
        <p className="text-muted">You have Successfully Signed Up</p>
      </div>
    </div>
  );
};

export default SigninSuccessful;
