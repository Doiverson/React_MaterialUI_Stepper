import 'date-fns';
import React, {useEffect} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


export default function MaterialUIPickers({dueDate}) {
    const [ selectedDate, setSelectedDate ] = React.useState(new Date());

    function handleDateChange(value) {
        setSelectedDate(value);
        const month = value.getMonth() + 1;
        const day = value.getDate();
        const year = value.getFullYear();
        const date = `${month}/${day}/${year}`;
        dueDate(date);
    }

    useEffect(() => {
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const year = selectedDate.getFullYear();
        const date = `${month}/${day}/${year}`;
       dueDate(date);
    }, [dueDate, selectedDate]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    // disabled
                    margin="normal"
                    id="mui-pickers-date"
                    label="Due Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
        </MuiPickersUtilsProvider>
    );
}
