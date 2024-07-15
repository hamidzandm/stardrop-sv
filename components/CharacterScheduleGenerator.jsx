'use client'
import { useState } from 'react';
import { generateSchedule } from '@/llm_langchain';
import Spinner from './Spinner';

const CharacterScheduleGenerator = ({ expansion }) => {
    const [scheduleJSON, setScheduleJSON] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateSchedule = async () => {
        setLoading(true);
        try {
            const schedule = await generateSchedule(expansion);
            setScheduleJSON(JSON.stringify(schedule, null, 2)); // Pretty print JSON
        } catch (error) {
            console.error("Failed to generate schedule:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Generate Schedule</h2>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                onClick={handleGenerateSchedule}
                disabled={loading}
            >
                {loading ? <Spinner /> : 'Generate Schedule'}
            </button>
            {scheduleJSON && (
                <pre className="bg-white p-4 rounded shadow-md">{scheduleJSON}</pre>
            )}
        </div>
    );
};

export default CharacterScheduleGenerator;
