import React from 'react';
import './App.css';
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

export default function Project(props) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
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
    <div className="Project" ref={drop} style={{backgroundColor}}>
      <div className="title">{props.title}</div>
      <div className="properties">
        {props.properties.map((property) => (
          <div className="property" key={property.id+"-"+property.typeId}>
            <img
              style={{ height: '24px', width: '24px' }}
              src={
                './svg/' +
                props.findTypeOfProperty(property.typeId, property.id).icon +
                '-solid.svg'
              }
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
}
