import React from 'react';

import DayPicker from './DayPicker_ver2';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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


const muiTheme = createMuiTheme({
    overrides: {
        MuiStepIcon: {
            root: {
                color: 'rgba(0, 0, 0, 0.42)',
                '&$active': { color: '#14A584' },
                '&$completed': { color: 'red' },
            },
        },
        MuiStepper: {
            root: { paddingLeft: 11 }
        },
        MuiPaper: {
            root: { textAlign: 'center' }
        },
        MuiCollapse: {
            wrapperInner: { marginTop: 15 }
        }
    }
});

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        padding: 0
    },
}))(Tooltip);


export default function VerticalLinearStepper() {

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const date = `${month}/${day}/${year}`;

    const [ activeStep, setActiveStep ] = React.useState(0);
    const [ activeDaypicker, setActiveDaypicker ] = React.useState(0)
    const [ steps, setSteps ] = React.useState([]);
    const [ form, setForm ] = React.useState({
        title: '',
        date
    });
    const [ editSteps, setEditSteps ] = React.useState({
        title: steps.title,
        date: steps.date
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
            date
        });
    };

    const showCalender = () => {
      !activeDaypicker ? setActiveDaypicker(1) : setActiveDaypicker(0)
    };

    const onChange = (e) =>
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    const selectDate = (selectedDate) => {
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const year = selectedDate.getFullYear();
        const date = `${month}/${day}/${year}`;
        setForm({
            ...form,
            date
        });
    };

    const editDate = (selectedDate) =>{
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const year = selectedDate.getFullYear();
        const date = `${month}/${day}/${year}`;
        setEditSteps({
            ...editSteps,
            date
        });
    };

    const onChangeEdit = (e) =>
        setEditSteps({
            ...editSteps,
            [e.target.name]: e.target.value
        });

    const onSubmit = () => {
      console.log("Off focused");
    };

    // const onClickEdit = (index) => {
    //     const currentIndex = index;
    //     const updatedSteps = steps.map((step, index) => {
    //         if (index === currentIndex){
    //             if (editSteps.title === undefined || !editSteps.title) {
    //                 return Object.assign(step, {
    //                     title: step.title,
    //                     dueDate: editSteps.date
    //                 })
    //             } else {
    //                 console.log(editSteps);
    //                 return Object.assign(step, {
    //                     title: editSteps.title,
    //                     dueDate: editSteps.date
    //                 })
    //             }
    //
    //         } else {
    //             return  step
    //         }
    //
    //     });
    //     setSteps(updatedSteps);
    //     setEditSteps({
    //         title: '',
    //         date: ''
    //     });
    //     setEditStatus(false);
    // };

    const actionContainer =
        <div className="actionContainer">
            <Button
                disabled={activeStep === 0}
                onClick={handleBack}
            >
                Back
            </Button>
            <Button
                onClick={handleNext}
            >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            {/*<Button*/}
            {/*    onClick={() => setEditStatus(true)}*/}
            {/*>*/}
            {/*    Edit*/}
            {/*</Button>*/}
        </div>;

    return (
        <MuiThemeProvider theme={muiTheme}>
            <div style={{position: 'relative'}}>
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
                                    />
                                </LightTooltip> : <StepLabel classes={{root: 'circle'}}/>
                            }
                            <div className="step-label">
                                <Input
                                    value={step.title}
                                    name="title"
                                    onChange={onChangeEdit}
                                    onBlur={onSubmit}
                                    className="step-input"
                                    // placeholder={step.title}
                                />
                                <div>{`Due Date: ${step.dueDate}`}</div>
                            </div>
                            {/*<StepContent classes={{root: `stepContent ${editStatus ? "step-active" : ""}`}}>*/}
                            {/*    <FormControl>*/}
                            {/*        <InputLabel>Title</InputLabel>*/}
                            {/*        <Input*/}
                            {/*            value={editSteps.title}*/}
                            {/*            name="title"*/}
                            {/*            onChange={onChangeEdit}*/}
                            {/*            className="step-input"*/}
                            {/*            placeholder={step.title}*/}
                            {/*        />*/}
                            {/*        <DayPicker dueDate={editDate}/>*/}
                            {/*        <Button onClick={() => onClickEdit(index)}>Done</Button>*/}
                            {/*    </FormControl>*/}
                            {/*</StepContent>*/}
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
                        className="step-input"
                        placeholder="Title"
                    />
                </FormControl>
                <IconButton onClick={showCalender} size="small">
                    <i className="material-icons">
                        calendar_today
                    </i>
                </IconButton>
                <div onBlur={() => {setActiveDaypicker(0)}} className={`DayPicker-content ${!activeDaypicker ? '' : 'open'}`}>
                    <DayPicker dueDate={selectDate} close={setActiveDaypicker}/>
                </div>

                {activeStep === steps.length && (
                    <Paper square elevation={0}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Button onClick={handleReset}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
        </MuiThemeProvider>
    );
}
