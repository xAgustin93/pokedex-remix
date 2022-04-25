import { useState, useEffect } from "react";
import { createFilter } from "react-search-input";
import { getPokemonsAllApi } from "~/api";

const KEYS_TO_FILTERS = ["name"];

export function Search(props) {
  const { className, loadPokemons } = props;
  const [searchText, setSearchText] = useState("");
  const [pokemons, setPokemons] = useState([]);

  const filteredPokemons = pokemons.filter(
    createFilter(searchText, KEYS_TO_FILTERS)
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonsAllApi();
        setPokemons(response.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    if (!searchText) loadPokemons(null);
    else loadPokemons(filteredPokemons);
  };

  return (
    <form onSubmit={onSearch} className={`w-full ${className}`}>
      <input
        placeholder="Busca tu pokemon"
        className="w-full outline-0 bg-slate-300 py-4 px-6 md:rounded-bl-md"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}
