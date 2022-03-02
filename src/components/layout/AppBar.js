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
import ShareIcon from '@mui/icons-material/Share';

import AuthContext from '../../context/auth/authContext'
import NoteContext from '../../context/notes/notesContext';
import QueriesContext from '../../context/queries/queriesContext';
import ProfileContext from '../../context/userprofile/profileContext';
// eslint-disable-next-line
import { stringAvatar, stringToColor } from '../../utils/generateAvatar';
import { Theme } from './Layout';
import { MainAccent } from '../../app.config';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  // borderRadius: theme.shape.borderRadius,
  borderRadius: '28px',
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
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
  color: '#000'
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
      width: '28ch',
      '&:focus': {
        width: '36ch',
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
  const { searchNotes, setFilter, clearSearch, notes, clearNotes } = noteContext 
  const { setPopUp } = queriesContext
  const { setProfilePopup } = profileContext
  const [userName, setUserName] = useState('Notesbucket User')
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState("");
  const [Selected, setSelected] = useState(1)

  const logMeOut = () => {
    clearNotes()
    logout()
  }

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
                  <IconButton onClick={() => {setProfilePopup(true); setSelected(1); }} style={{ boxShadow: 'rgb(0 0 0 / 20%) 0px 10px 15px' }}>
                  <Avatar style={{height: '70px', width: '70px', fontWeight: 500, fontSize: '28px'}} {...stringAvatar(userName)} />
                  </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem style={{paddingTop: '0px'}} className='justify-content-center mb-1' key={"title"}>
            <ListItemText style={{textAlign: 'center'}}
              disableTypography
              primary={<Typography style={{fontWeight: 600, fontSize: '1.2rem'}} >{userName}</Typography>}
              secondary={user ? (<Typography style={{fontWeight: 400, fontSize: '0.8rem'}} >{`@${user.username}`}</Typography>) : ''} />
          </ListItem>
      </List>

      <List style={{width: '95%', fontWeight: 600, fontSize: '16px'}}>
          <ListItem className="drawer-list" onClick={() => { setFilter("none"); setSelected(1); }} selected={Selected === 1} button key={"All Notes"}>
            <ListItemIcon>
              <NotesIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={
              <div className='d-flex m-auto' style={{ justifyContent: 'space-between' }}>
                <span className='drawer-text'>All Notes</span>
                {notes ? (<div className='badge'>
                  <div style={{marginTop: '1px'}}>{notes.length}</div>
                </div>) : ''}
              </div>
            } />
          </ListItem>
          <ListItem className="drawer-list" onClick={() => { setFilter("recents"); setSelected(2); }} selected={Selected === 2} button key={"Recents"}>
            <ListItemIcon>
              <AccessTimeIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={<span className='drawer-text'>Recents</span>} />
          </ListItem>
          <ListItem className="drawer-list" onClick={() => { setFilter("favourites"); setSelected(3); }} selected={Selected === 3} button key={"Favourites"}>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={
              <div className='d-flex m-auto' style={{ justifyContent: 'space-between' }}>
                <span className='drawer-text'>Favourites</span>
                {notes ? (<div className='badge'>
                  <div style={{marginTop: '1px'}}>{notes.filter(note => note.favourite === true).length}</div>
                </div>) : ''}
              </div>
            } />
          </ListItem> 
          <ListItem className="drawer-list" onClick={() => { setFilter("shared"); setSelected(4); }} selected={Selected === 4} button key={"Shared"}>
            <ListItemIcon>
              <ShareIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={
              <div className='d-flex m-auto' style={{ justifyContent: 'space-between' }}>
                <span className='drawer-text'>Shared</span>
                {notes ? (<div className='badge'>
                  <div style={{marginTop: '1px'}}>{notes.filter(note => note.shared === true).length}</div>
                </div>) : ''}
              </div>
            } />
          </ListItem> 

          <ListItem className="drawer-list" onClick={() => logMeOut()} button key={"Logout"}>
            <ListItemIcon>
              <LogoutIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={<span className='drawer-text'>Logout</span>} />
          </ListItem>
          <ListItem className="drawer-list" onClick={() => setPopUp(true)} button key={"Feedback"}>
            <ListItemIcon>
              <InfoOutlinedIcon style={{fontSize: '1.6rem', marginLeft: '14px'}}/>
            </ListItemIcon>
            <ListItemText disableTypography className='menu-text' primary={<span className='drawer-text'>Feedback</span>} />
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
      <AppBar style={isAuthenticated ? { background: '#fff', boxShadow: 'none', minHeight: '68px' } : { background: MainAccent}} position="fixed">
        <Toolbar style={{ marginTop: '6px' }}>
          {isAuthenticated ? (
            <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon style={{color: '#000'}} />
          </IconButton>
          ) : ''}
          <Typography
          style={isAuthenticated ? {color: '#000'} : {color: '#fff'}}
            className='app-header'
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            NotesBucket
          </Typography>
          {isAuthenticated ?
          (<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              name='search'
              style={{color: '#000', fontWeight: 500, lineHeight: '4.2'}}
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>) : (
            <div className='app-header d-block d-sm-none d-md-none d-lg-none d-xl-none css-dudo9s-MuiTypography-root' style={{color: '#fff'}}>
              NotesBucket
            </div>
          ) }
        </Toolbar>
        <Drawer
            anchor="left"
            open={drawer}
            PaperProps={ {style: { borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}}
            onClose={toggleDrawer(false)}>
            <MenuList />
        </Drawer>
      </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar;