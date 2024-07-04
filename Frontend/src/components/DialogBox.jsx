
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, putMovie } from '../redux/movieSlice';

const DialogBox = ({ open, setOpen, editMovie, setEditMovie }) => {
    const dispatch = useDispatch()
    const { movies } = useSelector((state) => state.movies);
    const { edit, ...rest } = editMovie;
    const getMovie = movies?.filter((item) => item.id === editMovie.id)?.[0]
    const [formData, setFormData] = useState({});
    console.log(formData)

    useEffect(() => {
        if (editMovie.edit) {
            setFormData(getMovie);
        } else {
            setFormData({
                title: '',
                description: '',
                year: '',
                genre: '',
            })
        }
    }, [editMovie.edit]);

    const handleClose = () => {
        setOpen(false);
        setEditMovie({ edit: false, ...rest });
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    const handleAddMovie = async () => {
        if (editMovie.edit) {
            dispatch(putMovie(formData, editMovie.id));
        } else {
            dispatch(addMovie(formData));
            setFormData({ title: '', description: '',year: '', genre: '' }); // Clear form data
        }
        handleClose();
    };

    return (
        <Dialog open={open || editMovie.edit} onClose={handleClose}>
            <DialogTitle>Add New Movie</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    fullWidth
                    value={formData?.title || ''}
                    onChange={handleChange}
                    name="title"
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    value={formData?.description || ''}
                    onChange={handleChange}
                    name="description"
                />
                <TextField
                    margin="dense"
                    label="Release Year"
                    fullWidth
                    value={formData?.year || ''}
                    onChange={handleChange}
                    name="year"
                />
                <TextField margin="dense" label="Genre" fullWidth value={formData?.genre || ''} onChange={handleChange} name="genre" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAddMovie} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox