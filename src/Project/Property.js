import React from 'react';
import '../App.css';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../ItemTypes.js'

export default function Property(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DELETE,
    item: props,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(item.property.id+"-"+item.property.typeId+"-"+item.projectId);
        props.removePropertyTypeFromProject(item.property.id, item.property.typeId, item.projectId);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} className="property"  style={{ opacity }} key={props.property.id+"-"+props.property.typeId}>
            <img
              style={{ height: '24px', width: '24px' }}
              src={
                './svg/' +
                props.findTypeOfProperty(props.property.typeId, props.property.id).icon +
                '-solid.svg'
              }
            ></img>
          </div>
  );
}
