import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './';

export const SideBar = ({ drawerWidth }) => {
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);

  // useEffect(() => {
  //     fetch(photoURL).then((resp) => {
  //         console.log(resp);
  //     });
  // }, [photoURL]);

  return (
    <Box
      component="nav"
      sx={{
        width: {
          sm: drawerWidth,
        },
        flexShrink: {
          sm: 0,
        },
      }}
    >
      <Drawer
        variant="permanent" //temporary
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <Toolbar>
          <Box display="flex" gap={1} alignItems="center">
            <AccountCircle color="primary" />
            <Typography variant="h6" noWrap>
              {displayName}
            </Typography>
          </Box>
          {/* <img src={photoURL} alt="" /> */}
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
