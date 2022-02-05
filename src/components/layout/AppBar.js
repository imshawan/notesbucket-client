import React, { useState, useContext, useEffect } from 'react'

import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Avatar } from '@mui/material';
import { Typography, InputBase, ThemeProvider} from '@mui/material';
import { Drawer, List, Tooltip, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotesIcon from '@mui/icons-material/Notes';
import GitHubIcon from '@mui/icons-material/GitHub';
import ReportIcon from '@mui/icons-material/Report';

import AuthContext from '../../context/auth/authContext'
import NoteContext from '../../context/notes/notesContext';
import QueriesContext from '../../context/queries/queriesContext';
import ProfileContext from '../../context/userprofile/profileContext';
import stringAvatar from '../../utils/generateAvatar';

import {Theme} from './Layout';

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
  const { searchNotes, setFilter, clearSearch, notes } = noteContext 
  const { setPopUp } = queriesContext
  const { setProfilePopup } = profileContext
  const [userName, setUserName] = useState('Notesbucket User')
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState("");
  const [Selected, setSelected] = useState(1)

  useEffect(() => {
    if (!user) return;
    setUserName(`${user.firstname} ${user.lastname}`)
  }, [user])

  useEffect(() => {
    if (query) searchNotes(query)
    else clearSearch()
    // eslint-disable-next-line
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
      <ThemeProvider theme={Theme}>
      <List>
          <ListItem style={{paddingBottom: '0px'}} className='justify-content-center mt-1' key={"avtaar"}>
            <Tooltip title="View profile" placement="bottom" arrow>
              <IconButton onClick={() => {setProfilePopup(true); setSelected(1); }}>
              <Avatar style={{height: '70px', width: '70px', fontWeight: 500, fontSize: '28px'}} {...stringAvatar(userName)} />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem style={{paddingTop: '0px'}} className='justify-content-center mb-1' key={"title"}>
            {console.log(user)}
            <ListItemText style={{textAlign: 'center'}}
              disableTypography
              primary={<Typography style={{fontWeight: 500, fontSize: '1.2rem'}} >{userName}</Typography>}
              secondary={user ? (<Typography style={{fontWeight: 400, fontSize: '0.9rem'}} >{`@${user.username}`}</Typography>) : ''} />
          </ListItem>
      </List>

      <List>
          <ListItem onClick={() => { setFilter("none"); setSelected(1); }} selected={Selected === 1} button key={"All Notes"}>
            <ListItemIcon>
              <NotesIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={
              <div className='d-flex m-auto' style={{ justifyContent: 'space-between' }}>
                All Notes 
                {notes ? (<div className='badge'>
                  <div style={{marginTop: '1px'}}>{notes.length}</div>
                </div>) : ''}
              </div>
            } />
          </ListItem>
          <ListItem onClick={() => { setFilter("recents"); setSelected(2); }} selected={Selected === 2} button key={"Recents"}>
            <ListItemIcon>
              <AccessTimeIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={"Recents"} />
          </ListItem>
          <ListItem onClick={() => { setFilter("favourites"); setSelected(3); }} selected={Selected === 3} button key={"Favourites"}>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={
              <div className='d-flex m-auto' style={{ justifyContent: 'space-between' }}>
                Favourites
                {notes ? (<div className='badge'>
                  <div style={{marginTop: '1px'}}>{notes.filter(note => note.favourite === true).length}</div>
                </div>) : ''}
              </div>
            } />
          </ListItem> 
          <ListItem onClick={() => logout()} button key={"Logout"}>
            <ListItemIcon>
              <LogoutIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={"Logout"} />
          </ListItem>
          <ListItem onClick={() => setPopUp(true)} button key={"Feedback"}>
            <ListItemIcon>
              <InfoOutlinedIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={"Feedback"} />
          </ListItem>
      </List>
      {/* Footer section */}
      <div style={{ width: '100%', bottom: '18px', position: 'absolute'}}>
        <div className='d-flex justify-content-center'>
          <Tooltip title="Raise an issue" placement="top" arrow>
            <IconButton                
              target="_blank"
              component="a"
              href="https://github.com/imshawan/notesbucket-client/issues">
                <ReportIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub" placement="top" arrow>
            <IconButton                
              target="_blank"
              component="a"
              href="https://github.com/imshawan/NotesBucket">
                <GitHubIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className='d-flex justify-content-center' style={{ width: '100%'}}>
          <div  style={{ textAlign: 'center', fontSize: '10px', width: '80%'}}>
          Raise an issue here. Contribute to this project on GitHub.
          </div>
        </div>
      </div>

      </ThemeProvider>
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