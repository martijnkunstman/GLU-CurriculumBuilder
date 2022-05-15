import React, { useContext } from 'react';
import './Planning.css';
import { appContext } from '../App';
import ProjectOverview from '../Project/ProjectOverview';

export default function WeekOverview(props) {
  const { projects } = useContext(appContext);


  let backgroundColor = "rgba(0,0,0,0.1)";
  if (props.holiday === "") {
    backgroundColor = "rgba(255,255,255,0.5)";
  }

  return (
    <div className="week" style={{ backgroundColor }}>
      {projects.filter((project) => project.planning.startWeek === props.week && project.planning.year === props.year).map((project) => (
        <ProjectOverview
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
