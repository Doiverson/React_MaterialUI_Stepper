import React from 'react';
import DayPicker from 'react-day-picker';

export default class BasicConcepts extends React.Component {

    state = {
        selectedDay: new Date(),
    };

    handleDayClick = (day) => {
        console.log(day);
        const { dueDate, close } = this.props;
        this.setState({ selectedDay: day });
        dueDate(day);
        close(0);
    };

    render() {

        return (
            <div>
                <DayPicker
                    onDayClick={this.handleDayClick}
                    selectedDays={this.state.selectedDay}
                />
            </div>
        );
    }
}
