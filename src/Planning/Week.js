import React, { useContext } from 'react';
import './Planning.css';
import { appContext } from '../App';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes.js'
import Project from '../Project/Project';

export default function Week(props) {
  const { projects } = useContext(appContext);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PROJECT,
    drop: () => ({ id: "week", year: props.year, week: props.week }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = "rgba(0,0,0,0.1)"; 
  if (props.holiday === "") {
    backgroundColor = "rgba(255,255,255,0.5)";
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }
  }

  return (
    <div ref={drop} className="week" style={{ backgroundColor }}>
      <div className="weekTitle">{props.name}</div><div style={{ textAlign: "center" }}>{props.holiday}</div>
      {projects.filter((project) => project.planning.startWeek === props.week && project.planning.year === props.year).map((project) => (
        <Project
          id={project.id}
          key={project.id}
          title={project.title}
          planning={project.planning}
          description={project.description}
          properties={project.properties}
        />
      ))}
    </div>
  );
}
