import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddResultDialog from './AddResultDialog';
import { Match, Result } from '../dto/Match';



interface MatchesTableProps {
    group: number
}


function createData(
    playerA: string,
    playerB: string,
    winner?: string,
    result?: Result,
): Match {
    return { playerA, playerB, winner, result };
}

const rows = [
    createData('Alberto', 'Alberto2'),
    createData('Alberto1', 'Alberto3', 'Alberto1', [1, 2]),
    createData('Alberto2', 'Alberto3', 'Alberto3', [13, 2]),
    createData('Alberto3', 'Alberto3', 'Alberto4', [14, 2]),
]


const MatchesTable = ({ group }: MatchesTableProps) => {
    rows.sort((a, b) => (a.winner !== undefined) ? -1 : 1)

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
                    {rows.map((row) => (
                        <TableRow
                            key={row.playerA}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.playerA}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.playerB}
                            </TableCell>
                            <TableCell align="right">{row.winner || "---"}</TableCell>
                            <TableCell align="right">{row.result?.join("-") || <AddResultDialog match={row}/>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default MatchesTable;