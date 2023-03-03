import React, { useState } from 'react';
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

export default function AddCategories({ cat }) {
  const [checked, setChecked] = useState(true);
  return (
    <FormGroup sx={{ ml: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControlLabel
          sx={{ mr: 0 }}
          control={<Checkbox onClick={() => setChecked((c) => !c)} size="small" />}
          label=""
        />
        <Typography>{cat.f}</Typography>
        <GreenRedSwitch disabled={checked} defaultChecked size="small" />
        <Typography>{cat.t}</Typography>
      </Stack>
    </FormGroup>
  );
}
