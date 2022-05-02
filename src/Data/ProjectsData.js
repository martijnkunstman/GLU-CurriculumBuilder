let ProjectsData = [
    {
      id: 1,
      title: 'Project 1',
      discription: 'desc',
      properties: [],
      planning: [{year:2022, weeks:[35]}]
    },
    {
      id: 2,
      title: 'Project 2',
      discription: 'desc',
      properties: [
        { id: 1, typeId: 2 },
        { id: 2, typeId: 1 },
      ],
      planning: [{year:2023, weeks:[37, 38]}]
    },
    {
      id: 3,
      title: 'Project 3',
      discription: 'desc',
      properties: [
        { id: 1, typeId: 1 },
        { id: 2, typeId: 2 },
      ],
      planning: []
    },
  ];  

  export { ProjectsData };