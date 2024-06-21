<template>
  <div id="app">
    <h1>Calculador de Camino Más Corto</h1>
    <form @submit.prevent="calculateShortestPath" class="tryme">
      <label for="source">Nodo de Partida:</label>
      <input type="number" v-model="source" id="source" required>
      <label for="target">Nodo de Llegada:</label>
      <input type="number" v-model="target" id="target" required>
      <button type="submit">Calcular</button>
    </form>

    <div class="tryme">
      <InputNumber v-model="source" label="Nodo de Partida" required min="0" max="6000"/>
      <InputNumber v-model="target" label="Nodo de Llegada" required min="0" max="6000"/>
      <Button @click="calculateShortestPath" :invalid="invalid">Calcular</Button>
      {{reason}}
    </div>

    <div v-if="result">
      <h2>Resultados</h2>
      <p>Camino: {{ result.path.join(' -> ') }}</p>
      <p>Distancia: {{ result.distance }}</p>
    </div>
    <img v-if="graphUrl" :src="graphUrl" alt="Graph">
    {{graphUrl}}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      source: null,
      target: null,
      result: null,
      graphUrl: null,
      invalid: null,
      reason: null,
      imageId: 1,
    };
  },
  methods: {
    async calculateShortestPath() {
      this.reason = ""
      this.invalid = ""
      if(this.source == null || this.target == null){
        this.reason = "Por favor, ingrese los nodos de partida y llegada"
        this.invalid = true
        return
      }
      try {
        const response = await axios.post('http://127.0.0.1:5000/shortest_path', {
          source: this.source,
          target: this.target,
        });
        this.result = response.data;
        this.imageId = this.imageId + 1;
        this.graphUrl = `http://127.0.0.1:5000/graph?imageId=${this.imageId}`
      } catch (error) {
        console.error('Error calculating shortest path:', error);
      }
    },
    async fetchGraph() {
      this.graphUrl = 'http://127.0.0.1:5000/graph?imageId=0';
    },
  },
  mounted() {
    this.fetchGraph();
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tryme{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
</style>
