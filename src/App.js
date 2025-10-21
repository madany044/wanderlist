import React, { useState } from 'react';

function App() {
  // State for destinations
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // State for weather
  const [weatherCity, setWeatherCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  // Add destination function
  const addDestination = (e) => {
    e.preventDefault();
    if (newDestination.trim() !== '') {
      const newDest = {
        id: Date.now(),
        name: newDestination.trim(),
        description: newDescription.trim(),
      };
      setDestinations([...destinations, newDest]);
      setNewDestination('');
      setNewDescription('');
    }
  };

  // Delete destination function
  const deleteDestination = (id) => {
    setDestinations(destinations.filter(dest => dest.id !== id));
  };

  // Weather function
  const getWeather = (e) => {
    e.preventDefault();
    setWeatherData({
      condition: 'Sunny',
      temperature: '28°C',
      city: weatherCity
    });
    setWeatherCity('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600">WanderList 🌍</h1>
        <p className="text-gray-600 mt-2">Plan, Explore & View Weather for your dream destinations</p>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        {/* Add Place Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">➕ Add a Place</h2>
          <form onSubmit={addDestination} className="space-y-3">
            <input 
              value={newDestination}
              onChange={(e) => setNewDestination(e.target.value)}
              className="w-full border p-2 rounded-md" 
              placeholder="Enter place name" 
              required
            />
            <textarea 
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full border p-2 rounded-md" 
              placeholder="Description"
            ></textarea>
            <button 
              type="submit" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Place
            </button>
          </form>
        </section>

        {/* Places List Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Saved Places ({destinations.length})
          </h2>
          <div className="space-y-3">
            {destinations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No destinations added yet. Start planning your adventure!</p>
            ) : (
              destinations.map(destination => (
                <div key={destination.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{destination.name}</h3>
                    {destination.description && (
                      <p className="text-gray-600 mt-1">{destination.description}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => deleteDestination(destination.id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition-colors ml-4"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Weather Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">☁️ Weather Info</h2>
          <form onSubmit={getWeather} className="space-y-3">
            <input 
              value={weatherCity}
              onChange={(e) => setWeatherCity(e.target.value)}
              className="w-full border p-2 rounded-md" 
              placeholder="Enter city name" 
            />
            <button 
              type="submit" 
              className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
            >
              Get Weather
            </button>
          </form>

          {weatherData && (
            <div className="mt-4 p-4 bg-sky-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Weather in {weatherData.city}</h3>
              <p className="text-gray-700">Condition: <span className="font-semibold">{weatherData.condition}</span></p>
              <p className="text-gray-700">Temperature: <span className="font-semibold">{weatherData.temperature}</span></p>
            </div>
          )}
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 mt-10">
        Built with ❤️ using React, Node, Flask & MongoDB
      </footer>
    </div>
  );
}

export default App;