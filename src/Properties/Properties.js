import React from 'react';
import Property from './Property';
import './Properties.css';

export default function Properties(props) {
  return (
    <div className="Properties">
      {props.propertiesData.map((property) => (
        <Property
          key={property.id}
          property={property}          
        />
      ))}
    </div>
  );
}
