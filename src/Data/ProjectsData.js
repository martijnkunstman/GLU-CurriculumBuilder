let ProjectsData = [
    {
      id: 1,
      title: 'Project 1',
      discription: 'desc',
      properties: [],
      planning: [{year:2022, weeks:[35, 36]}]
    },
    {
      id: 2,
      title: 'Project 2',
      discription: 'desc',
      properties: [
        { id: 1, typeId: 2 },
        { id: 2, typeId: 1 },
      ],
      planning: [{year:2022, weeks:[37]}]
    },
    {
      id: 3,
      title: 'Project 3',
      discription: 'desc',
      properties: [
        { id: 1, typeId: 1 },
        { id: 2, typeId: 2 },
      ],
      planning: [{year:2023, weeks:[39]}]
    },
    {
      id: 4,
      title: 'Project 4',
      discription: 'desc',
      properties: [
        { id: 1, typeId: 1 },
        { id: 2, typeId: 2 },
      ],
      planning: [{year:2024, weeks:[41]}]
    },
    {
      id: 5,
      title: 'Project 5',
      discription: 'desc',
      properties: [
        { id: 1, typeId: 1 },
        { id: 2, typeId: 2 },
      ],
      planning: [{year:0, weeks:[]}]
    },
  ];  

  export {ProjectsData};