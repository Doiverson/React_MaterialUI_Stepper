import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

export default class Example extends React.Component {

    state = {
        selectedDay: undefined,
    };

    componentWillMount = () => {
        const { dueDate } = this.props;
        const today = new Date();
        this.setState({ selectedDay: today})
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const year = today.getFullYear();
        const date = `${month}/${day}/${year}`;
        dueDate(date);
    };

    handleDayChange = (selectedDay) => {
        const { dueDate } = this.props;
        this.setState({ selectedDay });
        const month = selectedDay.getMonth() + 1;
        const day = selectedDay.getDate();
        const year = selectedDay.getFullYear();
        const date = `${month}/${day}/${year}`;
        dueDate(date);
    };

    render() {
        const { selectedDay } = this.state;
        return (
            <div>
                <DayPickerInput
                    value={selectedDay}
                    onDayChange={this.handleDayChange}
                    dayPickerProps={{
                        selectedDays: selectedDay,
                    }}
                />
            </div>
        );
    }
}
