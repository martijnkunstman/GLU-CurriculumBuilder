import React from 'react';
import './Planning.css';

export default function Week(props) {
  return (
    <div className="week"><div className="weekTitle">{props.name}</div><div style={{textAlign:"center"}}>{props.holiday}</div></div>
  );
}
