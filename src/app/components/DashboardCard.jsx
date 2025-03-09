export default function DashboardCard() {
  const cards = [
    {
      title: 'COVID Updates',
      description: 'Latest information and statistics',
      icon: '🦠',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Heart Health',
      description: 'Tips for cardiovascular wellness',
      icon: '❤️',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Mental Wellness',
      description: 'Strategies for mental health',
      icon: '🧠',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`${card.bgColor} p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform`}
        >
          <div className="text-4xl mb-4">{card.icon}</div>
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p className="text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
