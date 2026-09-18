import React from "react";
import { SyncLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
};

// Destructure the 'loading' prop passed from the parent component
function Loader() {
    // Render nothing if loading is false

    return (
        <div className="spinner-container" style={{ textAlign: "center", marginTop: "50px" }}>
            <SyncLoader
                color="#3936d7"

                cssOverride={override}
                size={15}
                margin={2}
                speedMultiplier={1}
                aria-label="Loading Spinner"
            />
        </div>
    );
}

export default Loader;
