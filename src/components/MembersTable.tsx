import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Group } from '../dto/Group';
import { Participant } from '../dto/Participant';


interface MembersTableProps {
    group: Group
}



const MembersTable = ({ group }: MembersTableProps) => {
    const rows = [...group.participants]
    rows.sort((a, b) => {
        const matchComparator = b.matches.wins - a.matches.wins
        if (matchComparator !== 0) return matchComparator
        const wonSetsComparator = b.sets.wins - a.sets.wins
        if (wonSetsComparator !== 0) return wonSetsComparator
        return a.sets.losts - b.sets.losts
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
                    {rows.map((row,index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.matches.wins}</TableCell>
                            <TableCell align="right">{row.matches.losts}</TableCell>
                            <TableCell align="right">{row.sets.wins}</TableCell>
                            <TableCell align="right">{row.sets.losts}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default MembersTable;