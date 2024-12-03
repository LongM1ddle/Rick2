import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import locationsLogo from "../../assets/locations-logo.svg";

export default function LocationList() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
        const data = await response.json();

        if (page === 1) {
          setLocations(data.results || []);
        } else {
          setLocations((prev) => [...prev, ...(data.results || [])]);
        }

        setHasMore(data.info?.next !== null);
      } catch (error) {
        console.error("Error", error);
        setLocations([]);
        setHasMore(false);
      }
    };

    fetchLocations();
  }, [page]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredLocations(locations);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredLocations(
        locations.filter((location) =>
          location.name.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [search, locations]);

  const handleLocationClick = (id) => {

    navigate(`/location/${id}`);
  };

  return (
    <div className="location-container">
      <p> <img src={locationsLogo} alt="Locations Logo" /></p>

      <input
        type="text"
        className="locations-input"
        placeholder="Filter by location name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="location-list">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <div
              className="location-card"
              key={location.id}
              onClick={() => handleLocationClick(location.id)} 
            >
              <h2>{location.name}</h2>
              <p>
                <strong>Type:</strong> {location.type}
              </p>
              <p>
                <strong>Dimension:</strong> {location.dimension}
              </p>
            </div>
          ))
        ) : (
          <p>No locations found</p>
        )}
      </div>
      <br />

      {hasMore && !search && (
        <button className="load-more" onClick={() => setPage((prev) => prev + 1)}>
          Load More
        </button>
      )}
    </div>
  );
}
