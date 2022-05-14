import React, { useContext } from 'react';
import './Planning.css';
import { appContext } from '../App';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes.js'
import Project from '../Project/Project';

export default function Week(props) {
  const { projects} = useContext(appContext);
  
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PROJECT,
    drop: () => ({ id: "week", year: props.year[0], week: props.week }),
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
      {projects.filter((project) => project.planning[0].weeks[0] === props.week && project.planning[0].year === props.year[0]).map((project) => (
        <Project
          id={project.id}
          key={project.id}
          title={project.title}
          description={project.description}
          properties={project.properties}
        />
      ))}
    </div>
  );
}
