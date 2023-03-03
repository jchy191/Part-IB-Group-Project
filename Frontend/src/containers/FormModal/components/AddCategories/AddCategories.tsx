import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const GreenRedSwitch = styled(Switch)({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#007000',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#007000',
  },
  '& .MuiSwitch-switchBase': {
    color: '#d2222d',
  },
  '& .MuiSwitch-switchBase + .MuiSwitch-track': {
    backgroundColor: '#D2222D',
  },
});

export default function AddCategories({ cat, handler, state }) {
  const [disabled, setDisabled] = useState(true);
  const [option, setOption] = useState(true);

  const handleDisable = () => {
    if (disabled) {
      setDisabled(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      option ? handler(1) : handler(0);
    } else {
      setDisabled(true);
      handler(2);
    }
  };

  useEffect(() => {
    switch (state) {
      case 2:
        setDisabled(true);
        setOption(true);
        return;
      case 1:
        setDisabled(false);
        setOption(true);
        return;
      case 0:
        setDisabled(false);
        setOption(false);
        return;
      default:
        setDisabled(true);
        setOption(true);
    }
  }, [state]);

  const handleChange = () => {
    if (option) {
      setOption(false);
      handler(0);
    } else {
      setOption(true);
      handler(1);
    }
  };

  return (
    <FormGroup sx={{ ml: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControlLabel
          sx={{ mr: 0 }}
          control={<Checkbox checked={!disabled} onClick={handleDisable} size="small" />}
          label=""
        />
        <Typography>{cat.f}</Typography>
        <GreenRedSwitch disabled={disabled} checked={option} onChange={handleChange} size="small" />
        <Typography>{cat.t}</Typography>
      </Stack>
    </FormGroup>
  );
}
