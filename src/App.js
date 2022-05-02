import React, { useState } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Project from './Project/Project';
import Properties from './Properties/Properties';
import Bin from './Bin';
import './App.css';
import { ProjectsData } from './Data/ProjectsData';
import { PropertiesData } from './Data/PropertiesData';

export default function App() {

  let projectsData = ProjectsData;
  let propertiesData = PropertiesData;

  const [projects, setProjects] = useState(projectsData);

  function findTypeOfProperty(typeId, propertyId) {
    return propertiesData
      .find((x) => x.id === propertyId)
      .types.find((x) => x.id === typeId);
  }
  function addPropertyTypeToProject(propertyId, typeId, projectId) {
    if (!findPropertyTypeInProject(propertyId, typeId, projectId)) {
      let projectsDataTemp = [...projectsData];
      projectsDataTemp.find((x) => x.id === projectId).properties.push({ id: propertyId, typeId: typeId });
      setProjects(projectsDataTemp);
    }
  }
  function removePropertyTypeFromProject(propertyId, typeId, projectId) {
    let projectsDataTemp = [...projectsData];
    projectsDataTemp.find((x) => x.id === projectId).properties = projectsDataTemp.find((x) => x.id === projectId).properties.filter((x) => x.id !== propertyId || x.typeId !== typeId);
    setProjects(projectsDataTemp);
  }
  function findPropertyTypeInProject(propertyId, typeId, projectId) {
    return projectsData
      .find((x) => x.id === projectId)
      .properties.find((x) => x.id === propertyId && x.typeId === typeId);
  }

  return (
    <DndProvider backend={HTML5Backend}>
        <div className="AppContainer">
        <div className='ProjectContainer'>
          {projects.map((project) => (
            <Project
              id={project.id}
              key={project.id}
              title={project.title}
              description={project.description}
              properties={project.properties}
              findTypeOfProperty={findTypeOfProperty}
              removePropertyTypeFromProject={removePropertyTypeFromProject}
            />
          ))}
          <Bin id="bin"></Bin>
        </div>
        <div className='PlanningContainer'>
          b
        </div>
        <div className='PropertiesContainer'>
          <Properties propertiesData={propertiesData} addPropertyTypeToProject={addPropertyTypeToProject} />
        </div>
        </div>
    </DndProvider>
  );
}