import React from 'react';
import './Project.css';

export default function ProjectOverview(props) {

  let backgroundColor = '';  

  let tempWidth = props.planning.durationWeeks * 18;
  if (props.planning.durationWeeks > 1) {
    tempWidth = tempWidth + (props.planning.durationWeeks - 1) * 6;
  }
  let width = (tempWidth + 2) + "px";

  return (
    <div className={"Project type" + props.planning.type} style={{ backgroundColor, width }}>
    </div>
  );
}
