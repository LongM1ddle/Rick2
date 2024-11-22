import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import arrow from "../../assets/arrow.svg";

export default function CharacterPage() {
  const { id } = useParams();
  const [char, SetChar] = useState();
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();
        SetChar(data);
        console.log(data);

        const episodeResponse = await Promise.all(
          data.episode.map((url) => fetch(url).then((res) => res.json()))
        );
        setEpisodes(episodeResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="character">
      <img src={char?.image}></img>
      <h2>{char?.name}</h2>

      <div className="char-info">
        <div className="char-info-left">
          <div>
            <h3>Gender</h3> <p>{char?.gender}</p>
          </div>
          <div>
            <h3>Status</h3> {char?.status}
          </div>
          <div>
            <h3>Specie</h3> <p>{char?.species}</p>
          </div>
          <div>
            <h3>Origin</h3> <p>{char?.origin.name}</p>
          </div>
          <div>
            <h3>Type</h3> <p>{char?.type ? char.type : "Unknown"}</p>
          </div>
          <div className="location">
            <h3>Location</h3>{" "}
            <p>
              {char?.location.name}
              <div className="arrow-image">
                <img src={arrow}></img>
              </div>
            </p>
          </div>
        </div>
        <div className="char-info-right">
          {episodes.slice(0, 4).map((episode) => (
            <div className="episode" key={episode.id}>
              <h3>{episode.episode}</h3>
              <p>{episode.name}</p>
              <p className="release-date">{episode.air_date}</p>
              <div className="arrow-image2">
                <img src={arrow}></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
