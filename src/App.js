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
import { v4 as uuidv4 } from 'uuid';

export const appContext = createContext();

export default function App() {

  let projectsData = ProjectsData;
  let propertiesData = PropertiesData;
  let planningData = PlanningData;

  const [projects, setProjects] = useState([...projectsData]);

  function addProject() {
    let id = uuidv4();
    let project = {
      id: id,
      title: 'Project ' + id.substr(0, 8),
      discription: 'desc',
      properties: [{ id: 1, typeId: 2 }],
      planning: [{ year: 0, weeks: [] }]
    };
    setProjects(previousState => [...previousState, project])
  }

  function removeProject(id) {
    setProjects(previousState => {
      return previousState.filter(project => project.id !== id)
    })
  }

  function unplanProject(id) {
    setProjects(previousState => {
      let project = previousState.find(project => project.id === id);
      project.planning = [{ year: 0, weeks: [] }];
      return [...previousState]
    })
  }

  function planProject(id, year, week) {
    setProjects(previousState => {
      let project = previousState.find(project => project.id === id);
      project.planning = [{ year: year, weeks: [week] }];
      return [...previousState]
    })
  }

  function findTypeOfProperty(typeId, propertyId) {
    return propertiesData
      .find((x) => x.id === propertyId)
      .types.find((x) => x.id === typeId);
  }

  function addPropertyTypeToProject(propertyId, typeId, projectId) {
    setProjects(previousState => {
      if (!findPropertyTypeInProject(previousState, propertyId, typeId, projectId)) {
        previousState.find(x => x.id === projectId).properties.push({ id: propertyId, typeId: typeId });
        return [...previousState];
      }
      else {
        return [...previousState];
      }
    })
  }

  function removePropertyTypeFromProject(propertyId, typeId, projectId) {
    setProjects(previousState => {
      previousState.find(x => x.id === projectId).properties = previousState.find(x => x.id === projectId).properties.filter((x) => x.id !== propertyId || x.typeId !== typeId);
      return [...previousState];
    })
  }

  function findPropertyTypeInProject(projects, propertyId, typeId, projectId) {
    return projects
      .find(x => x.id === projectId)
      .properties.find(x => x.id === propertyId && x.typeId === typeId);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="AppContainer">
        <div className='ProjectContainer Window'>
          Projects
          <appContext.Provider value={{ findTypeOfProperty, removePropertyTypeFromProject, removeProject, planProject, unplanProject }}>
            {projects.filter((project) => project.planning[0].weeks.length === 0 && project.planning[0].year === 0).map((project) => (
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
          <appContext.Provider value={{ projects, findTypeOfProperty, removePropertyTypeFromProject, removeProject, planProject, unplanProject }}>
            <Planning planningData={planningData} ></Planning>
          </appContext.Provider>
        </div>
        <div className='PropertiesContainer Window'>
          Properties
          <appContext.Provider value={{ addPropertyTypeToProject }}>
            <Properties propertiesData={propertiesData} />
          </appContext.Provider>
        </div>
      </div>
    </DndProvider >
  );
}