import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddResultDialog from './AddResultDialog';
import { Group } from '../dto/Group';
import { Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';



interface MatchesTableProps {
    group: Group
    cb(err?: any): void
}

const MatchesTable = ({ group, cb }: MatchesTableProps) => {
    const [isMobile, setIsMobile] = React.useState(false)
    const [playerFilter, setPlayerFilter] = React.useState("")
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }
    const participantNameBy = (id?: string): string => {
        if (id === undefined) return ""
        return group.participants.find(person => person.id === id)?.name || "NOT FOUND"
    }

    const rows = [...group.matchs]
    rows.sort((a) => (a.winner !== undefined) ? -1 : 1)
    const filteredRows = rows.filter((match) => {
        return participantNameBy(match.playerA).toLowerCase().includes(playerFilter.toLowerCase()) || participantNameBy(match.playerB).toLowerCase().includes(playerFilter.toLowerCase())
    })

    React.useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
    })

    if (isMobile) {
        return (<Grid maxWidth="md" spacing={2} container>
            <Grid item xs={10}>
                <TextField
                    fullWidth
                    variant="standard"
                    label="Match filter"
                    value={playerFilter}
                    onChange={(event) => {
                        setPlayerFilter(event.target.value);
                    }}
                    helperText="Filter match by player"
                />
            </Grid>
            {filteredRows.filter(match => match.winner === undefined).map((match, index) => (<Grid xs={10} key={index} item><Card >
                <CardContent>
                    <Typography variant="h5" component="div">
                        Pending Match
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} component="div">
                        {participantNameBy(match.playerA)} vs {participantNameBy(match.playerB)}
                    </Typography>

                </CardContent>
                <CardActions>
                    <AddResultDialog match={match} group={group} cb={cb} large={true} />
                </CardActions>
            </Card></Grid>))}

        </Grid>)
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant="standard"
                    label="Match filter"
                    value={playerFilter}
                    onChange={(event) => {
                        setPlayerFilter(event.target.value);
                    }}
                    helperText="Filter match by player"
                />
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Player A</TableCell>
                                <TableCell>Player B</TableCell>
                                <TableCell align="right">Winner</TableCell>
                                <TableCell align="right">Result</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {participantNameBy(row.playerA)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {participantNameBy(row.playerB)}
                                    </TableCell>
                                    <TableCell align="right">{participantNameBy(row.winner) || "---"}</TableCell>
                                    <TableCell align="right">{row.result?.join("-") || <AddResultDialog match={row} group={group} cb={cb} />}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}


export default MatchesTable;