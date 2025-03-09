'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import Link from 'next/link';

export default function HealthDashboard() {
  const [healthMetrics, setHealthMetrics] = useState({
    heartRate: [],
    bloodPressure: [],
    stressLevel: [],
    sleepQuality: []
  });

  const [realTimeData, setRealTimeData] = useState({
    currentHeartRate: 72,
    bloodPressure: '120/80',
    stressLevel: 'Moderate',
    sleepHours: 7.5
  });

  useEffect(() => {
    const generateRealTimeData = () => {
      const newHeartRate = Math.floor(Math.random() * (85 - 65 + 1)) + 65;
      const newBloodPressureSystolic = Math.floor(Math.random() * (130 - 110 + 1)) + 110;
      const newBloodPressureDiastolic = Math.floor(Math.random() * (85 - 70 + 1)) + 70;
      const newStressLevel = ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)];
      const newSleepHours = (Math.random() * (8.5 - 6.5) + 6.5).toFixed(1);

      setRealTimeData({
        currentHeartRate: newHeartRate,
        bloodPressure: `${newBloodPressureSystolic}/${newBloodPressureDiastolic}`,
        stressLevel: newStressLevel,
        sleepHours: parseFloat(newSleepHours)
      });

      // Update historical data
      setHealthMetrics(prev => ({
        heartRate: [
          ...prev.heartRate.slice(-10),
          { time: new Date().toLocaleTimeString(), value: newHeartRate }
        ],
        bloodPressure: [
          ...prev.bloodPressure.slice(-10),
          { time: new Date().toLocaleTimeString(), value: newBloodPressureSystolic }
        ],
        stressLevel: [
          ...prev.stressLevel.slice(-10),
          { time: new Date().toLocaleTimeString(), value: newStressLevel === 'Low' ? 1 : newStressLevel === 'Moderate' ? 2 : 3 }
        ],
        sleepQuality: [
          ...prev.sleepQuality.slice(-10),
          { time: new Date().toLocaleTimeString(), value: newSleepHours }
        ]
      }));
    };

    generateRealTimeData();

    const intervalId = setInterval(generateRealTimeData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const HealthMetricCard = ({ title, value, icon, gradient }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        bg-gradient-to-br ${gradient} 
        rounded-2xl p-6 text-white 
        shadow-2xl transform transition-all
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-4xl opacity-70">{icon}</div>
      </div>
    </motion.div>
  );

  const ChartComponent = ({ data, dataKey, title, color }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={3}
            dot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 text-blue-800"
      >
        Patient Health Dashboard
      </motion.h1>
      <Link href="/admintable">
 <button className="px-6 py-3 bg-blue-500 text-white mb-2 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(59,130,246,0.4)] active:translate-y-0 active:shadow-lg">
  Go To RelationShip Table
</button>
</Link>


      {/* Real-Time Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <HealthMetricCard 
          title="Heart Rate"
          value={`${realTimeData.currentHeartRate} bpm`}
          icon="❤️"
          gradient="from-red-400 to-red-600"
        />
        <HealthMetricCard 
          title="Blood Pressure"
          value={realTimeData.bloodPressure}
          icon="💓"
          gradient="from-blue-400 to-blue-600"
        />
        <HealthMetricCard 
          title="Stress Level"
          value={realTimeData.stressLevel}
          icon="😓"
          gradient="from-purple-400 to-purple-600"
        />
        <HealthMetricCard 
          title="Sleep Quality"
          value={`${realTimeData.sleepHours} hrs`}
          icon="😴"
          gradient="from-indigo-400 to-indigo-600"
        />
      </div>

      {/* Historical Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        <ChartComponent 
          data={healthMetrics.heartRate}
          dataKey="value"
          title="Heart Rate Trend"
          color="#FF6384"
        />
        <ChartComponent 
          data={healthMetrics.bloodPressure}
          dataKey="value"
          title="Blood Pressure Trend"
          color="#36A2EB"
        />
        <ChartComponent 
          data={healthMetrics.stressLevel}
          dataKey="value"
          title="Stress Level Tracking"
          color="#9966FF"
        />
        <ChartComponent 
          data={healthMetrics.sleepQuality}
          dataKey="value"
          title="Sleep Quality Analysis"
          color="#4BC0C0"
        />
      </div>

      {/* Recommendations Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-800">
          Personalized Health Recommendations
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Stress Management",
              description: "Practice meditation and deep breathing exercises.",
              icon: "🧘‍♀️"
            },
            {
              title: "Sleep Improvement",
              description: "Maintain consistent sleep schedule and reduce screen time.",
              icon: "😴"
            },
            {
              title: "Heart Health",
              description: "30 minutes of moderate exercise daily recommended.",
              icon: "❤️"
            }
          ].map((rec, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-6 rounded-xl flex items-center space-x-4"
            >
              <div className="text-4xl">{rec.icon}</div>
              <div>
                <h3 className="font-bold text-gray-600 text-xl mb-2">{rec.title}</h3>
                <p className="text-gray-600">{rec.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
