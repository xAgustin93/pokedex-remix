import { useState } from "react";
import { getPokemonByUrlApi } from "~/api";

export function usePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPokemonByUrl = async (url) => {
    try {
      setLoading(true);
      const data = await getPokemonByUrlApi(url);
      setPokemon(data);
      setLoading(false);
    } catch (error) {
      return null;
    }
  };

  return {
    pokemon,
    getPokemonByUrl,

    loading,
  };
}
