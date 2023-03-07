import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
      option ? handler(true) : handler(false);
    } else {
      setDisabled(true);
      handler(null);
    }
  };

  useEffect(() => {
    if (state === null) {
      setDisabled(true);
      setOption(true);
    } else if (state) {
      setDisabled(false);
      setOption(true);
    } else {
      setDisabled(false);
      setOption(false);
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
          control={(
            <Checkbox
              checked={!disabled}
              icon={<AddCircleOutlineIcon />}
              checkedIcon={<AddCircleIcon />}
              onClick={handleDisable}
              size="small"
            />
)}
          label=""

        />
        <Typography color={disabled ? '#888888' : '#000000'}>{cat.f}</Typography>
        <GreenRedSwitch disabled={disabled} checked={option} onChange={handleChange} size="small" />
        <Typography color={disabled ? '#888888' : '#000000'}>{cat.t}</Typography>
      </Stack>
    </FormGroup>
  );
}
