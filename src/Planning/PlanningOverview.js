import React from 'react';
import './Planning.css';
import Week from './WeekOverview';


export default function PlanningOverview(props) {

  let planningData = props.planningData.cohorts[0];
  let planningConfig = props.planningData;
  let weeks = [];
  let counter = 1;

  function createPlanningMap() {
    for (let i = 0; i < planningData.schoolYearIds.length; i++) {
      let schoolYear = planningConfig.schoolYears.find(schoolYear => schoolYear.id === planningData.schoolYearIds[i]);
      weeks.push(<div className="subtitle" key={("title" + counter)}></div>);
      let start = schoolYear.quarters[0][0] - 1;
      let end = schoolYear.quarters[schoolYear.quarters.length - 1][1] + 52;
      let yearAdd = 0;
      for (let j = start; j < end; j++) {
        let holiday = findHolidays((j % 52 + 1), schoolYear.holidays);
        let week = (j % 52 + 1);
        if (j === 52) { yearAdd++ };
        let year = schoolYear.years[yearAdd];
        weeks.push(<Week removePropertyTypeFromProject={props.removePropertyTypeFromProject} year={year} week={week} name={week} holiday={holiday} key={("id" + counter)} style={{ width: "80px" }} ></Week>);
        counter++;
      }
    }
  }

  function findHolidays(week, holidays) {
    for (let i = 0; i < holidays.length; i++) {
      for (let j = 0; j < holidays[i].weeks.length; j++) {
        if (week === holidays[i].weeks[j]) {
          return " ";
        }
      }
    }
    return "";
  }

  createPlanningMap();


  return (
    <div className="PlanningOverview">
      {weeks}
    </div>
  );
}
