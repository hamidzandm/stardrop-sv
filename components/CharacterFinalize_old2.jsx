import React, { useState, useEffect } from 'react';
import { transformCharacterData } from '../utils/contentCreation';
import CharacterDialoguesTable from './CharacterDialoguesTable';
import ScheduleExplanation from './ScheduleExplanation';
// import GiftTastes from './GiftTastes';
import Spinner from './Spinner'; // Adjust the path according to your project structure
import { generateSchedule, generateScheduleExplanation, generateItems, processPreferences } from '@/llm_langchain'; // Adjust the path if necessary

const CharacterFinalize = ({ character }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [scheduleJson, setScheduleJson] = useState('');
  const [preferencesJson, setPreferencesJson] = useState(''); // State for Preferences JSON
  const [scheduleExplanation, setScheduleExplanation] = useState(''); // State for storing schedule explanation
  const [npcGiftsData, setNpcGiftsData] = useState(null); // State for storing NPC Gifts data
  const [dialogues, setDialogues] = useState([]); // State for storing dialogues
  const [loading, setLoading] = useState(true); // Single state to track overall loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch and set schedule, dialogues, and gift dialogues
        const { schedule, dialogues, giftDialogues } = await generateSchedule(character);
        setScheduleJson(JSON.stringify(schedule, null, 2));
        const explanation = await generateScheduleExplanation(schedule);
        setScheduleExplanation(explanation);

        // Fetch and set NPC gifts
        const combinedString = `${character.personality.foodAndDrinks} ${character.personality.others}`;
        const npcGifts = await generateItems(combinedString);
        setNpcGiftsData(npcGifts);

        // Fetch and set preferences
        const formattedPreferences = {
          like: npcGifts.like || [],
          dislike: npcGifts.dislike || [],
          love: npcGifts.love || [],
          hate: npcGifts.hate || []
        };

        const preferences = await processPreferences(formattedPreferences);
        setPreferencesJson(JSON.stringify(preferences, null, 2));

        // Set the JSON input
        const dialoguesArray = extractDialoguesFromSchedule(dialogues);
        setDialogues(dialoguesArray);
        const schedules = extractSchedules(JSON.stringify(schedule));
        setJsonInput(JSON.stringify(transformCharacterData(character, dialoguesArray, schedules, giftDialogues), null, 2));

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false); // Set loading to false once all data is fetched
      }
    };

    fetchData();
  }, [character]);

  const extractDialoguesFromSchedule = (dialogues) => {
    const dialoguesArray = [];
    Object.entries(dialogues).forEach(([event, text]) => {
      dialoguesArray.push({ event, text });
    });
    return dialoguesArray;
  };

  const extractSchedules = (scheduleJson) => {
    try {
      const parsedSchedule = JSON.parse(scheduleJson);
      return parsedSchedule || {};
    } catch (error) {
      console.error('Failed to parse schedule JSON:', error);
      return {};
    }
  };

  const handleGiftTastesDone = (data) => {
    setGiftTastesData(data);
  };

  const downloadJson = (jsonData) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${character.name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Your character is ready!</h1>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex mb-4">
            <div className="w-1/3">
              <img src={'/images/characters/2_portrait.png'} alt={character.name} className="w-40 h-35 mr-4" />
              <div>
                <h2 className="text-xl font-bold">{character.name}</h2>
                <p className="text-sm">Age: {character.age}</p>
                <p className="text-sm">Birthday: {character.birthday}</p>
                <p className="text-sm">Gender: {character.gender}</p>
              </div>
            </div>
            <div className="w-2/3 pl-4">
              <h2 className="text-xl font-bold mb-2">{character.title}</h2>
              <h3 className="font-bold mb-2">Key features:</h3>
              <ul className="list-none mb-4">
                {(character.highlights || []).map((highlight, index) => (
                  <li key={index} className="mb-2">
                    {highlight}
                  </li>
                ))}
              </ul>
              <p>{character.description}</p>
            </div>
          </div>

          <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
            <h2 className="text-xl font-bold mb-2">Content.json File</h2>
            <pre className="bg-gray-200 p-4 rounded-lg overflow-auto max-h-64">
              {jsonInput}
            </pre>
            <div className="text-right mt-4">
              <button onClick={() => downloadJson(jsonInput)} className="bg-green-300 hover:bg-green-400 text-black px-4 py-2 rounded-lg">Download JSON</button>
            </div>
          </div>

          <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
            <h2 className="text-xl font-bold mb-2">Schedules JSON</h2>
            <pre className="bg-gray-200 p-4 rounded-lg overflow-auto max-h-64">
              {scheduleJson}
            </pre>
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Schedule Explanation</h3>
              <ScheduleExplanation explanation={scheduleExplanation} />
            </div>
            <div className="text-right mt-4">
              <button onClick={() => downloadJson(scheduleJson)} className="bg-green-300 hover:bg-green-400 text-black px-4 py-2 rounded-lg">Download JSON</button>
            </div>
          </div>

          <CharacterDialoguesTable dialogues={dialogues} loading={loading} />

          {/* <GiftTastes
            initialData={giftTastesData}
            onDone={handleGiftTastesDone}
            characterName={character.name}
            preferences={preferencesJson ? JSON.parse(preferencesJson) : null}
          /> */}

          <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
            <h2 className="text-xl font-bold mb-2">NPC Gifts</h2>
            <pre className="bg-gray-200 p-4 rounded-lg overflow-auto max-h-64">
              {JSON.stringify(npcGiftsData, null, 2)}
            </pre>
            <div className="text-right mt-4">
              <button onClick={() => downloadJson(npcGiftsData)} className="bg-green-300 hover:bg-green-400 text-black px-4 py-2 rounded-lg">Download JSON</button>
            </div>
          </div>

          <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
            <h2 className="text-xl font-bold mb-2">Preferences JSON</h2>
            <pre className="bg-gray-200 p-4 rounded-lg overflow-auto max-h-64">
              {preferencesJson}
            </pre>
            <div className="text-right mt-4">
              <button onClick={() => downloadJson(preferencesJson)} className="bg-green-300 hover:bg-green-400 text-black px-4 py-2 rounded-lg">Download JSON</button>
            </div>
          </div>

          <div className="text-right">
            <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Finish</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterFinalize;
