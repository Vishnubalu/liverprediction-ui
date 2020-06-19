import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function IconLabelButtons(props) {
    const classes = useStyles();

    return (
        <div>

           <Button
        variant="contained"
        disabled={props.disabled}
        onClick = {props.func}
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        {props.label}
      </Button>
        </div>
    );
}