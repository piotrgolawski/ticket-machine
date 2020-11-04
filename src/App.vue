<template>
  <div id="app">
    <TicketMachine
      v-bind:allStations="allStations"
      v-if="!!allStations && allStations.length"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TicketMachine from "./components/TicketMachine.vue";
import { Istation } from "@/interfaces/Istation";
import { Api } from "@/constants/api";

@Component({
  components: {
    TicketMachine: TicketMachine
  }
})
export default class App extends Vue {
  public allStations: Istation[] = [];

  beforeCreate() {
    fetch(Api.apiUrl)
      .then(
        response => response.json(),
        () => alert("Error fetching station codes, please try again later")
      )
      .then(codes => (this.allStations = codes));
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
