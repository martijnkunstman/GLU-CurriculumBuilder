import React from 'react';
import './Project.css';
import Property from './Property';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes.js'

export default function Project(props) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PROPERTY,
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
  //show project at week position absolute....
  return (
    <div className="Project" ref={drop} style={{backgroundColor}}>
      <div className="title">{props.title}</div>
      <div className="properties">
        {props.properties.map((property) => (
          <Property removePropertyTypeFromProject={props.removePropertyTypeFromProject} key={property.id+"-"+property.typeId} findTypeOfProperty={props.findTypeOfProperty} projectId={props.id} property={property} />
        ))}
      </div>
    </div>
  );
}
