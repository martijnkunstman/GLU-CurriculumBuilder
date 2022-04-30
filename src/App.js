import React, { useState } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Project from './Project/Project';
import Properties from './Properties/Properties';
import Bin from './Bin';
import './App.css';

let propertiesData = [
  {
    id: 1,
    title: 'Phases',
    discription: '',
    types: [
      {
        id: 1,
        title: 'Introduction',
        discription: '',
        icon: 'temperature-empty',
      },
      {
        id: 2,
        title: 'Essentials',
        discription: '',
        icon: 'temperature-quarter',
      },
      {
        id: 3,
        title: 'Basics',
        discription: '',
        icon: 'temperature-half',
      },
      {
        id: 4,
        title: 'Discover',
        discription: '',
        icon: 'temperature-three-quarters',
      },
      {
        id: 5,
        title: 'Internship',
        discription: '',
        icon: 'temperature-full',
      },
    ],
  },
  {
    id: 2,
    title: 'Composition',
    discription: '',
    types: [
      {
        id: 1,
        title: 'Individual',
        discription: '',
        icon: 'user',
      },
      {
        id: 2,
        title: 'Groups formed by students',
        discription: '',
        icon: 'users',
      },
      {
        id: 3,
        title: 'Groups formed by teachers',
        discription: '',
        icon: 'users-gear',
      },
    ],
  },
];

let projectsData = [
  {
    id: 1,
    title: 'Project 1',
    discription: 'desc',
    properties: [

    ],
  },
  {
    id: 2,
    title: 'Project 2',
    discription: 'desc',
    properties: [
      { id: 1, typeId: 2 },
      { id: 2, typeId: 1 },
    ],
  },
  {
    id: 3,
    title: 'Project 3',
    discription: 'desc',
    properties: [
      { id: 1, typeId: 1 },
      { id: 2, typeId: 2 },
    ],
  },
];


export default function App() {
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
  function removePropertyTypeFromProject(propertyId, typeId, projectId){
    let projectsDataTemp = [...projectsData];
    projectsDataTemp.find((x) => x.id === projectId).properties = projectsDataTemp.find((x) => x.id === projectId).properties.filter((x) => x.id!== propertyId || x.typeId!== typeId);
    setProjects(projectsDataTemp);
  }
  function findPropertyTypeInProject(propertyId, typeId, projectId) {
    return projectsData
      .find((x) => x.id === projectId)
      .properties.find((x) => x.id === propertyId && x.typeId === typeId);
  }

  return (
    <div style={{ display: 'flex' }}>
      <DndProvider backend={HTML5Backend}>
        <div>
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
        <div>
          <Properties propertiesData={propertiesData} addPropertyTypeToProject={addPropertyTypeToProject} />
        </div>
      </DndProvider>
    </div>
  );
}