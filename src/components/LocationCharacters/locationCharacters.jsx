import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 

export default function LocationCharacters() {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location/${locationId}`);
        const data = await response.json();
        setLocation(data);
        setLoading(false);
        const charactersPromises = data.residents.map((url) => fetch(url).then((res) => res.json()));
        const charactersData = await Promise.all(charactersPromises);
        setCharacters(charactersData);
      } catch (error) {
        console.error("Error fetching location details:", error);
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [locationId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="location-details-container">
      <h1>{location.name}</h1>
      <h2>Residents:</h2>
      <div className="character-list">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div className="character-card" key={character.id}>
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <p>{character.species}</p>
            </div>
          ))
        ) : (
          <p>No characters found in this location.</p>
        )}
      </div>
    </div>
  );
}
