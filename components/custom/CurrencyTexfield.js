import React, { useState, forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const NumericFormatCustom = forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
      />
    );
  },
);

export default function CurrencyTexfield(props) {
  const [value, setValue] = useState(props.value);


  return (
    <TextField
      {...props}
      value={value}
      InputProps={{
        inputComponent: NumericFormatCustom,
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  );
}
