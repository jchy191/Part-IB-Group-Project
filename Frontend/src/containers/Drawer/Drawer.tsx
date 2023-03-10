/* eslint-disable react/prop-types */
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import accessCategories from '../../types/AccessCategories';
import Map from '../Map/Map';
import EntriesModal from '../EntriesModal/EntriesModal';
import FormModal from '../FormModal/FormModal';
import { Category } from '../../types/category';
import { useStoreDispatch } from '../../store/hooks';
import { changeCategory } from '../../store/markersSlice';
import Legend from '../Map/components/Legend/Legend';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [toggleValue, setToggleValue] = React.useState(Category.Open);
  const dispatch = useStoreDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeCategory(Number(event.target.value)));
    setToggleValue(Number(event.target.value));
  };

  const drawer = (
    <div>
      <Box display="flex">
        <Typography variant="h5" sx={{ p: 2 }}>
          Cambridge Land Justice
        </Typography>
      </Box>
      <Box display="flex">
        <Typography variant="h6" sx={{ p: 2 }}>
          Categories
        </Typography>
      </Box>
      <RadioGroup
        defaultValue={accessCategories[Category.Open]}
        value={toggleValue}
        onChange={handleChange}
        name="filters-group"
        sx={{ ml: 2 }}
      >
        {Object.values(Category).filter((v) => !Number.isNaN(Number(v))).map((cat) => (
          <Box mt={2}>
            <FormControlLabel
              value={cat}
              control={<Radio color="secondary" />}
              label={(
                <Typography variant="body1">
                  {accessCategories[cat].t}
                  <CheckBoxRoundedIcon fontSize="small" sx={{ color: accessCategories[cat].true_colour, position: 'relative', top: '5px' }} />
                  /
                  {accessCategories[cat].f}
                  <DisabledByDefaultRoundedIcon fontSize="small" sx={{ color: accessCategories[cat].false_colour, position: 'relative', top: '5px' }} />
                </Typography>
)}
              labelPlacement="end"
            />
          </Box>

        ))}
      </RadioGroup>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <IconButton
        aria-label="open drawer"
        color="inherit"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          mr: 2,
          display: { md: 'none' },
          backgroundColor: '#eeeeee',
          color: 'black',
          position: 'fixed',
          top: '20px',
          left: '30px',
          zIndex: 1000,
          '&:hover': { backgroundColor: '#cccccc' },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <EntriesModal />
        <FormModal />
        <Legend />
        <Map />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
