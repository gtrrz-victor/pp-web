import * as React from 'react';
import { Alert, Container, Grid, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import MembersTable from './components/MembersTable';
import MatchesTable from './components/MatchesTable';
import { tournamentServiceFactory } from './services/Tournament';
import { Group } from './dto/Group';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3gA8TtmNHgpuqg1r2zUiGtTu1ryuzSUY",
  authDomain: "pp-tournament-d4461.firebaseapp.com",
  projectId: "pp-tournament-d4461",
  storageBucket: "pp-tournament-d4461.appspot.com",
  messagingSenderId: "1016290609087",
  appId: "1:1016290609087:web:98e9309f70c1a49221c30a",
  measurementId: "G-PBLJJTHJYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
analytics.app.automaticDataCollectionEnabled = true


function App() {
  const [groupVisible, setGroupVisible] = React.useState<string>("all");
  const [alerts, setAlerts] = React.useState<string[]>([]);
  const [groups, setGroups] = React.useState<Group[]>([])

  const onAddMatchResult = (err?: any) => {
    if (err !== undefined) setAlerts([`${err}`])
    else fetchData()
  }
  const changeGroupVisible = (group: string) => {
    setGroupVisible(group)
  };

  const fetchData = () => {
    try {
      tournamentServiceFactory().groups().then(setGroups).catch((err: Error) => {
        setAlerts([err.message])
      })
    } catch (err: any) {
      setAlerts([`${err}`])
    }
  }

  const removeAlert = (index: number) => {
    const newAlerts = [...alerts]
    newAlerts.splice(index, 1)
    setAlerts(newAlerts)
  }
  const parseGroupId = (groupId: string) => groupId.replace("_", " ").toUpperCase()

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{paddingBottom:40, paddingTop:40}}>
      <ResponsiveAppBar onGroupVisibleChange={changeGroupVisible} />
      <Container maxWidth="md" style={{ "paddingTop": "40px" }}>
        <Grid container spacing={2}>
          {groups.filter(group => groupVisible === 'all' || groupVisible === group.id).map((group, index) =>
            <Grid item xs={12} key={index}>
              <Stack spacing={4}>
                <h2>{parseGroupId(group.id!)}</h2>
                <h4>Current league table</h4>
                <MembersTable group={group}></MembersTable>
                <h4>Matches</h4>
                <MatchesTable group={group} cb={onAddMatchResult}></MatchesTable>
              </Stack>
            </Grid>)
          }

          {alerts.map((alert, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        removeAlert(index);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {alert}
                </Alert>
              </Grid>
            )
          })}

        </Grid>
      </Container>
    </div>
  );
}

export default App;
