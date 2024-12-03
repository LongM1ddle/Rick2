import { useState, useEffect } from "react";
import episodesLogo from "../../assets/episodes-logo.svg"

export default function EpisodeList() {
  const [episodes, setEpisodes] = useState([])
  const [search, setSearch] = useState("")
  const [filteredEpisodes, setFilteredEpisodes] = useState([])
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
        const data = await response.json();

        if (page === 1) {
          setEpisodes(data.results || []);
        } else {
          setEpisodes((prev) => [...prev, ...(data.results || [])]);
        }

        setHasMore(data.info?.next !== null);
      } catch (error) {
        console.error("Error", error);
        setEpisodes([]);
        setHasMore(false);
      }
    };

    fetchEpisodes();
  }, [page]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredEpisodes(episodes);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredEpisodes(
        episodes.filter(
          (episode) =>
            episode.name.toLowerCase().includes(lowerSearch) ||
            episode.episode.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [search, episodes]);

  return (
    <div className="episode-container">
       <p> <img src={episodesLogo}></img></p>


      <input
        type="text"
        className="input-filter"
        placeholder="Filter by name or episode (ex. S01 or S01E02)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="episode-list">
        {filteredEpisodes.length > 0 ? (
          filteredEpisodes.map((episode) => (
            <div className="episode-card" key={episode.id}>
              <h2>{episode.name}</h2>
              <p>
                {episode.air_date}
              </p>
              <p>
               <strong>{episode.episode}</strong>
              </p>
            </div>
          ))
        ) : (
          <p>No episodes found</p>
        )}
      </div>
      <br></br>

      {hasMore && !search && (
        <button className="load-more" onClick={() => setPage((prev) => prev + 1)}>
          Load More
        </button>
      )}
    </div>
  );
}
