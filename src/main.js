import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import BasicTextFields from './InputBox'
import Box from "@material-ui/core/Box";
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import RadioButtonsGroup from "./radiobuttons";
import CircularIndeterminate from "./circularprogressive";


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
        marginTop: "10%",
        marginBottom: "5%",
        marginRight: "20%",
        borderRadius: 20,
        padding: 30,
    }
}));


function Main() {


    const classes = useStyles();
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const [er, setError] = useState({});
    const [formState, setFormState] = useState({});
    const [open, setOpen] = React.useState(true);
    const [isloading, loading] = React.useState(false);


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


    // POST request
    async function postUserToapi() {
        loading(true);
        console.log('user to api');
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
        console.log(obj['messege']);
        setValue(obj["messege"]);
        setOpen(true);
        loading(false);
    }

    async function validateUser() {
        console.log('userdata');
        const numbers = /^[0-9]+$/;
        const decimal = /^[-+]?[0-9]+\.[0-9]+$/
        for (const [key, input] of Object.entries(formState)) {
            if (input == "" || (!input.match(numbers) && !input.match(decimal))) {
                return 0
            }
        }
        console.log(formState);
        postUserToapi()
    }

    return (
        <div className="App">

            <Box display="flex" className={classes.root} flexWrap="wrap">
                {
                    (open) ? <p style={(value === "have disease")?{color:"red"} : {color:"blue"}}>{value}</p>:<p></p>
                }
                <Box style={{alignContent:"center", alignItems: "center"}}>
                <RadioButtonsGroup clicked={getGender}/>
                <BasicTextFields label={data} getdata={getsymtoms} error={er}/>
                    {(isloading)?
                        <CircularIndeterminate/>: <Button variant="contained" color="primary" onClick={validateUser}>SUBMIT</Button>
                    }
                </Box>

            </Box>

        </div>

    );
}

export default Main;
