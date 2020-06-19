import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,

  },
   logo: {
    position:"relative",

    maxWidth: 120,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <img src='liver.png' alt="Logo" className={classes.logo}/>
          <Typography variant="h6" className={classes.title} >
            LIVER DISEASE PREDICTION
          </Typography>
          <img src='liver.png' alt="Logo" className={classes.logo}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
