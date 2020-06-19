import React, {useEffect, useMemo, useState} from 'react';
import CSVReader from "react-csv-reader";
import CircularIndeterminate from "./circularProgressbar"
import './App.css';
import BasicTextFields from './InputBox'
import ButtonAppBar from "./appbar";
import Box from "@material-ui/core/Box";
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import RadioButtonsGroup from "./radiobuttons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconLabelButtons from "./uploadicon";


const useStyles = makeStyles((theme) => createStyles({
    root: {
        // backgroundColor: "#ff1133",
        border: "2px solid blue",
        minWidth: "27ch",
        backgroundColor: "#ffffff",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "20%",
        shadowBlur: "#2224FF",
        marginTop: "1%",
        marginBottom: "5%",
        marginRight: "20%",
        borderRadius: 20,
        padding: 30,
    },
    head: {
        border: "2px solid blue",
        min: "20ch",
        backgroundColor: "#ffffff",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "20%",
        shadowBlur: "#2224FF",
        marginTop: "3%",
        marginBottom: "1%",
        marginRight: "20%",
        borderRadius: 20,
        padding: 30,
    }

}));


function App() {


    const classes = useStyles();
    const [data, setData] = useState([]);
    const [value, setValue] = useState([]);
    const [er, setError] = useState({});
    const [formState, setFormState] = useState({});
    const [csvdata, setCSV] = useState('');
    const [filename, setFile] = useState('');
    const [open, setOpen] = React.useState(false);
    const [result, setResult] = useState(true);
    const handleForce = (data, fileInfo) => (setCSV(data), setFile(fileInfo));

    // const [disabled, setDisable] = useState(true);

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };


    const handleClose = () => {
        setOpen(false);
    };

    function getsymtoms(key) {
        const newErrors = {...er};
        const newFormState = {...formState};
        const decimal = /^[-+]?[0-9]+\.[0-9]+$/;
        const numbers = /^[0-9]+$/;
        if (key.target.value.match(numbers) || key.target.value.match(decimal)) {
            newErrors[key.target.id] = false;
        } else {
            newErrors[key.target.id] = true;
        }
        newFormState[key.target.id] = key.target.value;
        setFormState(newFormState);
        setError(newErrors);
        //console.log("updating ---" + JSON.stringify(formState));
    }


    async function getGender(key) {
        const newFormState = {...formState};
        newFormState["Gender"] = key.target.value;
        setFormState(newFormState);
    }


    // GET request using fetch inside useEffect React hook
    async function getcolnames() {
        const response = await fetch('http://127.0.0.1:8000/symptoms/',
            {

                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        const json = await response.json();
        setData(json['symptoms']);
        const formData = json['symptoms'].reduce(function (map, obj) {
            map[obj] = "";
            return map;
        }, {});
        setFormState(formData)
    }


    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        getcolnames();

    }, []);

    async function downloadSampleData() {
        fetch('http://127.0.0.1:8000/download/')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    // a.download = 'employees.json';
                    // a.click();
                });
                window.location.href = response.url;
            });
    };

    async function downloadResult() {
        setResult(true);
        fetch('http://127.0.0.1:8000/result/')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    // a.download = 'employees.json';
                    // a.click();
                });
                window.location.href = response.url;
            });
    };


    // POST request
    async function postUserToapi() {

        const response = await fetch('http://127.0.0.1:8000/predictdisease/',
            {

                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "symptoms": formState
                })

            }).then(response => response.json())
            .catch(error => error);

        console.log("resp " + response);
        var obj = JSON.parse(response);
        setValue(obj["messege"]);
        setOpen(true);
    }

    async function PostCSVtoAPI() {
        // const csrf = this.getCookie('csrftoken');
        const response = await fetch('http://127.0.0.1:8000/upload/', {
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
                setOpen(true);
            });
        var obj = JSON.parse(response);
        setResult(obj["created"]);
        setValue(obj["result"]);
        setOpen(obj["open"]);
    }

    // async function CSVdata(files) {
    //     console.log(files.fileList);
    //
    // //     var reader = new FileReader();
    // // reader.onload = function(file) {
    // //     // Use reader.result
    // //     alert(reader.result)
    // // };
    // // reader.readAsText(files[0]);
    //     // console.log(formData.get('file'))
    // }


    async function validateUser() {
        console.log('userdata');
        const numbers = /^[0-9]+$/;
        const decimal = /^[-+]?[0-9]+\.[0-9]+$/
        for (const [key, input] of Object.entries(formState)) {
            console.log(key);
            if (input == "" || (!input.match(numbers) && !input.match(decimal))) {
                if (csvdata != '') {
                    PostCSVtoAPI()
                }
                return 0
            }
        }
        console.log(formState);
        postUserToapi()
    }

    console.log(filename['name']);

    // async function postApi() {
    //     setResult(1);
    //     console.log(csvdata);
    //     if (csvdata != '') {
    //         PostCSVtoAPI()
    //     }
    //     userData()
    // }


    return (
        <div className="App">

            <div>
                <ButtonAppBar/>
            </div>

            <Box display="flex" className={classes.head} flexWrap="wrap">
                <IconLabelButtons func={downloadSampleData} disabled={false} label={"SampleData"}/>
                <CSVReader
                    cssClass="react-csv-input"
                    label=".csv with liver disease symptoms:"
                    onFileLoaded={handleForce}
                    parserOptions={papaparseOptions}
                    inputStyle={{opacity: 1, width: '170px', color: 'blue'}}
                />
                <IconLabelButtons func={downloadResult} disabled={result} label={"Result"}/>
                <p>select csv file or enter values manually and submit</p>


            </Box>

            <Box display="flex" className={classes.root} flexWrap="wrap">
                <RadioButtonsGroup clicked={getGender}/>
                <BasicTextFields label={data} getdata={getsymtoms} error={er}/>
                <Button variant="contained" color="primary" onClick={validateUser}>SUBMIT</Button>

            </Box>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"THANKS FOR USING OUR SITE"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {value}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        okay
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default App;
