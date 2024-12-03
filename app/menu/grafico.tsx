import React, { useState, useEffect } from 'react';

export default function TrainingProgress() {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('/api/training-progress');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching training progress data:', error);

        // Use a simulated data object if the fetch fails
        setData({
          interviewScore: 85,
          interviewScoreChange: 10,
          technicalSkills: 90,
          technicalSkillsChange: 5,
          softSkills: 80,
          softSkillsChange: 8,
          performanceTrends: [
            { x: 1, y: 80 },
            { x: 2, y: 85 },
            { x: 3, y: 90 },
            { x: 4, y: 85 },
            { x: 5, y: 88 },
          ],
        });
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="bg-gray-900 p-8 rounded-lg">
        <h2 className="text-white text-2xl font-bold mb-4">Training Progress</h2>
        <p className="text-gray-400 mb-8">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-items-center p-8 rounded-lg">
      <h2 className="text-white text-2xl font-bold mb-1 text-center">Progresso de treino</h2>
      <p className="text-gray-400 mb-8 text-center">Acompanhe sua evolução conosco</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-medium mb-2">Pontuação</h3>
          <p className="text-green-500 text-4xl font-bold">{data.interviewScore}%</p>
          <p className="text-green-500 text-sm">+{data.interviewScoreChange}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-medium mb-2">Hard Skills</h3>
          <p className="text-green-500 text-4xl font-bold">{data.technicalSkills}%</p>
          <p className="text-green-500 text-sm">+{data.technicalSkillsChange}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-medium mb-2">Soft Skills</h3>
          <p className="text-green-500 text-4xl font-bold">{data.softSkills}%</p>
          <p className="text-green-500 text-sm">+{data.softSkillsChange}%</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-white font-medium mb-2">Dashboard</h3>
        <div className="h-40 bg-gray-800 rounded-lg">
          {/* Render the performance trends chart here */}
        </div>
      </div>
    </div>
  );
};

