import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [Pokedex_Url, setPokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );

  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  async function downloadPokemons() {
    setisLoading(true);
    const response = await axios.get(Pokedex_Url); //this downloads the list of 20 pokemons
    const pokemonResult = response.data.results; //we get the array of pokemons from results
    console.log(response.data);

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    //iterating over the pokemonResult and using their url , to create an array of promises that will download those 20 pokemons
    const pokemonResultPromises = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    //passign that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromises); //array of 20 pokemons detailed data
    console.log(pokemonData);

    //iterate on the data of each pokemon and extract id ,name, image, and types

    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        name: pokemon.name,
        id: pokemon.id,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(pokeListResult);
    setPokemonList(pokeListResult);
    setisLoading(false);
  }
  useEffect(() => {
    downloadPokemons();
  }, [Pokedex_Url]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading
          ? " Loading..."
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>

      <div className="controls">
        <button disabled={prevUrl == null}onClick={() => setPokedexUrl(prevUrl)} >
          Prev
        </button>
        <button
          disabled={nextUrl == null}
          onClick={() => setPokedexUrl(nextUrl)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
