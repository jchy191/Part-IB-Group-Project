import React from 'react';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import accessCategories from '../../../../types/AccessCategories';

export default function ChosenCategory({ entry }) {
  return (
    <>
      {Object.entries(accessCategories).map(([, cat]) => (
        <>
          {entry[cat.name] && <CheckBoxRoundedIcon sx={{ color: cat.colour }} />}
          {entry[cat.name] !== null
            && !entry[cat.name]
            && <DisabledByDefaultRoundedIcon sx={{ color: cat.colour }} />}
        </>

      ))}
    </>
  );
}
