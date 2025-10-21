const API_BASE = import.meta.env.VITE_API_URL || "https://wanderlist-t6uk.onrender.com/api";


export async function getPlaces() {
  const res = await fetch(`${API_BASE}/places`);
  return res.json();
}

export async function addPlace(data) {
  const res = await fetch(`${API_BASE}/places`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePlace(id) {
  const res = await fetch(`${API_BASE}/places/${id}`, { method: "DELETE" });
  return res.json();
}

export async function getWeather(city) {
  const res = await fetch(`${API_BASE}/weather/${city}`);
  return res.json();
}
