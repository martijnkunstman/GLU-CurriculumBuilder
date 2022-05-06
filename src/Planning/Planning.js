import React from 'react';
import './Planning.css';
import Week from './Week';


export default function Planning(props) {
    
    let planningData = props.planningData.cohorts[0];
    let planningConfig = props.planningData;
    let weeks = [];
    let quarterNow = 0;
    let counter = 1;

  function createPlanningMap() {
    for (let i = 0; i < planningData.schoolYearIds.length; i++) {
      let schoolYear = planningConfig.schoolYears.find(schoolYear => schoolYear.id === planningData.schoolYearIds[i]);
      weeks.push(<div className="subtitle" key={("title" + counter)}>Leerjaar {(i + 1)} - {schoolYear.years.join("-")} </div>);
      let start = schoolYear.quarters[0][0] - 1;
      let end = schoolYear.quarters[schoolYear.quarters.length - 1][1] + 52;
      for (let j = start; j < end; j++) {
        let quarter = findQuarterByWeek((j % 52 + 1), schoolYear.quarters, i);
        let holiday = findHolidays((j % 52 + 1), schoolYear.holidays);
        let quarterText = "";
        if (quarter !== quarterNow) {
          quarterNow++;
          quarterText = " - P" + quarter + "";
        }
        weeks.push(<Week findTypeOfProperty={props.findTypeOfProperty} removePropertyTypeFromProject={props.removePropertyTypeFromProject} projects={props.projects} year={schoolYear.years} week={(j % 52 + 1)} name={(j % 52 + 1) + quarterText } holiday={holiday} key={("id" + counter)} style={{ width: "80px" }} ></Week>);
        counter++;
        //app.innerHTML += '<div id="syid-'+planningData.schoolYearIds[i]+'|w-'+(j % 52 + 1)+'" class="scedule-item" style="width:80px;" data-week="' + (j % 52 + 1) + '" data-schoolyearId="' + planningData.schoolYearIds[i] + '" data-quarter="' + quarter + '"><div class="scedule-item-week">' + (j % 52 + 1) + quarterText + '</div><div class="scedule-item-holiday">' + holiday + '</div></div>';
      }
    }
  }

  function findHolidays(week, holidays) {
    for (let i = 0; i < holidays.length; i++) {
      for (let j = 0; j < holidays[i].weeks.length; j++) {
        if (week === holidays[i].weeks[j]) {
          ;
          return planningConfig.holidays.find(x => x.id === holidays[i].id).name;
        }
      }
    }
    return "";
  }

  function findQuarterByWeek(week, quarters, year) {
    for (let i = 0; i < quarters.length; i++) {
      if (week >= quarters[i][0] && week <= quarters[i][1]) {
        return (i + 1 + year * 4);
      }
    }
    return (2 + year * 4);
  }


  createPlanningMap();


  return (
    <div className="Planning">
      {weeks}
    </div>
  );
}
