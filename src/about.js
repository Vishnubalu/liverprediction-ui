import React from 'react';
import './footer.css'

function About(props) {
    return (
        <div className='about'>
            <h1>
                ABOUT
            </h1>
            <p className='info'> Patients with Liver disease have been continuously increasing because of excessive
                consumption of alcohol, inhale of harmful gases, intake of contaminated food,
                pickles and drugs. This use case was used to evaluate prediction algorithms in an effort to reduce burden on doctors.
                This document shows the workflow of an Artificial Intelligence Machine learning (AIML) use case which includes all the steps required to build this AIML use case from scratch.

                Steps that were followed are data pre-processing, data cleaning, feature exploration,
                feature engineering and the impact that it has on Machine Learning Model Performance.
                Couple of the Pre-modelling steps are also followed that can help to improve the model performance. </p>
            <footer className="footer">
                <p className='head'>
                    <h1>
                    All Rights Reserved To <a href="https://www.virtusa.com">@VIRTUSA</a>
                    </h1>
                </p>
            </footer>
        </div>


    );
}

export default About;