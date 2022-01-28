import React, { useState, useContext, useEffect } from 'react'

import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Avatar } from '@mui/material';
import { Typography, InputBase} from '@mui/material';
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotesIcon from '@mui/icons-material/Notes';

import AuthContext from '../../context/auth/authContext'
import NoteContext from '../../context/notes/notesContext';
import QueriesContext from '../../context/queries/queriesContext';
import ProfileContext from '../../context/userprofile/profileContext';
import stringAvatar from '../../utils/generateAvatar';

import { MainAccent } from '../../app.config';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ResponsiveAppBar = () => {
  const authContext = useContext(AuthContext)
  const noteContext = useContext(NoteContext)
  const queriesContext = useContext(QueriesContext)
  const profileContext = useContext(ProfileContext);
  
  const { user, logout, isAuthenticated } = authContext
  const { searchNotes, setFilter, clearSearch } = noteContext 
  const { setPopUp } = queriesContext
  const { setProfilePopup } = profileContext
  const [userName, setUserName] = useState('Notesbucket User')
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!user) return;
    setUserName(`${user.firstname} ${user.lastname}`)
  }, [user])

  useEffect(() => {
    if (query) searchNotes(query)
    else clearSearch()
  }, [query])

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawer(open);
  };

  const MenuList = () => (
    <Box
      sx={{ width: 'left' === 'top' || 'left' === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem style={{paddingBottom: '0px'}} className='justify-content-center mt-1' key={"avtaar"}>
            <IconButton onClick={() => setProfilePopup(true)}>
            <Avatar style={{height: '70px', width: '70px', fontWeight: 600, fontSize: '28px'}} {...stringAvatar(userName)} />
            </IconButton>
          </ListItem>
          <ListItem style={{paddingTop: '0px'}} className='justify-content-center mb-1' key={"title"}>
            <ListItemText style={{textAlign: 'center'}}
              disableTypography
              primary={<Typography style={{fontWeight: 500, fontSize: '1.2rem'}} >{userName}</Typography>} />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem onClick={() => setFilter("none")} button key={"All Notes"}>
            <ListItemIcon>
              <NotesIcon style={{fontSize: '1.8rem'}}/>
            </ListItemIcon>
            <ListItemText primary={"All Notes"} />
          </ListItem>
          <ListItem onClick={() => setFilter("recents")} button key={"Recents"}>
            <ListItemIcon>
              <AccessTimeIcon style={{fontSize: '1.8rem'}}/>
            </ListItemIcon>
            <ListItemText primary={"Recents"} />
          </ListItem>
          <ListItem onClick={() => setFilter("favourites")} button key={"Favourites"}>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon style={{fontSize: '1.8rem'}}/>
            </ListItemIcon>
            <ListItemText primary={"Favourites"} />
          </ListItem> 
          <ListItem onClick={() => logout()} button key={"Logout"}>
            <ListItemIcon>
              <LogoutIcon style={{fontSize: '1.8rem'}}/>
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
          <ListItem onClick={() => setPopUp(true)} button key={"Feedback"}>
            <ListItemIcon>
              <InfoOutlinedIcon style={{fontSize: '1.8rem'}}/>
            </ListItemIcon>
            <ListItemText primary={"Feedback"} />
          </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{background: MainAccent }} position="static">
        <Toolbar>
          {isAuthenticated ? (
            <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          ) : ''}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            NotesBucket
          </Typography>
          {isAuthenticated ?
          (<Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Global search…"
              name='search'
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>) : (
            <div className='app-header d-block d-sm-none d-md-none d-lg-none d-xl-none css-dudo9s-MuiTypography-root'>
              NotesBucket
            </div>
          ) }
        </Toolbar>
        <Drawer
            anchor="left"
            open={drawer}
            onClose={toggleDrawer(false)}>
            <MenuList />
        </Drawer>
      </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar;