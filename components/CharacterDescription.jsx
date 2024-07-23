'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import { generateHighlights } from "@/llm_langchain";
import Spinner from './Spinner'; 

const CharacterDescription = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit() {
    setLoading(true);
    try {
      let r = await generateHighlights(prompt);
      const highlights = JSON.stringify(r.slice(0, 3)); // Ensure we take the first 3 highlights
      router.push(`/characters/highlights?highlights=${encodeURIComponent(highlights)}`);
    } catch (error) {
      console.error("Failed to generate highlights:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <h2 className='text-3xl text-center font-semibold mb-6'>
        Describe Your Character
      </h2>
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-gray-700 font-bold mb-2'
        >
          Here, you can describe the character you want to create. For better and more accurate results, please include details about the character's personality, behavior, hobbies, and interests.
        </label>
        <textarea
          id='description'
          name='description'
          className='border rounded w-full py-2 px-3'
          maxLength='250'
          rows='10'
          placeholder='Example: Larry is a photographer who’s recently divorced and now is looking for a fresh start. He found Stardew Valley through his friend Abigail and now he’s moving to Stardew Valley.'
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full focus:outline-none focus:shadow-outline"
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <Spinner />
            ) : (
              "Create Character"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CharacterDescription;
