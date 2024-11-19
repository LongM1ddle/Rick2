import { useState, useEffect } from "react";
import pickle from "//assets/pickle.webp";

export default function CharacterFilter() {
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        if (species) params.append("species", species);
        if (gender) params.append("gender", gender);
        if (status) params.append("status", status);
        if (name) params.append("name", name);
        params.append("page", page);

        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?${params.toString()}`
        );
        const data = await response.json();

        if (page === 1) {
          setCharacters(data.results || []);
        } else {
          setCharacters((prev) => [...prev, ...(data.results || [])]);
        }

        setHasMore(data.info?.next !== null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCharacters([]);
        setHasMore(false);
      }
    };

    fetchData();
  }, [species, gender, status, name, page]); 

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [species, gender, status, name]);

  return (
    <div className="everything">
      <div className="filters">
      <input
        type="text"
        placeholder="Filter by name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={species} onChange={(e) => setSpecies(e.target.value)}>
        <option value="" disabled hidden>
          Species
        </option>
        <option value="human">Human</option>
        <option value="alien">Alien</option>
      </select>

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="" disabled hidden>
          Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="" disabled hidden>
          Status
        </option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <div className="characters">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div className="charpage" key={character.id}>
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <p>{character.status} - {character.gender}</p>
            </div>
          ))
        ) : (
          <div className="no-data">
            <img src={pickle} alt="No Data" />
            <h2>Waba Laba Dub Dub! No Data!</h2>
          </div>
        )}
      </div>
      </div>
      {hasMore && (
        <button onClick={() => setPage((prev) => prev + 1)}>Show More</button>
      )}
    </div>
  );
}
