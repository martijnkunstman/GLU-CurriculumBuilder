import React from 'react';
import './Planning.css';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes.js'
import Project from '../Project/Project';

export default function Week(props) {

  
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PROJECT,
    drop: () => ({ id: props.id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#ffffff'
  if (props.holiday === "") {
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }
  }

  return (
    <div ref={drop} className="week" style={{ backgroundColor }}>
      <div className="weekTitle">{props.name}</div><div style={{ textAlign: "center" }}>{props.holiday}</div>
      {props.projects.filter((project) => project.planning[0].weeks[0] === props.week).map((project) => (
        <Project
          id={project.id}
          key={project.id}
          title={project.title}
          description={project.description}
          properties={project.properties}
          findTypeOfProperty={props.findTypeOfProperty}
          removePropertyTypeFromProject={props.removePropertyTypeFromProject}
        />
      ))}
    </div>
  );
}
