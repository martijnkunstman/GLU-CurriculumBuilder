import React, { useContext } from 'react';
import './Project.css';
import { appContext } from '../App';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../ItemTypes.js'

export default function Property(props) {
  const { removePropertyTypeFromProject, findTypeOfProperty } = useContext(appContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PROJECTPROPERTY,
    item: props,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        removePropertyTypeFromProject(item.property.id, item.property.typeId, item.projectId);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} className="property" style={{ opacity }} key={props.property.id + "-" + props.property.typeId}>
      <img alt=""
        style={{ height: '24px', width: '24px' }}
        src={
          './svg/' +
          findTypeOfProperty(props.property.typeId, props.property.id).icon +
          '-solid.svg'
        }
      ></img>
    </div>
  );
}
