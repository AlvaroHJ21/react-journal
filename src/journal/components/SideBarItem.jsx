import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import {
  Box,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';
import { TurnedIn } from '@mui/icons-material';

export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  }, [title]);

  const onSelectNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onSelectNote}>
        <Box mr={2}>
          <TurnedIn color="primary" />
        </Box>
        <ListItemText primary={newTitle} secondary={body} />
      </ListItemButton>
    </ListItem>
  );
};
