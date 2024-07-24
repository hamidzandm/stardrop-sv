import React from 'react';
import Spinner from './Spinner'; // Adjust the path according to your project structure

const ScheduleExplanation = ({ explanation, loading }) => {
  const parseSchedule = (schedule) => {
    if (!schedule) return null;
    const parsedSchedule = JSON.parse(schedule);
    return Object.entries(parsedSchedule).map(([day, description], index) => (
      <div key={index} className="mb-6">
        <h3 className="text-xl font-bold text-blue-600 mb-2">{day}</h3>
        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg shadow-inner">{description}</p>
      </div>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {loading ? (
        <Spinner />
      ) : (
        parseSchedule(explanation)
      )}
    </div>
  );
};

export default ScheduleExplanation;
