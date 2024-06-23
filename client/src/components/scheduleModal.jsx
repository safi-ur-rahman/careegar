import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import "../css/scheduleModal.css";

const ScheduleModal = ({ isOpen, onClose, onSave }) => {
    const [schedules, setSchedules] = useState([]);
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleAddSchedule = () => {
        if (!day || !startTime || !endTime) {
            toast.error('Please fill out all fields');
            return;
        }

        setSchedules([...schedules, { day, startTime, endTime }]);
        setDay('');
        setStartTime('');
        setEndTime('');
    };

    const handleSave = () => {
        if (schedules.length === 0) {
            toast.error('Please add at least one schedule');
            return;
        }
    
        onSave(schedules); // Pass the updated schedules array to the onSave function
        setSchedules([]); // Clear the schedules after saving
    };

    if (!isOpen) {
        return null;
    }

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div className="modal">
  <div className="modal-content">
    <div className="modal-border">
    <h2 className="modal-heading">Set Your Schedule</h2>
        <div className="modal-form">
      <div className="flex-forward">
        <label htmlFor="day">Day</label>
        <select
          id="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="">Select a day</option>
          {daysOfWeek.map((d, index) => (
            <option key={index} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div className="flex-forward">
        <label htmlFor="start-time">Start Time</label>
        <input
          type="time"
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="flex-forward">
        <label htmlFor="end-time">End Time</label>
        <input
          type="time"
          id="end-time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      </div>
      <button className="modal-button" onClick={handleAddSchedule}>Add Schedule</button>
      <ul>
        {schedules.map((schedule, index) => (
          <li key={index}>{schedule.day}: {schedule.startTime} - {schedule.endTime}</li>
        ))}
      </ul>
      <button className="modal-button" onClick={handleSave}>Save Schedule</button>
      <button className="modal-button close" onClick={onClose}>Close</button>
      </div>
  </div>
</div>
    );
};

export default ScheduleModal;