import React from "react";

const SigninSuccessful = () => {
    return <div>
        <div className="text-center">
            <div className="mb-4">
            <lord-icon
                src="https://cdn.lordicon.com/lupuorrc.json"
                trigger="loop"
                colors="primary:#25a0e2,secondary:#00bd9d"
                style={{ width: "120px", height: "120px" }}
            />
            </div>
            <h5>Well Done !</h5>
            <p className="text-muted">You have Successfully Signed Up</p>
        </div>
    </div>
}

export default SigninSuccessful;