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
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import accessCategories from '../../types/AccessCategories';
import { Category } from '../../types/category';
import Map from '../Map/Map';
import CommentsModal from '../CommentsModal/CommentsModal';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box display="flex">
        <Typography variant="h6" sx={{ p: 2 }}>
          Categories
        </Typography>
        <SquareRoundedIcon fontSize="small" sx={{ mt: 2.5, color: '#007000' }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          /
        </Typography>
        <SquareRoundedIcon fontSize="small" sx={{ mt: 2.5, color: '#d2222d' }} />
      </Box>
      <RadioGroup
        defaultValue={accessCategories[Category.A].t}
        name="filters-group"
        sx={{ ml: 2 }}
      >
        {Object.entries(accessCategories).map(([, cat]) => (
          <FormControlLabel
            control={<Radio value={cat.t} color="secondary" />}
            label={`${cat.t}  / ${cat.f}`}
            labelPlacement="end"
          />
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
        <Map />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
