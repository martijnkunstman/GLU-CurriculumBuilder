import React, { useContext } from 'react';
import './Project.css';
import Property from './Property';
import { appContext } from '../App';
import { useDrop } from 'react-dnd'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../ItemTypes.js'

export default function Project(props) {
  const { removeProject, planProject, unplanProject } = useContext(appContext);
   
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PROJECT,
    item: props,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (dropResult.id === "bin") {
          removeProject(item.id);
        }
        else {
          if (dropResult.id === "week") {
            planProject(item.id, dropResult.year, dropResult.week);
          }
        }
      } 
      else
      {
        unplanProject(item.id);
      }     
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  })) 
  
  
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PROPERTY,
    drop: () => ({ id: props.id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#ffffff'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  let width = (props.planning[0].weeks.length * 50) + "px";

  function attachRef(el) {
    drag(el)
    drop(el)
  }
  
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div className="Project" ref={attachRef} style={{backgroundColor, opacity, width}}>
      <div className="title">{props.title}</div>
      <div className="properties">
        {props.properties.map((property) => (
          <Property key={property.id+"-"+property.typeId} projectId={props.id} property={property} />
        ))}
      </div>
    </div>
  );
}
