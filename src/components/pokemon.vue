<template>
  <div class="pokemon" :class="pokemon.freezed ? 'locked' : 'unlocked'">
    <button
      class="countUp"
      :disabled="pokemon.freezed"
      @click="pokemon.increaseCount(); $emit('countChanged')"
    >
      +
    </button>
    <button
      class="countDown"
      :disabled="pokemon.freezed"
      @click="pokemon.decreaseCount(); $emit('countChanged')"
    >
      -
    </button>
    <input
      class="counter"
      :disabled="pokemon.freezed"
      :value="pokemon.count"
      @keyup="pokemon.setCount($event.currentTarget.value); $emit('countChanged')"
    />
    <h2 class="name">{{ pokemon.name }}</h2>
    <button
      class="delete"
      :disabled="pokemon.freezed"
      @click="$emit('deletePokemon', pokemon)"
    >
      <img src="../assets/delete.svg" alt="Delete pokemon" />
    </button>
    <button class="lock" @click="pokemon.toggleFreezePokemon()">
      <img
        v-if="pokemon.freezed"
        src="../assets/locked.svg"
        alt="Lock pokemon"
      />
      <img
        v-if="!pokemon.freezed"
        src="../assets/unlocked.svg"
        alt="Lock pokemon"
      />
    </button>
  </div>
</template>

<script>
export default {
  name: "pokemon",

  props: ['pokemon']
};
</script>

<style scoped>
.countUp {
  background-color: rgb(28, 180, 28);
}

.countDown {
  background-color: rgb(255, 40, 40);
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
  transition: all 0.3s ease-in-out;
}

.pokemon button {
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 2.25rem;
  color: white;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon h2 {
  margin: auto 0;
}

.pokemon .name {
  border-left: 1px solid rgb(77, 77, 77);
  padding-left: 20px;
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

.delete,
.lock {
  height: 24px !important;
  width: 24px !important;
  border: 0 !important;
  border-radius: 0 !important;
  background-color: transparent;
  padding: 0;
  margin: auto 0;
  display: block !important;
}

.delete img,
.lock img {
  height: 24px !important;
  width: 24px !important;
  z-index: -1;
}
</style>
