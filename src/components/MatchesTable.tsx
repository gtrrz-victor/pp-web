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



interface MatchesTableProps {
    group: Group
}

const MatchesTable = ({ group }: MatchesTableProps) => {
    const rows = [...group.matchs]
    rows.sort((a) => (a.winner !== undefined) ? -1 : 1)

    const participantNameBy = (id:string):string =>{
        return group.participants.find(person=>person.id===id)?.name || "NOT FOUND"
    }

    return (
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
                    {rows.map((row, index) => (
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
                            <TableCell align="right">{row.winner || "---"}</TableCell>
                            <TableCell align="right">{row.result?.join("-") || <AddResultDialog match={row} group={group} />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default MatchesTable;