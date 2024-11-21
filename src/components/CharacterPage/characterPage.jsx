import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CharacterPage() {
      const {id} = useParams()
      const [char, SetChar] = useState()
    
      useEffect(() => {
        const fetchData = async () => {
          try {
    
            const response = await fetch(
              `https://rickandmortyapi.com/api/character/${id}`
            );
            const data = await response.json();
            SetChar(data)
            console.log(data)
    
  
          } catch (error) {
            console.error("Error fetching data:", error);
 
          }
        };
    
        fetchData();
      }, [id]); 
    

    return (
      <div className="characters">
        {char?.name}
      </div>
    )
    
}