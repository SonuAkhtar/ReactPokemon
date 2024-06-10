import { useEffect, useState } from "react";
import { fetchApiData } from "../fetchApiData";
import "./pokemon.css";

const Pokemon = () => {
  const [pokeData, setPokeData] = useState();
  const [onePokemon, setOnePokemon] = useState({});
  const [cacheAPI, setCacheAPI] = useState({});

  // Methods to Fetch all Pokemons data
  const fetchAllPokemons = async () => {
    let data = await fetchApiData("https://pokeapi.co/api/v2/pokemon");
    setPokeData(data.results);
  };

  // Methods to Fetch selected Pokemon data
  const handlePokemonSelect = async (e) => {
    let OnePokemonUrl = e.target.value;

    if (!cacheAPI[OnePokemonUrl]) {
      let data = await fetchApiData(OnePokemonUrl);
      setOnePokemon(data);
      setCacheAPI({ ...cacheAPI, [OnePokemonUrl]: data });
    } else {
      setOnePokemon(cacheAPI[OnePokemonUrl]);
    }
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  return (
    <div className="pok__container">
      <h2>Select A Pokemon</h2>

      <div className="select__wrapper">
        <select name="pokemon" onChange={handlePokemonSelect}>
          <option value="" hidden>
            Select a Pokemon
          </option>
          {pokeData?.map((val, index) => (
            <option key={index} value={val.url}>
              {val.name}
            </option>
          ))}
        </select>

        <div className="pokemon__details">
          <h2>Pokemon Details</h2>

          <div className="details__wrapper">
            <ul>
              {onePokemon?.abilities?.map((val, i) => (
                <li key={i}>{val.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
