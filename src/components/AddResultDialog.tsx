import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IMaskInput } from 'react-imask';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid, Input, MenuItem } from '@mui/material';
import { Match } from '../dto/Match';
import { Result } from '../dto/Result';
import { Group } from '../dto/Group';
import { tournamentServiceFactory } from '../services/Tournament';


interface AddResultDialogProps {
    match: Match
    group: Group
    cb(err?:any):void
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="0-0"
                definitions={{
                    '0-0': /[1-2]*/,
                }}
                inputRef={() => ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

interface State {
    result: Result;
}

export default function AddResultDialog({ match, group, cb }: AddResultDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [validForm, setValidForm] = React.useState(false);
    const [winner, setWinner] = React.useState<string>('');
    const [values, setValues] = React.useState<State>({
        result: [],
    });

    const tournament = tournamentServiceFactory()


    React.useEffect(() => {
        setValidForm(winner !== '' && values.result.length === 2)
    }, [winner, values]);

    const participantNameBy = (id:string):string =>{
        return group.participants.find(person=>person.id===id)?.name || "NOT FOUND"
    }

    const handleChangee = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawResult = event.target.value.split("-")
        let newValues = rawResult.map(val => parseInt(val)).filter(num => num === 1 || num === 2 || num === 0)
        if (newValues.reduce((a, b) => a + b, 0) > 3) {
            newValues = [newValues[0]]
        }
        setValues({
            ...values,
            [event.target.name]: newValues
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAdd = async() => {
        const finishedMatch = { ...match, winner, result: values.result }
        try {
            await tournament.addResultToMatch(finishedMatch, group)
            cb()
        }catch(err){
            cb(err)
        }
        handleClose()
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWinner(event.target.value);
    };


    return (
        <div>
            <Button size="small" variant="outlined" onClick={handleClickOpen}>Add</Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Add Match Result</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div>
                                    <h3>Player A</h3>
                                    <div>{participantNameBy(match.playerA)}</div>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <h3>Player B</h3>
                                    <div>{participantNameBy(match.playerB)}</div>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div>
                                    <h3>Winner</h3>
                                    <TextField
                                        id="outlined-select-winner"
                                        select
                                        label="Select"
                                        size="small"
                                        value={winner}
                                        onChange={handleChange}
                                        helperText="Select the winner"
                                    >
                                        {[match.playerA, match.playerB].map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {participantNameBy(option)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <h3>Result</h3>
                                    <Input
                                        value={values.result.join("-")}
                                        onChange={handleChangee}
                                        name="result"
                                        id="formatted-text-mask-input"
                                        inputComponent={TextMaskCustom as any}
                                    />
                                </div>
                            </Grid>
                        </Grid>



                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd} disabled={!validForm}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}