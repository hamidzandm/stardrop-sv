import React, { useState, useEffect, useCallback, useRef } from 'react';
import { transformCharacterData } from '../utils/contentCreation';
import CharacterDialoguesTable from './CharacterDialoguesTable';
import ScheduleExplanation from './ScheduleExplanation';
import PreferencesList from './PreferencesList';
import Spinner from './Spinner';
import JSZip from 'jszip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
  const pageRef = useRef();

  const fetchData = useCallback(async () => {
    if (!character) return;
    console.log("Fetching data for character:", character.name);

    try {
      // Fetch schedule explanation and merge with character
      const explanation = await generateScheduleExplanation(character);
      const characterWithExplanation = { ...character, scheduleExplanation: explanation };
      setLoadingSections(prev => ({ ...prev, scheduleExplanation: false }));

      // Fetch and set schedule, dialogues, and gift dialogues
      const { schedule, dialogues, giftDialogues } = await generateSchedule(characterWithExplanation);
      const explanation2 = await generateScheduleExplanation(schedule);
      setScheduleExplanation(explanation2);

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

  const downloadJson = (jsonData, fileName) => {
    // Properly format JSON string
    const formattedJson = JSON.stringify(JSON.parse(jsonData), null, 2);

    // Encode the JSON string
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(formattedJson);

    // Create and trigger the download
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const downloadDialoguesJson = (dialoguesData) => {
    const dialoguesJson = dialoguesData.reduce((acc, { event, text }) => {
      acc[event] = text;
      return acc;
    }, {});
    downloadJson(JSON.stringify(dialoguesJson, null, 2), `${character?.name}-dialogues.json`);
  };

  const downloadAllAsZip = async () => {
  const zip = new JSZip();
  zip.file("content.json", jsonInput);
  zip.file("schedule.json", scheduleJson);

  const dialoguesJson = dialogues.reduce((acc, { event, text }) => {
    acc[event] = text;
    return acc;
  }, {});
  zip.file("dialogues.json", JSON.stringify(dialoguesJson, null, 2));

  const assetPath = character.gender === 'Female' ? '/images/female_assets/' : '/images/male_assets/';
  const assetFiles = character.gender === 'Female' 
    ? ['f_portraits.png', 'f_sprites.png']
    : ['m_portraits.png', 'm_sprites.png'];

  // Using Promise.all to ensure all fetches complete before proceeding
  const assetPromises = assetFiles.map(async (file) => {
    const response = await fetch(`${assetPath}${file}`);
    const blob = await response.blob();
    const newFileName = file.includes('portraits')
      ? `${character.name}-Portrait.png`
      : `${character.name}.png`;
    zip.file(newFileName, blob);
  });

  await Promise.all(assetPromises);

  // Generate manifest.json
  const manifestJson = {
    Name: character.name,
    Author: "Hamid",
    Version: "2.3.0",
    Description: `Add ${character.name} Character`,
    UniqueID: `Hamid.${character.name}`,
    ContentPackFor: {
      UniqueID: "Pathoschild.ContentPatcher"
    }
  };
  zip.file('manifest.json', JSON.stringify(manifestJson, null, 2));

  // Generate PDF
  const pdfBlob = await generatePdfBlob();
  zip.file(`${character?.name}-page.pdf`, pdfBlob);

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${character?.name}-all-files.zip`;
  a.click();
  URL.revokeObjectURL(url);
};


  const generatePdfBlob = async () => {
    const canvas = await html2canvas(pageRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', [canvas.width * 0.264583, canvas.height * 0.264583]);
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.264583, canvas.height * 0.264583);
    return pdf.output('blob');
  };

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl relative" ref={pageRef}>
      <h1 className="text-2xl font-bold mb-4">
        {loading ? 'Your character is being created...' : 'Your character is ready!'}
      </h1>

      {loading && (
        <div className="absolute top-0 right-0 m-4">
          <Spinner />
        </div>
      )}

      <div className={`flex mb-4 ${loading ? 'opacity-50' : ''}`}>
        <div className="w-1/3">
          <img src={character.gender === 'Female' ? '/images/f_sample.png' : '/images/m_sample.png'} alt={character.name} className="w-40 h-35 mr-4" />
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
        <button onClick={downloadAllAsZip} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Download Files</button>
      </div>
    </div>
  );
};

export default CharacterFinalize;
