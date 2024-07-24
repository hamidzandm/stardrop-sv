import React, { useState, useEffect } from 'react';

const CharacterSchedule = ({ schedules = [], onSchedulesChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSchedules, setEditedSchedules] = useState([...schedules]);

  useEffect(() => {
    setEditedSchedules(schedules);
  }, [schedules]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSchedulesChange(editedSchedules);
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedules = [...editedSchedules];
    newSchedules[index] = {
      ...newSchedules[index],
      [field]: value
    };
    setEditedSchedules(newSchedules);
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Schedules</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto h-64">
        {isEditing ? (
          <div className="space-y-2">
            {editedSchedules.map((item, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleScheduleChange(index, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                  placeholder="Title"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => handleScheduleChange(index, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Description"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {schedules.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{item.title}:</h3>
                <p className="text-black pl-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterSchedule;
