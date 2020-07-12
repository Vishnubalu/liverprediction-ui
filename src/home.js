import React from 'react';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

function Home(props) {
    return (
        <div style={{textAlign:"center", marginTop:"20%"}}>
            <h1>
                LIVER DISEASE PREDICTION :
            </h1>
            <p style={{fontSize:"28px"}}>
                An intelligent system to predict whether you have liver disease or not
            </p>
            <Link to="/about">
            <Button variant="outline-primary" style={{backgroundColor:"white"}}>Get Started</Button>
            </Link>


        </div>
    );
}

export default Home;