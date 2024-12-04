import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TrainingProgress() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Função para buscar os dados do progresso no backend
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Supondo que o token JWT esteja armazenado no localStorage
        const response = await fetch('/api/progress', {
          headers: {
            Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho da requisição
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch progress data');
        }

        const progressData = await response.json();

        // Estrutura os dados para o componente
        setData({
          interviewScore: progressData.softSkills.currentLevel,
          interviewScoreChange: progressData.softSkills.totalProgress, // Alteração no progresso
          technicalSkills: progressData.hardSkills.currentLevel,
          technicalSkillsChange: progressData.hardSkills.totalProgress, // Alteração no progresso
          performanceTrends: progressData.performanceTrends || [
            // Simulação de dados de tendência
            { x: 1, hardSkills: 80, softSkills: 70 },
            { x: 2, hardSkills: 85, softSkills: 75 },
            { x: 3, hardSkills: 90, softSkills: 80 },
            { x: 4, hardSkills: 95, softSkills: 85 },
          ],
        });
      } catch (error) {
        console.error('Error fetching training progress data:', error);

        // Use dados simulados caso a requisição falhe
        setData({
          interviewScore: 85,
          interviewScoreChange: 10,
          technicalSkills: 90,
          technicalSkillsChange: 5,
          softSkills: 80,
          softSkillsChange: 8,
          performanceTrends: [
            { x: 1, hardSkills: 80, softSkills: 70 },
            { x: 2, hardSkills: 10, softSkills: 75 },
            { x: 3, hardSkills: 90, softSkills: 80 },
            { x: 4, hardSkills: 95, softSkills: 85 },
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
          <h3 className="text-white font-medium mb-2">Pontuação média</h3>
          <p className="text-green-500 text-4xl font-bold">{data.interviewScore}%</p>
          <p className="text-green-500 text-sm">+{data.interviewScoreChange}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-medium mb-2">Soft Skills</h3>
          <p className="text-green-500 text-4xl font-bold">{data.interviewScore}%</p>
          <p className="text-green-500 text-sm">+{data.interviewScoreChange}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-medium mb-2">Hard Skills</h3>
          <p className="text-green-500 text-4xl font-bold">{data.technicalSkills}%</p>
          <p className="text-green-500 text-sm">+{data.technicalSkillsChange}%</p>
        </div>
      </div>

      
        {/* Gráfico de performance */}

      <div className="mt-8 flex-items-center">
        <h3 className="text-white font-medium mb-2 text-center">Dashboard</h3>
        <div className="bg-gray-800 p-6 rounded-lg flex justify-center items-center">
          <LineChart
            width={800}
            height={400}
            data={data.performanceTrends}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hardSkills" stroke="#82ca9d" name="Hard Skills" />
            <Line type="monotone" dataKey="softSkills" stroke="#8884d8" name="Soft Skills" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
