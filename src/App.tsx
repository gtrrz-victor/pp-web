import * as React from 'react';
import { Container, Grid, Stack } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import MembersTable from './components/MembersTable';
import MatchesTable from './components/MatchesTable';

function App() {
  const [groupVisible, setGroupVisible] = React.useState<string>("All");

  const changeGroupVisible = (group: string) => {
    setGroupVisible(group)
  };

  return (
    <div >
      <ResponsiveAppBar onGroupVisibleChange={changeGroupVisible} />
      <Container maxWidth="md" style={{ "paddingTop": "40px" }}>
        <Grid container spacing={2}>
          {(groupVisible === "All" || groupVisible === "Group 1") &&
            <Grid item xs={12}>
              <Stack spacing={4}>
                <h2>Group 1</h2>
                <MembersTable group={1}></MembersTable>
                <MatchesTable group={1}></MatchesTable>
              </Stack>
            </Grid>
          }
          {(groupVisible === "All" || groupVisible === "Group 2") &&
            <Grid item xs={12}>
              <Stack spacing={4}>
                <h2>Group 2</h2>
                <MembersTable group={2}></MembersTable>
                <MatchesTable group={2}></MatchesTable>
              </Stack>
            </Grid>
          }

        </Grid>
      </Container>
    </div>
  );
}

export default App;
