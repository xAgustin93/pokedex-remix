import { useState } from "react";
import { useLoaderData, json } from "remix";
import { Header, PokeGrid, PokemonInfo, Search } from "~/components";
import { getPokemonsApi, getPokemonsByUrlApi } from "~/api";

export default function Index() {
  const data = useLoaderData();
  const [pokemons, setPokemons] = useState(data.results);
  const [pokemonSearch, setPokemonsSearch] = useState(null);
  const [nextUrl, setNextUrl] = useState(data.next);
  const [pokemonSelected, setPokemonSelected] = useState();

  const loadMore = async () => {
    if (nextUrl) {
      const response = await getPokemonsByUrlApi(nextUrl);
      setNextUrl(response.next);
      setPokemons([...pokemons, ...response.results]);
    }
  };

  const checkPokemon = (pokemon) => {
    setPokemonSelected(pokemon);
  };

  return (
    <div>
      <Header />
      <div className="md:flex">
        <Search loadPokemons={setPokemonsSearch} className="md:hidden" />

        <div className="w-full h-[200px] flex flex-col items-end px-9 pb-5 md:hidden">
          <PokemonInfo pokemon={pokemonSelected} />
        </div>

        <div className="w-6/6 md:w-4/6">
          <PokeGrid
            pokemons={pokemonSearch || pokemons}
            loadMore={loadMore}
            nextUrl={nextUrl}
            checkPokemon={checkPokemon}
            pokemonSelected={pokemonSelected}
            pokemonSearch={pokemonSearch}
          />
        </div>
        <div className="w-6/6 hidden md:w-2/6 md:h-[calc(100vh-72px)] md:flex md:flex-col md:items-center md:justify-between">
          <Search loadPokemons={setPokemonsSearch} />
          <PokemonInfo pokemon={pokemonSelected} />
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  try {
    const response = await getPokemonsApi();
    return json(response);
  } catch (error) {
    console.log(error);
  }
}
