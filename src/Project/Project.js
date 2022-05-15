import React, { useContext } from 'react';
import './Project.css';
import Property from './Property';
import { appContext } from '../App';
import { useDrop } from 'react-dnd'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../ItemTypes.js'

export default function Project(props) {
  const { removeProject, planProject, unplanProject, changeDuration, changeTitleOfProject } = useContext(appContext);

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
      else {
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
  let backgroundColor = '';
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  let tempWidth = props.planning.durationWeeks * 60;
  if (props.planning.durationWeeks > 1) {
    tempWidth = tempWidth + (props.planning.durationWeeks - 1) * 6;
  }
  let width = (tempWidth + 2) + "px";

  function attachRef(el) {
    drag(el)
    drop(el)
  }

  function durationMinus() {
    if (props.planning.durationWeeks > 1) {
      changeDuration(props.id, props.planning.durationWeeks - 1);
    }
  }

  function durationPlus() {
    changeDuration(props.id, props.planning.durationWeeks + 1);
  }

  const editTitle = (e) => {
    console.log(e.target.value);
    changeTitleOfProject(props.id, e.target.value);
  }

  function showInfo() {
    //
  }

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div className={"Project type" + props.planning.type} ref={attachRef} style={{ backgroundColor, opacity, width }}>
      <input className="title" onChange={editTitle} type="text" defaultValue={props.title} />
      {props.planning.type === 1 &&
        <div className="properties">
          {props.properties.map((property) => (
            <Property key={property.id + "-" + property.typeId} projectId={props.id} property={property} />
          ))}
        </div>
      }
      {props.planning.durationWeeks > 1 &&
        <div onClick={durationMinus} className="durationMinus">&lt;</div>
      }
      {props.planning.type === 1 &&
        <div onClick={durationPlus} className="durationPlus">&gt;</div>
      }
      {props.planning.type === 1 &&
        <div onClick={showInfo} className="info">i</div>
      }
    </div>
  );
}
