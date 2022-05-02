import React from 'react';
import PropertyType from './PropertyType';
import './Properties.css';

export default function Property(props) {
  return (
    <div className="property">
      <div className="title">{props.property.title}</div>
      {props.property.types.map((propertyType) => (
        <PropertyType key={propertyType.id} propertyId={props.property.id} propertyType={propertyType} addPropertyTypeToProject={props.addPropertyTypeToProject} />
      ))}
    </div>
  );
}
