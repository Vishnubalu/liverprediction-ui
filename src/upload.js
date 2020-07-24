import React, {useState} from 'react';
import IconLabelButtons from "./uploadicon";
import CSVReader from "react-csv-reader";
import Box from "@material-ui/core/Box";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularIndeterminate from "./circularprogressive";


const useStyles = makeStyles((theme) => createStyles({
    head: {
        border: "2px solid blue",
        min: "10ch",
        backgroundColor: "#ffffff",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "20%",
        shadowBlur: "#2224FF",
        marginTop: "10%",
        marginBottom: "5%",
        marginRight: "20%",
        borderRadius: 20,
        padding: 30,
    }

}));

function Upload() {
    const classes = useStyles();
    const [result, setResult] = useState("disabled");
    const [value, setValue] = useState('Upload or drag and drop csv file here');
    const [csvdata, setCSV] = useState('');
    const [filename, setFile] = useState('');
    const [open, setOpen] = React.useState("close");
    const [enable, setEnable] = useState(1);
    const handleForce = (data, fileInfo) => (setCSV(data), setFile(fileInfo));

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    async function PostCSVtoAPI() {
        setOpen('open');
        // const csrf = this.getCookie('csrftoken');
        const response = await fetch('http://192.168.43.3:8000/upload/', {
            method: "POST",
            //headers: {'Content-Type': 'multipart/form-data'},
            body: JSON.stringify({
                "data": csvdata,
                "filename": filename
            })
        })
            .then((response) => response.json())
            .catch((error) => {
                setValue("maybe symptoms are not matching, Please follow the SAMPLE format");
                setOpen("close");
            });
        var obj = JSON.parse(response);
        setResult("enabled");
        setValue(obj['result']);
        setOpen("close");
        setEnable(obj['created'])
    }

    async function downloadResult() {

        fetch('http://192.168.43.3:8000/result/')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                });
                window.location.href = response.url;
            });
        setResult("disabled")
    };


    return (
        <div>
            <Box display="flex" className={classes.head} flexWrap="wrap">
                {
                    (value === "ok") ? <p style={{color: "blue"}}>click on RESULT button </p> :
                        <p style={{color: "red", fontSize:"20px"}}>{value}</p>
                }
                <Box display="flex" className={classes.head} flexWrap="wrap">
                    <CSVReader
                        cssClass="react-csv-input"
                        label="Upload file :"
                        onFileLoaded={handleForce}
                        parserOptions={papaparseOptions}
                        inputStyle={{opacity: 1, width: '170px', color: 'blue'}}
                    />
                    {
                        (open === "open")?<CircularIndeterminate/>:(result === "enabled")?<IconLabelButtons func={downloadResult} disabled={enable} label={"Result"}/>:<p></p>
                    }
                    <Button variant="contained" color="primary" onClick={PostCSVtoAPI}>SUBMIT</Button>

                </Box>
            </Box>
        </div>
    );
}

export default Upload;