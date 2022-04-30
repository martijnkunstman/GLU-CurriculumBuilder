import React from 'react';
import './App.css';

export default function Project(props) {
  return (
    <div className="Project">
      <div className="title">{props.title}</div>
      <div className="properties">
        {props.properties.map((property) => (
          <div className="property" key={property.id}>
            <img
              style={{ height: '24px', width: '24px' }}
              src={
                './svg/' +
                props.findTypeOfProperty(property.typeId, property.id).icon +
                '-solid.svg'
              }
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
}
