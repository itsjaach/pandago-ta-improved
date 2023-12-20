<template>
  <v-card height="100vh">
    <v-card-title class="d-flex align-center">
      <router-link
        to="/"
        style="text-decoration: none; color: inherit"
        aria-label="Go back to main page"
      >
        <v-icon icon="mdi-home"></v-icon>
      </router-link>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider></v-divider>

    <v-row justify="center" class="mt-1">
      <v-col>
        <v-card>
          <v-row class="align-end">
            <v-col cols="8">
              <div>
                <v-card-title>{{ pokemon.name.toUpperCase() }}</v-card-title>
                <v-card-subtitle class="mb-4">#{{ pokemon.id }}</v-card-subtitle>
                <div class="mt-4 ml-4" role="list" aria-label="Types">
                  <v-chip
                    v-for="types in pokemon.types"
                    :key="types"
                    :color="colors[types]"
                    class="text-uppercase"
                    label
                    size="small"
                    role="listitem"
                  >
                    {{ types }}
                  </v-chip>
                </div>
              </div>
            </v-col>

            <v-col cols="4">
              <v-img :src="pokemon.image" height="100px" alt="Image of {{ pokemon.name }}"></v-img>
            </v-col>
          </v-row>

          <v-card-text>
            <div>
              <h3>Abilities</h3>
              <div class="mt-4">
                <v-chip-group :disabled="true" role="list" aria-label="Abilities">
                  <v-chip
                    v-for="ability in pokemon.abilities"
                    :key="ability"
                    class="text-uppercase"
                    label
                    size="small"
                    variant="plain"
                    role="listitem"
                  >
                    {{ ability }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>

            <div class="my-4">
              <h3>Stats</h3>
              <v-list role="list">
                <v-list-item v-for="stat in pokemon.stats" :key="stat.name" role="listitem">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ stat.name.toUpperCase() }}: {{ stat.base }}</v-list-item-title
                    >
                    <v-progress-linear
                      :model-value="stat.base"
                      height="5"
                      color="rgba(255, 255, 255, 0.3)"
                      opacity="0.1"
                      aria-label="Stat value for {{ stat.name }}"
                    ></v-progress-linear>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>

            <div>
              <h3>Movements</h3>
              <div class="mt-4">
                <v-chip-group
                  style="max-height: 25vh"
                  :disabled="true"
                  role="list"
                  aria-label="Moves"
                >
                  <v-chip
                    v-for="move in pokemon.moves"
                    :key="move"
                    class="ma-1 text-uppercase"
                    label
                    size="small"
                    variant="plain"
                    role="listitem"
                  >
                    {{ move }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { usePokemonStore } from '../stores/usePokemonStore'
import { useRouter } from 'vue-router'
import { usePokemon } from '../composables/usePokemon';

export default defineComponent({
  name: 'PokemonInfo',
  setup() {
    const { pokemons, colors, pokeTypes } = usePokemon();
    const pokemonStore = usePokemonStore()
    const router = useRouter()
    const name = ref(router.currentRoute.value.params.name)
    const pokemon = computed(() => pokemonStore.pokemons.get(name.value))

    onMounted(() => {
      if (!pokemon.value && !pokemonStore.pokemons.has(name.value)) {
        pokemonStore.loadPokemons()
      }
    })

    return {
      name,
      pokemons,
      colors,
      pokeTypes,
      pokemon 
    }
  }
})
</script>

<style scoped>
.v-chip {
  margin-right: 4px;
}
</style>
