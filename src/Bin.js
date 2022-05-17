import React from 'react';
import './App.css';
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

export default function Bin(props) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.PROJECTPROPERTY, ItemTypes.PROJECT],
    drop: () => ({ id: props.id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#ffffff'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <Button ref={drop} fullWidth={true} style={{justifyContent: "flex-start", backgroundColor}} variant="text" startIcon={<DeleteIcon />}>Delete</Button>

  );
}
