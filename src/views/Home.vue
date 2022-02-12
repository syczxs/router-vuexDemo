<template>
  <div class="home">
    <h1>这home组件</h1>

    <!-- <h1>vuexdemo</h1> -->

    <h1>state.counter:{{$store.state.counter}}</h1>
     <h1>state.doubleCounter:{{$store.getters.doubleCounter}}</h1>
    <button @click="$store.commit('add')">add</button>
    <button @click="$store.dispatch('add')">async add</button>
 
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
   
  }
}
</script>
