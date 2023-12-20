<template>
  <v-card flat>
    <v-card-title class="d-flex align-center ga-1">
      <v-spacer></v-spacer>
      
      <span id="filter-description" class="visually-hidden">Select multiple types to filter Pokemon</span>
      <v-combobox
        v-model="selectedTypes"
        :items="pokeTypes"
        density="compact"
        chips
        clearable
        label="Filter Pokemon by type"
        multiple
        closable-chips
        variant="outlined"
        class="search-fields"
        aria-describedby="filter-description"
      >
      </v-combobox>
      
      <v-text-field
        clearable
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        label="Search Pokemon"
        single-line
        flat
        hide-details
        variant="outlined"
        aria-label="Search Pokemon by name"
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table
      v-model:search="search"
      :items="filteredPokemons"
      :headers="headers"
      :filter-keys="['id', 'name']"
      fixed-header
      height="88vh"
      aria-label="List of Pokemons"
    >
      <template v-slot:item.name="{ item }">
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{ path: '/pokemon/' + item.name }"
          aria-label="View details of: {{ item.name }}"
        >
          {{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}
        </router-link>
      </template>

      <template v-slot:item.image="{ item }">
        <v-card class="my-2" elevation="0" rounded>
          <v-img :src="item.image" height="90" width="90" cover alt="Image of: {{ item.name }}"></v-img>
        </v-card>
      </template>

      <template v-slot:item.types="{ item }">
        <div class="d-flex ga-1" role="list" aria-label="Types of: {{ item.name }}">
          <v-chip
            v-for="types in item.types"
            :key="types"
            :color="colors[types]"
            :text="types"
            class="text-uppercase"
            label
            size="small"
            role="listitem"
            @click="addType(types)"
          ></v-chip>
        </div>
      </template>
    </v-data-table>
  </v-card>  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import { usePokemonStore } from '../stores/usePokemonStore';
  import { useRoute } from 'vue-router';
  import { usePokemon } from '../composables/usePokemon';

  export default defineComponent({
    name: 'PokemonList',
    setup() {
      const pokemonStore = usePokemonStore();
      const { pokemons, colors, pokeTypes } = usePokemon();
      const route = useRoute();
      const headers = [
        { title: '#', key: 'id' },
        { title: 'Name', key: 'name' },
        { title: 'Image', key: 'image', sortable: false },
        { title: 'Types', key: 'types', sortable: false }
      ];
      const search = ref('');
      const selectedTypes = ref<string[]>([]);
  
      const addType = (type: string) => {
        if (!selectedTypes.value.includes(type)) {
          selectedTypes.value.push(type);
        }
      };
  
      const filteredPokemons = computed(() => {
        if (selectedTypes.value.length === 0) {
          return Array.from(pokemonStore.pokemons.values());
        }
        return Array.from(pokemonStore.pokemons.values()).filter(pokemon =>
          pokemon.types.some((type: string) => selectedTypes.value.includes(type))
        );
      });
  
      return {
        headers,
        search,
        selectedTypes,
        filteredPokemons,
        addType,
        pokemons,
        colors,
        pokeTypes
      };
    }
  });
  </script>
  
  <style scoped>
  .search-fields {
    height: 40px
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  </style>å