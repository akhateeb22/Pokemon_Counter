<template>
<div>
  <div v-if="pokemons">
    <h1 id="header">Total Resets: {{ totalResets }}</h1> 
    <div id="body">
    <TransitionGroup class="transitionPokemons" name="list" tag="div">
      <template v-for="pokemon in pokemons" :key="pokemon.id">
        <pokemon
          :pokemon="pokemon"
          @countChanged="setFullCounter"
          @deletePokemon="deletePokemon"
        />
      </template>
    </TransitionGroup>
    </div>
    <div id="footer">
      <input class="addPokemonField" @keyup.enter="addPokemon" type="text" v-model="newPokemonName">
      <button class="addPokemonButton" @click="addPokemon">Confirm</button>
    </div>
  </div>
  <div v-else>
    <h2>API could not be reached</h2>
  </div>
</div>

</template>

<script>
import router from './mixins/router.js'
import pokemon from './components/pokemon.vue'
import {Pokemon} from './components/Pokemon.js'

export default {
  name: 'App',

  components: { pokemon },
  mixins: [router],

  data() {
    return {
      totalResets: 0,
      pokemons: [],
      newPokemonName: ''
    }
  },

  async created() {
    await this.init()
  },

  methods: {
    async init() {
      await this.setPokemons()
      await this.setFullCounter(false)
    },

    async setPokemons() {
      let pkmns = []
      let p = await this.get()
      p.forEach((pokemon) => {
        pkmns.push(new Pokemon(pokemon.id, pokemon.name, pokemon.count, pokemon.freezed))
      })
      this.pokemons = pkmns
    },

    async addPokemon() {
      if (!this.newPokemonName) {
        return
      }

      const pokemon = new Pokemon(this.getNextAvailableId(), this.newPokemonName)

      const p = this.assignPokemon(pokemon, true)
      await this.savePokemons(p)

      this.newPokemonName = ''
    },

    async deletePokemon(p) {
      const pkmns = this.pokemons.filter((pokemon) => { 
        return pokemon.id !== p.id;
      })

      await this.savePokemons(JSON.parse(JSON.stringify(pkmns)))
    },

    async setFullCounter(save = true) {
      this.totalResets = 0;
      this.pokemons.forEach((pokemon) => {
        this.totalResets += pokemon['count']
      })
      
      if (save) {
        await this.savePokemons(JSON.parse(JSON.stringify(this.pokemons)))
      }
    },

    assignPokemon(pokemon, add = false) {
      let p
      
      if (!add) {
        p = Object.assign(this.pokemons, pokemon)
      } else {
        p = JSON.parse(JSON.stringify(this.pokemons))
        p.push(pokemon)
      }
      
      return p
    },

    async savePokemons(p) {
      if (await this.post(p)) {
        console.error('something went wrong')
      }

      await this.init()
    },

    getNextAvailableId() {
      if (this.pokemons.length === 0) {
        return 0
      }
      
      let ids = []
      this.pokemons.forEach((pokemon) => {
        ids.push(pokemon['id'])
      })

      ids = ids.sort()

      for (let i = 0; i < ids.length; i++) {
        if (i !== ids[i]) {
          return i
        }
      }

      return this.pokemons.length
    }
  }
}
</script>

<style>
body {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: rgb(77, 77, 77);
  background-color: rgb(235, 235, 235);
}

.countUp {
  background-color: rgb(28, 180, 28);
}

.countDown {
  background-color: rgb(255, 40, 40);
}

#body .transitionPokemons {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

#footer {
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  margin-top: 20px;
  transition: all .3s ease-in-out;
  align-items: center;
}

button {
  transition: all 150ms ease-in-out;
}

.pokemon {
  margin: 0;
  display: grid;
  column-gap: 20px;
  grid-template-columns: auto auto auto 190px auto auto;
  border: 2px solid gray;
  padding: 15px;
  width: fit-content;
  border-radius: 12px;
  align-items: center;
  background-color: rgb(248, 248, 248);
  transition: all .3s ease-in-out;
}

.pokemon button {
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 2.25rem;
  color: white;
  height: 50px;
  width: 50px;
}

.pokemon h2 {
  margin: auto 0;
}

.pokemon .name {
  border-left: 1px solid rgb(77, 77, 77);
  padding-left: 20px;
}

.counter, .addPokemonField {
  color: rgb(77, 77, 77);
}

.counter {
  border: 2px solid rgb(192, 192, 192);
  outline: none;
  border-radius: 4px;
  padding: 2px 5px;
  height: fit-content;
  margin: 0;
  font-size: 1.5rem;
  transition: all 300ms ease-in-out;
  background-color: transparent;
  width: 70px;
}

.delete, .lock {
  height: 24px !important;
  width: 24px !important;
  border: 0 !important;
  border-radius: 0 !important;
  background-color: transparent;
  padding: 0;
  margin: auto 0;
}

button:hover:enabled {
  opacity: .75;
}

.pokemon button.lock:hover {
  opacity: .75 !important;
}

.delete img, .lock img {
  height: 24px !important;
  width: 24px !important;
  z-index: -1;
  display: block;
}

.addPokemonField {
  transition: all 300ms ease-in-out;
  padding: 10px;
  border: 2px solid rgb(192, 192, 192);
  border-radius: 8px;
  font-size: 1.25rem;
  outline: none;
}

.addPokemonButton {
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  height: fit-content;
  background-color: rgb(135, 135, 135);
  font-weight: bold;
  color: white;
}

input:focus{
  border: 2px solid rgb(121, 121, 121);
}

.pokemon.locked {
  opacity: .5;
}

#footer > div {
  display: flex;
  flex-direction: column;
}

#footer > div span {
  position: absolute;
  width: 243px;
  transition: all 300ms ease-in-out;
  padding: 10px;
  border: 2px solid rgb(121, 121, 121);
  background-color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 1.25rem;
  outline: none;
  transform: translateY(40px);
  z-index: 5;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
  opacity: 1;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
