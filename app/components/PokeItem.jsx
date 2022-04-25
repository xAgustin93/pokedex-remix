import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePokemon } from "~/hooks";

export function PokeItem(props) {
  const { urlPokemon, checkPokemon, pokemonSelected } = props;
  const { loading, pokemon, getPokemonByUrl } = usePokemon();

  useEffect(() => getPokemonByUrl(urlPokemon), [urlPokemon]);

  const setPokemon = () => {
    checkPokemon(pokemon);
  };

  if (!pokemonSelected) setPokemon();

  if (loading) {
    return (
      <div className="w-24 h-24 flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin w-7 h-7" />
      </div>
    );
  }

  return (
    <div
      className="hover:bg-slate-500 h-24 rounded-md hover:cursor-pointer w-full flex item-center justify-center"
      onClick={setPokemon}
    >
      <img src={pokemon.sprites.front_default} />
    </div>
  );
}
