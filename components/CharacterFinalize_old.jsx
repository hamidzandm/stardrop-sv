import React, { useState, useEffect } from 'react';
import { transformCharacterData } from '../utils/contentCreation';
import CharacterDialoguesTable from './CharacterDialoguesTable';
import ScheduleExplanation from './ScheduleExplanation';
import Spinner from './Spinner'; // Adjust the path according to your project structure
import { generateSchedule, generateScheduleExplanation, generateItems, processPreferences } from '@/llm_langchain'; // Adjust the path if necessary
import GiftTastes from './GiftTastes';

const CharacterFinalize = ({ character }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [scheduleJson, setScheduleJson] = useState('');
  const [preferencesJson, setPreferencesJson] = useState(''); // State for Preferences JSON
  const [scheduleExplanation, setScheduleExplanation] = useState(''); // State for storing schedule explanation
  const [npcGiftsData, setNpcGiftsData] = useState(null); // State for storing NPC Gifts data
  const [giftTastesData, setGiftTastesData] = useState({
    love: [],
    like: [],
    dislike: [],
    hate: [],
    neutral: [],
  });
  const [giftTastesString, setGiftTastesString] = useState(''); // State for storing the gift tastes string
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingPreferences, setLoadingPreferences] = useState(false); // New state for loading Preferences
  const [loadingNpcGifts, setLoadingNpcGifts] = useState(false); // New state for loading NPC Gifts
  const [loadingDialogues, setLoadingDialogues] = useState(false); // New state for loading Dialogues
  const [loadingExplanation, setLoadingExplanation] = useState(false); // New state for loading Explanation
  const [allDataLoaded, setAllDataLoaded] = useState(false); // State for tracking if all data is loaded

  useEffect(() => {
    const fetchData = async () => {
      setLoadingSchedule(true);
      setLoadingPreferences(true);
      setLoadingNpcGifts(true);
      setLoadingDialogues(true);
      setLoadingExplanation(true);

      try {
        // Fetch and set schedule
        const schedule = await generateSchedule(character);
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
        const dialogues = extractDialoguesFromSchedule(JSON.stringify(schedule));
        const schedules = extractSchedules(JSON.stringify(schedule));
        const transformedData = transformCharacterData(character, dialogues, schedules, giftTastesString);
        setJsonInput(JSON.stringify(transformedData, null, 2));

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoadingSchedule(false);
        setLoadingPreferences(false);
        setLoadingNpcGifts(false);
        setLoadingDialogues(false);
        setLoadingExplanation(false);
        setAllDataLoaded(true); // Set allDataLoaded to true after all data is fetched
      }
    };

    fetchData();
  }, [character, giftTastesString]);

  const extractDialoguesFromSchedule = (scheduleJson) => {
    try {
      const parsedSchedule = JSON.parse(scheduleJson);
      const dialogues = [];
      Object.entries(parsedSchedule?.dialogues || {}).forEach(([event, text]) => {
        dialogues.push({ event, text });
      });
      return dialogues;
    } catch (error) {
      console.error('Failed to parse schedule JSON:', error);
      return [];
    }
  };

  const extractSchedules = (scheduleJson) => {
    try {
      const parsedSchedule = JSON.parse(scheduleJson);
      return parsedSchedule?.schedule || {};
    } catch (error) {
      console.error('Failed to parse schedule JSON:', error);
      return {};
    }
  };

  const handleGiftTastesChange = (giftTastesString) => {
    setGiftTastesString(JSON.stringify(giftTastesString, null, 2));
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

  const handleFinishClick = () => {
    if (allDataLoaded) {
      downloadJson(JSON.parse(jsonInput));
    }
  };

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Your character is ready!</h1>

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
        <h2 className="text-xl font-bold mb-2">Schedules</h2>
        {loadingExplanation ? (
          <Spinner />
        ) : (
          <ScheduleExplanation explanation={scheduleExplanation} loading={loadingExplanation} />
        )}
      </div>

      <CharacterDialoguesTable dialogues={extractDialoguesFromSchedule(scheduleJson)} loading={loadingDialogues} />

      <GiftTastes
        initialData={giftTastesData}
        characterName={character.name}
        preferences={preferencesJson ? JSON.parse(preferencesJson) : null}
        onGiftTastesChange={handleGiftTastesChange}
      />

      <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
        <h2 className="text-xl font-bold mb-2">Generated Gift Tastes String</h2>
        <pre className="bg-gray-200 p-2 rounded">{giftTastesString}</pre>
      </div>

      <div className="text-right">
        <button onClick={handleFinishClick} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Finish</button>
      </div>
    </div>
  );
};

export default CharacterFinalize;
