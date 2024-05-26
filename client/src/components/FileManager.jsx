import React, { useState, useEffect, useCallback } from 'react';
import { Button, TextField, List, ListItem, ListItemText, IconButton, Typography, Box, Paper } from '@mui/material';
import { Delete, Folder, FolderOpen } from '@mui/icons-material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const FileManager = () => {
  const [directories, setDirectories] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [isDirectory, setIsDirectory] = useState(false);
  const location = useLocation();
  const { fullName } = location.state || {};
  const token = localStorage.getItem('token');

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: newItemName,
      isDirectory,
      isOpen: false,
      children: isDirectory ? [] : null
    };

    setDirectories([...directories, newItem]);
    setNewItemName('');
  };

  const handleDeleteItem = (id) => {
    setDirectories(directories.filter(item => item.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(directories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDirectories(items);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const data = new FormData();
    acceptedFiles.forEach(file => {
      data.append('file', file);
    });

    axios.post('http://localhost:8000/upload/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('File uploaded successfully', response.data);
      fetchFiles();
    })
    .catch(error => {
      console.error('Error uploading file', error);
    });
  }, [token]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const fetchFiles = () => {
    axios.get('http://localhost:8000/files/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setDirectories(response.data.user_files);
      // Add shared files as a special directory
      setDirectories(prevDirs => [
        ...prevDirs,
        { id: 'shared', name: 'Shared', isDirectory: true, isOpen: false, children: response.data.shared_files }
      ]);
    })
    .catch(error => {
      console.error('Error fetching files', error);
    });
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const renderDirectory = (dir, index) => (
    <Draggable key={dir.id} draggableId={dir.id} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          component={Paper}
          sx={{ mb: 1 }}
        >
          <ListItemText primary={dir.name} />
          <IconButton onClick={() => handleDeleteItem(dir.id)}>
            <Delete />
          </IconButton>
          {dir.isDirectory && (
            <IconButton onClick={() => setDirectories(directories.map(d => d.id === dir.id ? { ...d, isOpen: !d.isOpen } : d))}>
              {dir.isOpen ? <FolderOpen /> : <Folder />}
            </IconButton>
          )}
          {dir.isDirectory && dir.isOpen && dir.children && (
            <List sx={{ pl: 4 }}>
              {dir.children.map((child, idx) => renderDirectory(child, idx))}
            </List>
          )}
        </ListItem>
      )}
    </Draggable>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        File Manager
      </Typography>
      <Box {...getRootProps()} sx={{ border: '2px dashed gray', padding: '20px', marginBottom: '20px' }}>
        <input {...getInputProps()} />
        {
          isDragActive ?
          <Typography variant="body1">Drop the files here ...</Typography> :
          <Typography variant="body1">Drag 'n' drop some files here, or click to select files</Typography>
        }
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={() => setIsDirectory(false)}>
          Add File
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setIsDirectory(true)}>
          Add Directory
        </Button>
        <Button variant="contained" onClick={handleAddItem}>
          Add Item
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="directories">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps} sx={{ width: '100%' }}>
              {directories.map((dir, index) => renderDirectory(dir, index))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default FileManager;
