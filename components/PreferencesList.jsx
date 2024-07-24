import React from 'react';

const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const deduplicate = (array) => {
  return [...new Set(array.map(capitalize))];
};

const PreferencesList = ({ preferences, giftDialogues }) => {
  if (!preferences || !giftDialogues) return null;

  return (
    <div className="mb-4 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        {['love', 'like', 'dislike', 'hate'].map((key) => (
          <div key={key} className="mb-8">
            <h3 className={"text-2xl font-semibold capitalize mb-4 text-blue-500"}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nearest Items</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deduplicate(preferences[key].map(item => item.item)).map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <ul className="list-disc list-inside">
                          {deduplicate(preferences[key].find(p => p.item.toLowerCase() === item.toLowerCase()).nearestItems).map((nearestItem, i) => (
                            <li key={i} className="text-gray-600">{nearestItem}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="italic text-gray-500 mt-4">Dialogue: {giftDialogues[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferencesList;
