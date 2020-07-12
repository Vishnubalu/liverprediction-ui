import React, {useEffect} from 'react';
import IconLabelButtons from "./uploadicon";

function Download(props) {

     async function downloadSampleData() {
        fetch('http://127.0.0.1:8000/download/')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                });
                window.location.href = response.url;
            });
    };

    return (
        <div className={"download"} style={{justifyContent:"center", justifyItems:"center", marginTop:"15%", marginLeft:"43%"}}>

            <p>
                Please follow this format
            </p>
             <IconLabelButtons func={downloadSampleData} disabled={false} label={"SampleData"}/>
        </div>
    );
}

export default Download;