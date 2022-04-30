import React from 'react';
import './style.css';

export default function Property(props) {
  return (
    <div className="property">
      <div className="title">{props.property.title}</div>
      {props.property.types.map((propertyType) => (
        <div key={propertyType.id} className="type">
          <div>{propertyType.title}</div>
          <img
            style={{ height: '24px', width: '24px' }}
            src={'./svg/' + propertyType.icon + '-solid.svg'}
          ></img>
        </div>
      ))}
    </div>
  );
}
