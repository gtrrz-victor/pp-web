import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface MembersTableProps {
    group: number
}

function createData(
    name: string,
    wonMatches: number,
    lostMatches: number,
    wonSets: number,
    lostSets: number,
) {
    return { name, wonMatches, lostMatches, wonSets, lostSets };
}

const rows = [
    createData('Alberto', 1, 2, 3, 3),
    createData('Alberto1', 13, 2, 3, 3),
    createData('Alberto2', 1, 4, 3, 35),
    createData('Alberto3', 1, 2, 3, 3),
];


const MembersTable = ({ group }: MembersTableProps) => {

    rows.sort((a, b) => {
        const matchComparator = b.wonMatches - a.wonMatches
        if (matchComparator !== 0) return matchComparator
        const wonSetsComparator = b.wonSets - a.wonSets
        if (wonSetsComparator !== 0) return wonSetsComparator
        return a.lostSets - b.lostSets
    })

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Won matchs</TableCell>
                        <TableCell align="right">Lost matchs</TableCell>
                        <TableCell align="right">Won sets</TableCell>
                        <TableCell align="right">Lost sets</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.wonMatches}</TableCell>
                            <TableCell align="right">{row.lostMatches}</TableCell>
                            <TableCell align="right">{row.wonSets}</TableCell>
                            <TableCell align="right">{row.lostSets}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default MembersTable;