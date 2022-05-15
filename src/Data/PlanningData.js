let PlanningData = {
  "schoolYears": [{
    "id": 1,
    "years": [2022, 2023],
    "quarters": [
      [35, 44],
      [45, 4],
      [5, 15],
      [16, 26]
    ],
    "holidays": [{
      "id": 1,
      "weeks": [43]
    }, {
      "id": 2,
      "weeks": [52, 1]
    }, {
      "id": 3,
      "weeks": [9]
    }, {
      "id": 4,
      "weeks": [18]
    }]
  }, {
    "id": 2,
    "years": [2023, 2024],
    "quarters": [
      [35, 44],
      [45, 4],
      [5, 15],
      [16, 27]
    ],
    "holidays": [{
      "id": 1,
      "weeks": [43]
    }, {
      "id": 2,
      "weeks": [52, 1]
    }, {
      "id": 3,
      "weeks": [9]
    }, {
      "id": 4,
      "weeks": [18, 19]
    }]
  }, {
    "id": 3,
    "years": [2024, 2025],
    "quarters": [
      [35, 45],
      [46, 5],
      [6, 18],
      [19, 28]
    ],
    "holidays": [{
      "id": 1,
      "weeks": [44]
    }, {
      "id": 2,
      "weeks": [52, 1]
    }, {
      "id": 3,
      "weeks": [9]
    }, {
      "id": 4,
      "weeks": [17, 18]
    }]
  }],

  "holidays": [{
    "id": 1,
    "name": "Herfst-vakantie"
  }, {
    "id": 2,
    "name": "Kerst-vakantie"
  }, {
    "id": 3,
    "name": "Voorjaars-vakantie"
  }, {
    "id": 4,
    "name": "Mei-vakantie"
  }],

  "types": [{
    "id": 1,
    "name": "Project"
  }, {
    "id": 2,
    "name": "Intermediate"
  }, {
    "id": 3,
    "name": "Internship"
  }, {
    "id": 4,
    "name": "Pre-exams"
  }, {
    "id": 5,
    "name": "Exams"
  }, {
    "id": 6,
    "name": "Holiday"
  }],

  "cohorts": [{
    "id": 1,
    "cohort": "2022-2023",
    "schoolYearIds": [1, 2, 3]
  }]
}

export { PlanningData };