import React from 'react';

const CharacterSidebarFilter = ({cnaracter}) => {
  return (
    <div className="w-64 bg-white p-4 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Category</h3>
        <div className="space-y-2">
          <div>
            <input type="checkbox" id="category1" className="mr-2"/>
            <label htmlFor="category1">Category 1</label>
          </div>
          <div>
            <input type="checkbox" id="category2" className="mr-2"/>
            <label htmlFor="category2">Category 2</label>
          </div>
          <div>
            <input type="checkbox" id="category3" className="mr-2"/>
            <label htmlFor="category3">Category 3</label>
          </div>
        </div>
      </div>
      
      {/* Age Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Age</h3>
        <div className="space-y-2">
          <div>
            <input type="radio" id="age1" name="age" className="mr-2"/>
            <label htmlFor="age1">0-10</label>
          </div>
          <div>
            <input type="radio" id="age2" name="age" className="mr-2"/>
            <label htmlFor="age2">11-20</label>
          </div>
          <div>
            <input type="radio" id="age3" name="age" className="mr-2"/>
            <label htmlFor="age3">21-30</label>
          </div>
        </div>
      </div>

      {/* Gender Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Gender</h3>
        <div className="space-y-2">
          <div>
            <input type="radio" id="gender1" name="gender" className="mr-2"/>
            <label htmlFor="gender1">Male</label>
          </div>
          <div>
            <input type="radio" id="gender2" name="gender" className="mr-2"/>
            <label htmlFor="gender2">Female</label>
          </div>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Location</h3>
        <div className="space-y-2">
          <div>
            <input type="checkbox" id="location1" className="mr-2"/>
            <label htmlFor="location1">Location 1</label>
          </div>
          <div>
            <input type="checkbox" id="location2" className="mr-2"/>
            <label htmlFor="location2">Location 2</label>
          </div>
          <div>
            <input type="checkbox" id="location3" className="mr-2"/>
            <label htmlFor="location3">Location 3</label>
          </div>
        </div>
      </div>

      {/* Range Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Age Range</h3>
        <div>
          <input type="range" min="0" max="100" className="w-full"/>
        </div>
      </div>

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">Apply Filters</button>
    </div>
  );
}

export default CharacterSidebarFilter;
