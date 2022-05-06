import React from 'react';
import './Planning.css';
import Project from '../Project/Project';

export default function Week(props) {

  console.log(props.projects);
  
  return (
    <div className="week">
      <div className="weekTitle">{props.name}</div><div style={{ textAlign: "center" }}>{props.holiday}</div>
      {props.projects.filter((project) => project.planning.length).filter((project) => project.filter((project) => project.planning.week === props.week)).map((project) => (
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
