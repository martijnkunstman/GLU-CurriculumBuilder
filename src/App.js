import React, { useState, createContext } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Project from './Project/Project';
import Properties from './Properties/Properties';
import Planning from './Planning/Planning';
import Bin from './Bin';
import './App.css';
import { ProjectsData } from './Data/ProjectsData';
import { PropertiesData } from './Data/PropertiesData';
import { PlanningData } from './Data/PlanningData';
import { v4 as uuidv4 } from 'uuid';
import PlanningOverview from './Planning/PlanningOverview';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotesIcon from '@mui/icons-material/Notes';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from "@mui/material/ToggleButton";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';


export const appContext = createContext();

export default function App() {

  let projectsData = ProjectsData;
  let propertiesData = PropertiesData;
  let planningData = PlanningData;

  const [projects, setProjects] = useState([...projectsData]);


  function addProject() {
    addProjectWithType(1);
  }
  function addBreak() {
    addProjectWithType(2);
  }

  function addProjectWithType(type) {
    let id = uuidv4();
    let project = {
      id: id,
      title: 'Project ' + id.substr(0, 8),
      discription: 'desc',
      properties: [{ id: 1, typeId: 2 }],
      planning: { year: 0, startWeek: 0, type: type, durationWeeks: 1 }
    };
    setProjects(previousState => [...previousState, project])
  }

  function removeProject(id) {
    setProjects(previousState => {
      return previousState.filter(project => project.id !== id)
    })
  }

  function unplanProject(id) {
    setProjects(previousState => {
      let project = previousState.find(project => project.id === id);
      project.planning.year = 0;
      project.planning.startWeek = 0;
      project.planning.durationWeeks = 1;
      return [...previousState];
    })
  }

  function changeDuration(id, duration) {
    setProjects(previousState => {
      let project = previousState.find(project => project.id === id);
      project.planning.durationWeeks = duration;
      return [...previousState];
    })
  }

  function planProject(id, year, week) {
    setProjects(previousState => {
      let project = previousState.find(project => project.id === id);
      project.planning.year = year;
      project.planning.startWeek = week;
      return [...previousState]
    })
  }

  function findTypeOfProperty(typeId, propertyId) {
    return propertiesData
      .find((x) => x.id === propertyId)
      .types.find((x) => x.id === typeId);
  }

  function addPropertyTypeToProject(propertyId, typeId, projectId) {
    setProjects(previousState => {
      if (!findPropertyTypeInProject(previousState, propertyId, typeId, projectId)) {
        previousState.find(x => x.id === projectId).properties.push({ id: propertyId, typeId: typeId });
        return [...previousState];
      }
      else {
        return [...previousState];
      }
    })
  }

  function removePropertyTypeFromProject(propertyId, typeId, projectId) {
    setProjects(previousState => {
      previousState.find(x => x.id === projectId).properties = previousState.find(x => x.id === projectId).properties.filter((x) => x.id !== propertyId || x.typeId !== typeId);
      return [...previousState];
    })
  }

  function findPropertyTypeInProject(projects, propertyId, typeId, projectId) {
    return projects
      .find(x => x.id === projectId)
      .properties.find(x => x.id === propertyId && x.typeId === typeId);
  }

  function changeTitleOfProject(id, title) {
    setProjects(previousState => {
      let project = previousState.find(project => project.id === id);
      project.title = title;
      return [...previousState];
    })
  }

  function consoleLogState() {
    console.log(projects);
  }

  //-------------------------------------

  const drawerWidth = 240;

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        [theme.breakpoints.up('sm')]: {
          width: 0,
        },
      }),
    },
  }));


  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const mdTheme = createTheme();


  const [alignment, setAlignment] = React.useState('list');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: '#rgba(255,255,255,0.5)'
    }
  });

  


  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">

          <Box>
            <AppBar position="sticky">
              <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <MenuIcon />
                </IconButton>
                GLU - Curriculum Builder
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </Box>


          <Box display="flex" flexDirection="row" overflow="hidden" height="100vh">
            <Box>
              <Button fullWidth={true} style={{ justifyContent: "flex-start" }} onClick={addProject} variant="text" startIcon={<AddIcon />}>add Project</Button>
              <Button fullWidth={true} style={{ justifyContent: "flex-start" }} onClick={addBreak} variant="text" startIcon={<AddIcon />}>add Break</Button>
              <Button fullWidth={true} style={{ justifyContent: "flex-start" }} onClick={consoleLogState} variant="text" startIcon={<NotesIcon />}>consoleLogState</Button>
              <Divider />
              <Bin id="bin"></Bin>
            </Box>

            <Box sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              overflow: 'auto',
            }}>



              <Box>
                <appContext.Provider value={{ findTypeOfProperty, removePropertyTypeFromProject, removeProject, planProject, unplanProject, changeDuration, changeTitleOfProject }}>
                  {projects.filter((project) => project.planning.startWeek === 0 && project.planning.year === 0).map((project) => (
                    <Project
                      id={project.id}
                      key={project.id}
                      title={project.title}
                      planning={project.planning}
                      description={project.description}
                      properties={project.properties}
                    />
                  ))}
                </appContext.Provider>
              </Box>

              <Box>
                <appContext.Provider value={{ projects, findTypeOfProperty, removePropertyTypeFromProject, removeProject, planProject, unplanProject, changeDuration, changeTitleOfProject }}>
                  <Planning planningData={planningData} ></Planning>
                </appContext.Provider>
              </Box>

              <Box>
                <appContext.Provider value={{ projects, findTypeOfProperty, removePropertyTypeFromProject, removeProject, planProject, unplanProject, changeDuration, changeTitleOfProject }}>
                  <PlanningOverview planningData={planningData} ></PlanningOverview>
                </appContext.Provider>
              </Box>



            </Box>

            <Box>

              <appContext.Provider value={{ addPropertyTypeToProject }}>
                <Properties propertiesData={propertiesData} />
              </appContext.Provider>

            </Box>



          </Box>




          <Box>
            <AppBar position="sticky">
              <Toolbar>Copyright 2022
                <Box sx={{ flexGrow: 1 }} />
                <ToggleButtonGroup value={alignment}
                  exclusive
                  onChange={handleAlignment}
                  aria-label="text alignment"
                >
                  <ToggleButton value="list" aria-label="list" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    <ViewListIcon />
                  </ToggleButton>
                  <ToggleButton value="module" aria-label="module" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    <ViewModuleIcon/>
                  </ToggleButton>
                  <ToggleButton value="quilt" aria-label="quilt" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    <ViewQuiltIcon />
                  </ToggleButton>
                </ToggleButtonGroup>

              </Toolbar>
            </AppBar>
          </Box>


        </Box>
      </ThemeProvider>
    </DndProvider >
  );
}