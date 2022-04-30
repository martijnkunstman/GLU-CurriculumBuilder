import React from 'react';
import Property from './Property';
import './App.css';

export default function Properties(props) {
  return (
    <div className="Properties">
      {props.propertiesData.map((property) => (
        <Property
          key={property.id}
          property={property}
          addPropertyTypeToProject={props.addPropertyTypeToProject} 
        />
      ))}
    </div>
  );
}
