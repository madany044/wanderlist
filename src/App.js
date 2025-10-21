import React, { useState, useEffect } from "react";
import { PlusCircleIcon, CloudIcon, TrashIcon, MapPinIcon, SunIcon } from "@heroicons/react/24/solid";

// Mock API functions - Replace these with your actual API calls
const mockGetPlaces = async () => [
  { _id: "1", name: "Paris, France", description: "City of Love" },
  { _id: "2", name: "Tokyo, Japan", description: "Beautiful temples and cuisine" },
];

const mockAddPlace = async (place) => {
  console.log("Adding place:", place);
  return { success: true };
};

const mockDeletePlace = async (id) => {
  console.log("Deleting place:", id);
  return { success: true };
};

const mockGetWeather = async (city) => ({
  weather: {
    condition: "Sunny",
    temp: 22.5,
    city: city
  }
});

function App() {
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({ name: "", description: "" });
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("places");

  // Load mock data
  useEffect(() => {
    const loadPlaces = async () => {
      const data = await mockGetPlaces();
      setPlaces(data);
    };
    loadPlaces();
  }, []);

  const handleAddPlace = async (e) => {
    e.preventDefault();
    if (!newPlace.name.trim()) return;

    setLoading(true);
    await mockAddPlace(newPlace);
    
    const newPlaceObj = {
      _id: Date.now().toString(),
      name: newPlace.name,
      description: newPlace.description
    };
    
    setPlaces([...places, newPlaceObj]);
    setNewPlace({ name: "", description: "" });
    setLoading(false);
  };

  const handleDeletePlace = async (id) => {
    await mockDeletePlace(id);
    setPlaces(places.filter(place => place._id !== id));
  };

  const handleGetWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    const data = await mockGetWeather(city);
    setWeather(data.weather);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Main Container */}
      <div className="min-h-screen backdrop-blur-lg bg-white/10">
        {/* Header */}
        <header className="text-center pt-8 pb-6">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
              ✈️ WanderList
            </h1>
            <p className="text-white/80 text-lg font-light">
              Your Personal Travel Companion
            </p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="flex space-x-1 bg-white/20 backdrop-blur-sm rounded-2xl p-1">
            <button
              onClick={() => setActiveTab("places")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === "places"
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white/80 hover:text-white"
              }`}
            >
              My Places
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === "add"
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Add New
            </button>
            <button
              onClick={() => setActiveTab("weather")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === "weather"
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Weather
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 pb-12">
          {/* Add Place Tab */}
          {activeTab === "add" && (
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlusCircleIcon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Add New Destination</h2>
                <p className="text-white/70">Where do you want to wander next?</p>
              </div>

              <form onSubmit={handleAddPlace} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Destination Name *
                  </label>
                  <input
                    value={newPlace.name}
                    onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter destination name..."
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={newPlace.description}
                    onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
                    rows="4"
                    className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm resize-none"
                    placeholder="Add some notes about this place..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !newPlace.name.trim()}
                  className="w-full bg-white text-purple-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 disabled:bg-white/50 disabled:text-purple-400 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                >
                  {loading ? "Adding..." : "✨ Add to WanderList"}
                </button>
              </form>
            </div>
          )}

          {/* Places Tab */}
          {activeTab === "places" && (
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">My Destinations</h2>
                <p className="text-white/70">{places.length} amazing places to explore</p>
              </div>

              {places.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPinIcon className="w-16 h-16 text-white/50" />
                  </div>
                  <h3 className="text-2xl font-bold text-white/80 mb-3">No destinations yet</h3>
                  <p className="text-white/60 text-lg">Add your first destination to get started!</p>
                  <button
                    onClick={() => setActiveTab("add")}
                    className="mt-6 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-xl font-semibold transition-all border border-white/30"
                  >
                    Add First Destination
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {places.map((place) => (
                    <div
                      key={place._id}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {place.name}
                          </h3>
                          {place.description && (
                            <p className="text-white/70 text-lg">
                              {place.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeletePlace(place._id)}
                          className="ml-4 bg-red-500/20 hover:bg-red-500/30 text-red-200 p-3 rounded-xl transition-all duration-200 group-hover:scale-110 border border-red-500/30"
                          title="Delete destination"
                        >
                          <TrashIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Weather Tab */}
          {activeTab === "weather" && (
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CloudIcon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Weather Forecast</h2>
                <p className="text-white/70">Check weather for any destination</p>
              </div>

              <form onSubmit={handleGetWeather} className="space-y-6 mb-8">
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">
                    City Name
                  </label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter city name..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !city.trim()}
                  className="w-full bg-white text-purple-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 disabled:bg-white/50 disabled:text-purple-400 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                      Checking Weather...
                    </div>
                  ) : (
                    "🌤️ Get Weather Forecast"
                  )}
                </button>
              </form>

              {weather && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center animate-fade-in">
                  <SunIcon className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {weather.city}
                  </h3>
                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-white/60 text-sm mb-1">Condition</p>
                      <p className="text-white text-xl font-semibold capitalize">
                        {weather.condition}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-white/60 text-sm mb-1">Temperature</p>
                      <p className="text-white text-xl font-semibold">
                        {weather.temp}°C
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-white/60 font-light">
            Made with ❤️ for wanderers and dreamers
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;