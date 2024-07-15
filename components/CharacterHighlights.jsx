'use client'
import { generateExpansion, generateHighlights, generateDescription } from '@/llm_langchain';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner'; // Adjust the path according to your project structure

const CharacterHighlights = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);
  const [pinnedHighlights, setPinnedHighlights] = useState([]);

  async function handleView(highlight, index) {
    setLoading(true);
    setLoadingIndex(index);
    try {
      const r = await generateExpansion(highlight);
      const select = JSON.stringify(r[0]); // Assuming the response is an array with a single object
      router.push(`/characters/select?select=${encodeURIComponent(select)}`);
    } catch (error) {
      console.error("Failed to generate expansion:", error);
    } finally {
      setLoading(false);
      setLoadingIndex(null);
    }
  }

  const handleRegenerate = async (index) => {
    setRegeneratingIndex(index);
    setLoading(true);
    try {
      // Step 1: Generate the description based on the current highlight
      const descriptionResponse = await generateDescription(highlights[index]);
      
      // Step 2: Use the generated description as input to generate new highlights
      const highlightsResponse = await generateHighlights(descriptionResponse);
      const newHighlight = highlightsResponse[0];
      
      // Step 3: Update the highlights array
      const updatedHighlights = [...highlights];
      updatedHighlights[index] = newHighlight;
      setHighlights(updatedHighlights);
    } catch (error) {
      console.error("Failed to regenerate highlights:", error);
    } finally {
      setRegeneratingIndex(null);
      setLoading(false);
    }
  };

  const handlePin = (index) => {
    const alreadyPinned = pinnedHighlights.find(highlight => highlight.index === index);
    if (alreadyPinned) {
      setPinnedHighlights(pinnedHighlights.filter(highlight => highlight.index !== index));
    } else {
      setPinnedHighlights([...pinnedHighlights, { highlight: highlights[index], index }]);
      handleRegenerate(index);
    }
  };

  useEffect(() => {
    const highlightsQuery = searchParams.get('highlights');
    if (highlightsQuery) {
      const parsedHighlights = JSON.parse(decodeURIComponent(highlightsQuery));
      setHighlights(parsedHighlights);
    } else {
      const fetchInitialHighlights = async () => {
        setLoading(true);
        try {
          const r = await generateHighlights('');
          setHighlights(r.slice(0, 3)); // Set the initial highlights to the first 3 highlights
        } catch (error) {
          console.error("Failed to generate initial highlights:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchInitialHighlights();
    }
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="flex flex-wrap justify-center relative">
      {loading && (
        <div className="absolute top-0 left-0">
          <Spinner />
        </div>
      )}
      {pinnedHighlights.map((pinned, pinnedIndex) => (
        <div key={pinnedIndex} className="border rounded-lg p-8 w-80 text-left shadow-md m-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <img src={'/images/characters/2_portrait.png'} alt={pinned.highlight.name} className="w-16 h-16 mr-4" />
              <div>
                <p className="text-sm">Name: {pinned.highlight.name}</p>
                <p className="text-sm">Age: {pinned.highlight.age}</p>
                <p className="text-sm">Birthday: {pinned.highlight.birthday}</p>
                <p className="text-sm">Gender: {pinned.highlight.gender}</p>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">{pinned.highlight.title}</h3>
            <ul className="list-disc list-inside mb-2 text-sm">
              {pinned.highlight.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="italic mb-4 text-sm">{pinned.highlight.description_qoute}</p>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              onClick={() => handleView(pinned.highlight, pinned.index)}
              disabled={loading && loadingIndex === pinned.index}
            >
              {loading && loadingIndex === pinned.index ? <Spinner /> : 'View'}
            </button>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
              onClick={() => setPinnedHighlights(pinnedHighlights.filter(highlight => highlight.index !== pinned.index))}
            >
              Unpin
            </button>
          </div>
        </div>
      ))}
      {highlights.map((highlight, index) => (
        <div key={index} className="border rounded-lg p-8 w-80 text-left shadow-md m-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <img src={'/images/characters/2_portrait.png'} alt={highlight.name} className="w-16 h-16 mr-4" />
              <div>
                <p className="text-sm">Name: {highlight.name}</p>
                <p className="text-sm">Age: {highlight.age}</p>
                <p className="text-sm">Birthday: {highlight.birthday}</p>
                <p className="text-sm">Gender: {highlight.gender}</p>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">{highlight.title}</h3>
            <ul className="list-disc list-inside mb-2 text-sm">
              {highlight.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="italic mb-4 text-sm">{highlight.description_qoute}</p>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              onClick={() => handleView(highlight, index)}
              disabled={loading && loadingIndex === index}
            >
              {loading && loadingIndex === index ? <Spinner /> : 'View'}
            </button>
            <button 
              className={`px-4 py-2 rounded flex items-center justify-center ${pinnedHighlights.find(highlight => highlight.index === index) ? 'bg-red-500 text-white' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
              onClick={() => handlePin(index)}
            >
              {pinnedHighlights.find(highlight => highlight.index === index) ? 'Unpin' : 'Pin'}
            </button>
            <button 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center justify-center"
              onClick={() => handleRegenerate(index)}
              disabled={loading && regeneratingIndex === index}
            >
              {loading && regeneratingIndex === index ? <Spinner /> : 'Regenerate'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterHighlights;
