import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useStoreSelector } from '../../../../store/hooks';
import { selectCategory } from '../../../../store/markersSlice';
import accessCategories from '../../../../types/AccessCategories';

export default function Legend() {
  const category = useStoreSelector(selectCategory);
  return (
    <Paper
      elevation={6}
      sx={{
        m: 2,
        p: 1,
        position: 'absolute',
        top: '90%',
        bgcolor: '#ffffff',
        display: 'flex',
        boxShadow: 1,
        zIndex: 1000,
      }}
    >
      <Box
        component="img"
        sx={{
          width: '20px',
          height: '34px',
        }}
        src={`${process.env.PUBLIC_URL}/${accessCategories[category].name}_true.png`}
      />
      <Typography variant="caption" sx={{ m: 1, fontWeight: 'bold' }}>
        {accessCategories[category].t}
      </Typography>
      <Box
        component="img"
        sx={{
          width: '20px',
          height: '34px',
        }}
        src={`${process.env.PUBLIC_URL}/${accessCategories[category].name}_false.png`}
      />
      <Typography variant="caption" sx={{ m: 1, fontWeight: 'bold' }}>
        {accessCategories[category].f}
      </Typography>
      <Box
        component="img"
        sx={{
          width: '20px',
          height: '34px',
        }}
        src={`${process.env.PUBLIC_URL}/grey.png`}
      />
      <Typography variant="caption" sx={{ m: 1, fontWeight: 'bold' }}>
        Undecided
      </Typography>
    </Paper>
  );
}
