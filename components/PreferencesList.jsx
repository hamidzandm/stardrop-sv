import React from 'react';

const PreferencesList = ({ preferences, giftDialogues }) => {
  if (!preferences || !giftDialogues) return null;

  return (
    <div className="mb-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Preferences</h2>
      </div>
      <div className="p-6">
        {['like', 'love', 'dislike', 'hate'].map((key) => (
          <div key={key} className="mb-6">
            <h3 className={`text-xl font-semibold capitalize mb-2 text-${key === 'like' ? 'green-500' : key === 'love' ? 'red-500' : key === 'dislike' ? 'yellow-500' : 'gray-500'}`}>
              {key}
            </h3>
            <ul className="list-disc list-inside ml-6 text-gray-700">
              {preferences[key].map((item, index) => (
                <li key={index} className="mb-2">
                  <strong>{item.item}:</strong>
                  <ul className="list-disc list-inside ml-4">
                    {item.nearestItems.map((nearestItem, i) => (
                      <li key={i} className="text-gray-600">{nearestItem}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="italic text-gray-500 mt-2">Dialogue: {giftDialogues[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferencesList;
