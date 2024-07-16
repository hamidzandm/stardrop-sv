import React, { useState, useEffect, useCallback } from 'react';
import { transformCharacterData } from '../utils/contentCreation';
import CharacterDialoguesTable from './CharacterDialoguesTable';
import ScheduleExplanation from './ScheduleExplanation';
import PreferencesList from './PreferencesList';
import Spinner from './Spinner'; 
import { generateSchedule, generateScheduleExplanation, generateItems, processPreferences } from '@/llm_langchain';
import getNearestItemKeys from '@/utils/getNearestItemsKeys'; 

const CharacterFinalize = ({ character }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [scheduleJson, setScheduleJson] = useState('');
  const [preferencesJson, setPreferencesJson] = useState('');
  const [scheduleExplanation, setScheduleExplanation] = useState('');
  const [npcGiftsData, setNpcGiftsData] = useState(null);
  const [dialogues, setDialogues] = useState([]);
  const [giftDialogues, setGiftDialogues] = useState({});
  const [nearestItemKeys, setNearestItemKeys] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingSections, setLoadingSections] = useState({
    schedule: true,
    scheduleExplanation: true,
    npcGifts: true,
    preferences: true,
    dialogues: true,
    nearestItems: true,
  });

  const fetchData = useCallback(async () => {
    if (!character) return;
    console.log("Fetching data for character:", character.name);

    try {
      // Fetch schedule explanation and merge with character
      const explanation = await generateScheduleExplanation(character);
      setScheduleExplanation(explanation);
      const characterWithExplanation = { ...character, scheduleExplanation: explanation };
      setLoadingSections(prev => ({ ...prev, scheduleExplanation: false }));

      // Fetch and set schedule, dialogues, and gift dialogues
      const { schedule, dialogues, giftDialogues } = await generateSchedule(characterWithExplanation);
      setScheduleJson(JSON.stringify(schedule, null, 2));
      setLoadingSections(prev => ({ ...prev, schedule: false }));

      // Fetch and set NPC gifts
      const combinedString = `${character.personality.foodAndDrinks} ${character.personality.others}`;
      const npcGifts = await generateItems(combinedString);
      setNpcGiftsData(npcGifts);
      setLoadingSections(prev => ({ ...prev, npcGifts: false }));

      // Fetch and set preferences
      const formattedPreferences = {
        like: npcGifts.like || [],
        dislike: npcGifts.dislike || [],
        love: npcGifts.love || [],
        hate: npcGifts.hate || []
      };

      const preferences = await processPreferences(formattedPreferences);
      setPreferencesJson(JSON.stringify(preferences, null, 2));
      setLoadingSections(prev => ({ ...prev, preferences: false }));

      // Set gift dialogues
      setGiftDialogues(giftDialogues);
      setLoadingSections(prev => ({ ...prev, dialogues: false }));

      // Set nearest item keys
      const nearestKeys = getNearestItemKeys(preferences);
      setNearestItemKeys(nearestKeys);
      setLoadingSections(prev => ({ ...prev, nearestItems: false }));

      // Set the JSON input
      const dialoguesArray = extractDialoguesFromSchedule(dialogues);
      setDialogues(dialoguesArray);
      const schedules = extractSchedules(JSON.stringify(schedule));
      setJsonInput(JSON.stringify(transformCharacterData(characterWithExplanation, dialoguesArray, schedules, giftDialogues, nearestKeys), null, 2));
      
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false); // Set loading to false once all data is fetched
    }
  }, [character]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const extractDialoguesFromSchedule = (dialogues) => {
    return Object.entries(dialogues).map(([event, text]) => ({ event, text }));
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

  const downloadJson = (jsonData) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${character?.name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl relative">
      <h1 className="text-2xl font-bold mb-4">Your character is ready!</h1>

      {loading && (
        <div className="absolute top-0 right-0 m-4">
          <Spinner />
        </div>
      )}

      <div className={`flex mb-4 ${loading ? 'opacity-50' : ''}`}>
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
        <h3 className="text-lg font-bold mb-2">Schedule Explanation</h3>
        {loadingSections.scheduleExplanation ? <Spinner /> : <ScheduleExplanation explanation={scheduleExplanation} />}
      </div>

      <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
        <h2 className="text-xl font-bold mb-2">Character Dialogues</h2>
        {loadingSections.dialogues ? <Spinner /> : <CharacterDialoguesTable dialogues={dialogues} />}
      </div>

      <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
        <h2 className="text-xl font-bold mb-2">Preferences</h2>
        {loadingSections.preferences ? <Spinner /> : <PreferencesList preferences={preferencesJson ? JSON.parse(preferencesJson) : null} giftDialogues={giftDialogues} />}
      </div>

      <div className="text-right">
        <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Finish</button>
      </div>
    </div>
  );
};

export default CharacterFinalize;
