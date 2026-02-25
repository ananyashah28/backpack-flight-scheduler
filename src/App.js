import { useState } from 'react';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [showToast, setShowToast] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(date);
  };

  const handleContinue = () => {
    if (!selectedDate) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = selectedDate === date;
      days.push(
        <button
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Flight Schedule</h1>
        {selectedDate && (
          <p className="selected-date-display">
            Selected: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        )}
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={handlePrevMonth} className="nav-button">&lt;</button>
            <span className="month-year">{months[currentMonth]} {currentYear}</span>
            <button onClick={handleNextMonth} className="nav-button">&gt;</button>
          </div>
          <div className="calendar-weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="calendar-grid">
            {renderCalendar()}
          </div>
        </div>
        <BpkButton onClick={handleContinue}>Continue</BpkButton>
      </div>
      {showToast && (
        <div className={`toast ${!selectedDate ? 'error' : ''}`}>
          {selectedDate ? '✓ Flight date selected!' : '⚠ Please select a date first'}
        </div>
      )}
    </div>
  );
}

export default App;
