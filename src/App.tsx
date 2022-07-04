import * as React from 'react';
import { Alert, Container, Grid, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import MembersTable from './components/MembersTable';
import MatchesTable from './components/MatchesTable';
import { tournamentServiceFactory  } from './services/Tournament';
import { Group } from './dto/Group';

function App() {
  const [groupVisible, setGroupVisible] = React.useState<string>("all");
  const [alerts, setAlerts] = React.useState<string[]>([]);
  const [groups, setGroups] = React.useState<Group[]>([])
  const tournament = tournamentServiceFactory()

  const changeGroupVisible = (group: string) => {
    setGroupVisible(group)
  };

  const removeAlert = (index: number) => {
    const newAlerts = [...alerts]
    newAlerts.splice(index, 1)
    setAlerts(newAlerts)
  }
  const parseGroupId= (groupId:string)=>groupId.replace("_"," ").toUpperCase()

  React.useEffect(() => {
    try {
      tournament.groups().then(setGroups).catch((err: Error) => {
        setAlerts([...alerts, err.message])
      })
    } catch (err: any) {
      setAlerts([...alerts, `${err}`])
    }
  }, [])

  return (
    <div>
      <ResponsiveAppBar onGroupVisibleChange={changeGroupVisible} />
      <Container maxWidth="md" style={{ "paddingTop": "40px" }}>
        <Grid container spacing={2}>
          {groups.filter(group=>groupVisible==='all' || groupVisible===group.id).map((group, index) =>
            <Grid item xs={12} key={index}>
              <Stack spacing={4}>
                <h2>{parseGroupId(group.id!)}</h2>
                <MembersTable group={group}></MembersTable>
                <MatchesTable group={group}></MatchesTable>
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
