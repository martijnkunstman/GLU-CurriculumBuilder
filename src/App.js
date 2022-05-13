import React, { useState, createContext } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Project from './Project/Project';
import Properties from './Properties/Properties';
import Planning from './Planning/Planning';
import Bin from './Bin';
import './App.css';
import { ProjectsData } from './Data/ProjectsData';
import { PropertiesData } from './Data/PropertiesData';
import { PlanningData } from './Data/PlanningData';

export const appContext = createContext();

export default function App() {

  let projectsData = ProjectsData;
  let propertiesData = PropertiesData;
  let planningData = PlanningData;

  const [projects, setProjects] = useState([...projectsData]);

  function findNextId(data) {
    const ids = data.map(object => {
      return object.id;
    });
    return Math.max(...ids) + 1;
  }

  function addProject() {
    let projectsDataTemp = [...projects];
    let id = findNextId(projectsDataTemp);
    projectsDataTemp.push({
      id: id,
      title: 'Project ' + id,
      discription: 'desc',
      properties: [{ id: 1, typeId: 2 }],
      planning: [{ year: 2024, weeks: [6, 9] }]
    });
    setProjects([...projectsDataTemp]);
  }

  function findTypeOfProperty(typeId, propertyId) {
    return propertiesData
      .find((x) => x.id === propertyId)
      .types.find((x) => x.id === typeId);
  }
  function addPropertyTypeToProject(propertyId, typeId, projectId) {
    if (!findPropertyTypeInProject(propertyId, typeId, projectId)) {
      let projectsDataTemp = [...projects];
      projectsDataTemp.find(x => x.id === projectId).properties.push({ id: propertyId, typeId: typeId });
      setProjects([...projectsDataTemp]);
    }
  }

  function removePropertyTypeFromProject(propertyId, typeId, projectId) {
    let projectsDataTemp = [...projects];
    projectsDataTemp.find(x => x.id === projectId).properties = projectsDataTemp.find(x => x.id === projectId).properties.filter((x) => x.id !== propertyId || x.typeId !== typeId);
    setProjects([...projectsDataTemp]);
  }

  function findPropertyTypeInProject(propertyId, typeId, projectId) {
    let projectsDataTemp = [...projects];
    return projectsDataTemp
      .find(x => x.id === projectId)
      .properties.find(x => x.id === propertyId && x.typeId === typeId);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="AppContainer">
        <div className='ProjectContainer Window'>
          Projects
          <appContext.Provider value={{ findTypeOfProperty, removePropertyTypeFromProject }}>
            {projects.map((project) => (
              <Project
                id={project.id}
                key={project.id}
                title={project.title}
                description={project.description}
                properties={project.properties}
              />
            ))}
          </appContext.Provider>
          <Bin id="bin"></Bin>
          <div className="button" onClick={addProject}>add Project</div>
          <div className="button">add Break</div>
        </div>
        <div className='PlanningContainer Window'>
          <div>Planning</div>
          <appContext.Provider value={{projects, findTypeOfProperty, removePropertyTypeFromProject }}>
            <Planning planningData={planningData} ></Planning>
          </appContext.Provider>
        </div>
        <div className='PropertiesContainer Window'>
          Properties
          <appContext.Provider value={{ addPropertyTypeToProject }}>
            <Properties propertiesData={propertiesData}/>
          </appContext.Provider>
        </div>
      </div>
    </DndProvider >
  );
}