import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './nav.css'
import back from "./back.png"
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    marginLeft : theme.spacing(4),

  },
   logo: {
    position:"relative",
    maxWidth: 120,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root} styles={{ backgroundImage:`url(${back})` }}>
      <AppBar position="sticky">
        <Toolbar>

          <img src='liver.png' alt="Logo" className={classes.logo}/>
          <Typography variant="h6" className={classes.title} >
            LIVER DISEASE PREDICTION
          </Typography>
          <Link to="/home">
          <li>
            HOME
          </li>
          </Link>
          <Link to="/about">
          <li>
            ABOUT
          </li>
          </Link>
          <Link to="/main">
          <li>
            SINGLE_USER
          </li>
          </Link>
          <Link to="/upload">
          <li>
            MULTI_USER
          </li>
          </Link>
          <Link to="/download">
          <li>
            SAMPLE_DATA
          </li>
          </Link>

        </Toolbar>
      </AppBar>
    </div>
  );
}
