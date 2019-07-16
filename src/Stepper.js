import React from 'react';

import { withStyles, makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Paper} from "@material-ui/core";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
// import DayPicker from './DayPicker';
import DayPicker from './DayPicker';


const useStyles = makeStyles(theme => {
    return ({
        root: {
            width: '90%',
        },
        button: {
            fontSize: 10
        },
        actionsContainer: {
            // marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
    })
});

const muiTheme = createMuiTheme({
    overrides: {
        MuiStepIcon: {
            root: {
                color: 'rgba(0, 0, 0, 0.42)',
                '&$active': {
                    color: '#14A584',
                },
                '&$completed': {
                    color: 'red',
                },
            },
        },
    }
})

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
    },
}))(Tooltip);


export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [ activeStep, setActiveStep ] = React.useState(0);
    const [ steps, setSteps ] = React.useState([]);
    const [ form, setForm ] = React.useState({
        title: '',
        date: ''
    });
    const [ editSteps, setEditSteps ] = React.useState({
        title: '',
        date: ''
    });
    const [ editStatus, setEditStatus ] = React.useState(false);


    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setEditStatus(false);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        setEditStatus(false);
    };

    const handleReset = () => {
        setActiveStep(0);
        setSteps([]);
    };

    const addStep = () => {
        setSteps([...steps, {
            title: form.title,
            dueDate: form.date
        }]);
        setForm({
            title: '',
            date: ''
        });
    };

    const onChange = (e) =>
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    const selectDate = (selectedDate) =>
        setForm({
            ...form,
            date: selectedDate
        });

    const editDate = (selectedDate) =>
        setEditSteps({
            ...editSteps,
            date: selectedDate
        });

    const onChangeEdit = (e) =>
        setEditSteps({
            ...editSteps,
            [e.target.name]: e.target.value
        });

    const onClickEdit = (index) => {
        const currentIndex = index;
        const updatedSteps = steps.map((step, index) => {
            return index === currentIndex ?
                Object.assign(step, {
                    title: editSteps.title,
                    dueDate: editSteps.date
                }) : step
        });
        setSteps(updatedSteps);
        setEditSteps({
            title: '',
            date: ''
        });
        setEditStatus(false);
    };

    const actionContainer =
        <div className={classes.actionsContainer}>
            <div>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
                <Button
                    onClick={() => setEditStatus(true)}
                    className={classes.button}>
                    Edit
                </Button>
            </div>
        </div>;

    return (
        <MuiThemeProvider theme={muiTheme}>
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.title} style={{position: 'relative'}}>
                        {activeStep === index ?
                            <LightTooltip
                                title={actionContainer}
                                interactive
                            >
                                <StepLabel
                                    classes={{root: 'circle'}}
                                    StepIconProps={{ classes: { root: classes.icon } }}
                                />
                            </LightTooltip> : <StepLabel classes={{root: 'circle'}}/>
                        }
                        <div className="label">{`${step.title} Due Date: ${step.dueDate}`}</div>
                        <StepContent classes={{root: `stepContent ${editStatus ? "open" : ""}`}}>
                            <FormControl>
                                <InputLabel>Title</InputLabel>
                                <Input
                                    value={editSteps.title}
                                    name="title"
                                    onChange={onChangeEdit}
                                    placeholder={step.title}
                                />
                                <DayPicker dueDate={editDate}/>
                                <Button onClick={() => onClickEdit(index)}>Done</Button>
                            </FormControl>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>

            <IconButton onClick={addStep}>
                <Icon style={{color: `#14A584`}}>
                    add_circle
                </Icon>
            </IconButton>
            <FormControl>
                <InputLabel>Title</InputLabel>
                <Input
                    value={form.title}
                    name="title"
                    onChange={onChange}
                />
                <DayPicker dueDate={selectDate}/>
            </FormControl>

            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                    >
                        Back
                    </Button>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
        </MuiThemeProvider>
    );
}
