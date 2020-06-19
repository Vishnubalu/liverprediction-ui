import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 'auto',
      minWidth:'27ch'
    },
  },
}));


export default function BasicTextFields(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField error= {props.error[props.label[0]]} id={props.label[0]} label={props.label[0]}  variant="outlined" onChange={props.getdata}/>
      <TextField error= {props.error[props.label[2]]} id={props.label[2]} label={props.label[2]}  variant="outlined" onChange= {props.getdata}/>
      <TextField error= {props.error[props.label[3]]} id={props.label[3]} label={props.label[3]}  variant="outlined" onChange={props.getdata}/>
      <TextField error= {props.error[props.label[4]]} id={props.label[4]} label={props.label[4]}  variant="outlined" onChange={props.getdata}/>
      <TextField error= {props.error[props.label[5]]} id={props.label[5]} label={props.label[5]}  variant="outlined" onChange={props.getdata}/>
      <TextField error= {props.error[props.label[6]]} id={props.label[6]} label={props.label[6]}  variant="outlined" onChange={props.getdata}/>
      <TextField error= {props.error[props.label[7]]} id={props.label[7]} label={props.label[7]}  variant="outlined" onChange={props.getdata}/>
      <TextField error= {props.error[props.label[8]]} id={props.label[8]} label={props.label[8]}  variant="outlined" onChange={props.getdata}/>
      <TextField error= {props.error[props.label[9]]} id={props.label[9]} label={props.label[9]}  variant="outlined" onChange={props.getdata}/>
    </form>

  );
}