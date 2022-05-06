import React from 'react';
import './Planning.css';
import Project from '../Project/Project';

export default function Week(props) { 
  return (
    <div className="week">
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
