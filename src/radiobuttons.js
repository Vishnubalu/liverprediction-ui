import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormControlLabelPlacement(props) {
  return (
    <FormControl component="fieldset">

      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          value="0"
          control={<Radio color="primary" />}
          label="female"
          onClick={props.clicked}
          labelPlacement="start"
        />
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="male"
          onClick={props.clicked}
          labelPlacement="start"
        />

      </RadioGroup>
    </FormControl>
  );
}