import React from 'react';
import { GrAddCircle } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";



const CharacterSchedulesTable = () => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <h1 className="text-xl font-bold mb-4">Larry's dialogues</h1>
      <div className="bg-gray-200 p-2 rounded-md flex items-center mb-4">
        <i className="fas fa-search text-gray-500 ml-2"><FaSearch /></i>
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-gray-200 p-2 ml-2 outline-none"
        />
      </div>
      <div className="flex items-center mb-4">
        <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg mr-2">
          <i className="fas fa-filter"><IoFilter /></i> 
        </button>
        <p>All</p>
        <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg ml-auto">
          <i className="fas fa-plus"><GrAddCircle className=''/></i> 
        </button>
      </div>
      <div className="overflow-y-auto max-h-96">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2 text-left">Key (Event)</th>
              <th className="p-2 text-left">Schedule</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="p-2 border-r">Event {index + 1}</td>
                <td className="p-2">This is schedule {index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Close</button>
        <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Save</button>
      </div>
    </div>
  );
};

export default CharacterSchedulesTable;
