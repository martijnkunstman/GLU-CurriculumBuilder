import React from 'react';
import './App.css';
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

export default function Bin(props) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.DELETE,
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
    <div className="Bin" ref={drop} style={{backgroundColor}}>
      BIN
    </div>
  );
}
