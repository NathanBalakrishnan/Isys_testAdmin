import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const data = {
  holidays: [
    {
      date: '2023-05-01',
      title: 'Labour Day',
    },
    {
      date: '2023-05-10',
      title: 'Bakrid',
    },
  ],
  events: [
    {
      start: '2023-05-03T15:00:00',
      end: '2023-05-03T16:00:00',
      title: 'Internal Meeting',
    },
    {
      start: '2023-05-11T00:00:00',
      end: '2023-05-11T23:59:59',
      title: 'Team Outing',
    },
  ]
};

const CalenderViewTwo = () => {
  const [events, setEvents] = useState(data.events);
  const holidays = data.holidays;

  const handleSelect = ({ start, end }) => {
    if (isDisabled(start)) {
      const holiday = holidays.find(holiday => moment(holiday.date).isSame(start, 'day'));
      if (holiday) {
        alert(`It's a holiday (${holiday.title})`);
      }
      else {
        alert("It's a weekend");
      }
    }
    else {
      const title = window.prompt('New Event name');
      if (title) {
        setEvents([...events, { start, end, title }]);
      }
    }
  };
  
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '#3174ad';
    let borderColor = '#3174ad';
    let color = '';
  
    if (event.type === 'holiday') {
      backgroundColor = '#d9d9d9';
      borderColor = '#d9d9d9';
      color = "#000000"
    } else {
      backgroundColor = '#8bc34a'; // set green color for non-holiday events
      borderColor = '#8bc34a';
      color= '#000000';
    }
  
    return {
      style: {
        backgroundColor,
        borderColor,
        color,
      },
    };
  };
  

  const isWeekend = date => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isToday = date => {
    return moment(date).isSame(new Date(), 'day');
  };

  const isHoliday = date => {
    return holidays.some(holiday => moment(holiday.date).isSame(date, 'day'));
  };

  const isDisabled = date => isWeekend(date) || isHoliday(date);

  const dayPropGetter = date => {
    if (isDisabled(date)) {
      const holiday = holidays.find(holiday => moment(holiday.date).isSame(date, 'day'));
      if (holiday) {
        return {
          className: 'disabled-day',
          style: {
            backgroundColor: '#ffb6c1',
          },
          title: holiday.title
        };
      }
      return {
        className: 'disabled-day',
        style: {
          backgroundColor: '#f5f5f5',
        },
      };
    }

    if (isToday(date)) {
        return {
          className: 'today',
          style: {
            backgroundColor: '#87cefa',
          },
        };
    }

    return {};
  };

  return (
    <div style={{ height: '40vh' }}>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="month"
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectSlot={handleSelect}
        onSelectEvent={event => alert(event.title)}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};

export default CalenderViewTwo;
