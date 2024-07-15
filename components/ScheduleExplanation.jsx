import React from 'react';
import Spinner from './Spinner'; // Adjust the path according to your project structure

const ScheduleExplanation = ({ explanation, loading }) => {
  const parseSchedule = (schedule) => {
    if (!schedule) return null;
    const parsedSchedule = JSON.parse(schedule);
    return Object.entries(parsedSchedule).map(([day, description], index) => (
      <div key={index} className="mb-4">
        <h3 className="font-bold">{day}</h3>
        <p className="ml-4">{description}</p>
      </div>
    ));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
      {loading ? (
        <Spinner />
      ) : (
        parseSchedule(explanation)
      )}
    </div>
  );
};

export default ScheduleExplanation;
