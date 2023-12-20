import { onMounted, ref, computed } from 'vue';
import { usePokemonStore } from '../stores/usePokemonStore';

export function usePokemon() {
  const pokemonStore = usePokemonStore();
  const pokemonArray = ref([]);
  const pokemons = computed(() => pokemonStore.pokemons);
  const colors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };
  const pokeTypes = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic', 
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy'
  ];

  async function loadAllPokemons() {
    if (localStorage.getItem('pokemons')) {
      recoverDataFromLocalStorage();
    } else {
      await pokemonStore.loadPokemons();
    }
  }

  function recoverDataFromLocalStorage() {
    pokemonArray.value = JSON.parse(localStorage.getItem('pokemons') || '[]');
    pokemonStore.addPokemons(pokemonArray.value);
  }

  onMounted(loadAllPokemons);

  return { pokemons, colors, pokeTypes };
}
