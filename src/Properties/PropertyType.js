import React, { useContext } from 'react';
import { appContext } from '../App';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../ItemTypes.js'
import './Properties.css';

export default function PropertyType(props) {
  
  
  const { addPropertyTypeToProject } = useContext(appContext);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PROPERTY,
    item: props,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        addPropertyTypeToProject(item.propertyId, item.propertyType.id, dropResult.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} key={props.propertyType.id} style={{ opacity }} className="type">
      <div>{props.propertyType.title}</div>
      <img alt=""
        style={{ height: '24px', width: '24px' }}
        src={'./svg/' + props.propertyType.icon + '-solid.svg'}
      ></img>
    </div>
  );
}
