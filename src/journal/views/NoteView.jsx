import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import {
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/journal/journalThunks';
import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
  const dispatch = useDispatch();

  const { active, messageSaved, isSaving } = useSelector((state) => state.journal);

  const { title, body, date, onInputChange, formState } = useForm(active);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  //Cuando cualquier propiedad del formstate cambia
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length >= 1) {
      Swal.fire('Nota actualizada!', messageSaved, 'success');
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={28} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item my={2}>
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button onClick={onSaveNote} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Título"
          sx={{ mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          multiline
          minRows={5}
          placeholder="¿Qué sucedió hoy?"
          label="Descripción"
          sx={{ mb: 1 }}
          name="body"
          value={body}
          onChange={onInputChange}
        />

        <Grid container justifyContent="end">
          <Button
            onClick={onDelete}
            startIcon={<DeleteOutline />}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </Grid>
      </Grid>

      <ImageGallery images={active.imageUrls} />
    </Grid>
  );
};
