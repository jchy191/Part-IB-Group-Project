/* eslint-disable react/prop-types */
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import accessCategories from '../../types/AccessCategories';
import Map from '../Map/Map';
import CommentsModal from '../CommentsModal/CommentsModal';
import FormModal from '../FormModal/FormModal';
import { Category } from '../../types/category';
import { useStoreDispatch } from '../../store/hooks';
import { changeCategory } from '../../store/markersSlice';

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
        <Typography variant="h6" sx={{ p: 2 }}>
          Categories
        </Typography>
      </Box>
      <RadioGroup
        // defaultValue={accessCategories[Category.Open]}
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
                  <CheckBoxRoundedIcon fontSize="small" sx={{ color: accessCategories[cat].true_colour }} />
                  /
                  {accessCategories[cat].f}
                  <DisabledByDefaultRoundedIcon fontSize="small" sx={{ color: accessCategories[cat].false_colour }} />
                </Typography>
)}
              labelPlacement="end"
            />
          </Box>

        ))}
      </RadioGroup>
      <Typography variant="h6" sx={{ p: 2 }}>
        About
      </Typography>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Cambridge Land Justice
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
            display: { xs: 'block', sm: 'none' },
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
            display: { xs: 'none', sm: 'block' },
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
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <CommentsModal />
        <FormModal />
        <Map />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
