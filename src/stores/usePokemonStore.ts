import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemonStore', {
  state: () => ({
    pokemons: new Map<string, any>()
  }),
  actions: {
    async loadPokemons() {
      try {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1017').then((res) =>
          res.json()
        )
        const pokemons = data.results
        const chunkSize = 50
        const pokemonList: any[] = []

        for (let i = 0; i < pokemons.length; i += chunkSize) {
          const chunks = pokemons.slice(i, i + chunkSize)
          const promises = chunks.map((pokemon: any) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then((res) => res.json())
          )
          const results = await Promise.all(promises)
          results.forEach((pokemonData) => pokemonList.push(pokemonData))

          const transformedPokemons = pokemonList.map((pokemon) => ({
            abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
            moves: pokemon.moves.map((move: any) => move.move.name),
            stats: pokemon.stats.map((stat: any) => ({
              name: stat.stat.name,
              base: stat.base_stat
            })),
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            types: pokemon.types.map((type: any) => type.type.name)
          }))
          this.addPokemons(transformedPokemons)
        }
      } catch (error) {
        console.error('Failed to load pokemons:', error)
        /* 
          Handling error manually since using fetch
        */
      }
    },
    addPokemons(transformedPokemons: any[]) {
      transformedPokemons.forEach((pokemon) => this.pokemons.set(pokemon.name, pokemon))
      this.savePokemonsData()
    },
    savePokemonsData() {
      const pokemonsArray = Array.from(this.pokemons.values())
      localStorage.setItem('pokemons', JSON.stringify(pokemonsArray))
    }
  }
})
