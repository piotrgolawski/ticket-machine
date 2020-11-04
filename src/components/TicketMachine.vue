<template>
  <div>
    <h1 class="header">User input: {{ chosenLetters.toLowerCase() }}</h1>
    <div class="container">
      <div class="keyboard">
        <template v-for="i in 30">
          <span
            :key="i - 1"
            class="keyboard--char box"
            v-on:click="addLetter(initialKeyboardLetters[i - 1])"
            v-bind:class="{
              clickable: letterAvailableToChose(initialKeyboardLetters[i - 1])
            }"
          >
            {{
              initialKeyboardLetters[i - 1] === " "
                ? "&blank;"
                : initialKeyboardLetters[i - 1]
            }}
          </span>
        </template>
      </div>
      <div class="function-buttons">
        <span
          class="function-buttons--button box"
          v-bind:class="{ clickable: chosenLetters.length }"
          v-on:click="back()"
        >
          &#8592;
        </span>
        <span
          class="function-buttons--button box"
          v-bind:class="{ clickable: chosenLetters.length }"
          v-on:click="clear()"
        >
          &#8634;
        </span>
        <span
          v-for="i in 4"
          :key="i"
          class="function-buttons--placeholder box"
        ></span>
      </div>
      <div class="result-pane">
        <span
          v-for="i in 6"
          :key="i"
          class="box result-pane--result"
          v-bind:class="{ clickable: !!stationsToShow[i - 1] }"
          v-on:click="selectedStation(stationsToShow[i - 1])"
        >
          {{ stationsToShow[i - 1] ? stationsToShow[i - 1].stationName : "" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Istation } from "@/interfaces/Istation";

@Component
export default class TicketMachine extends Vue {
  @Prop({ required: true }) allStations: Istation[];
  public initialKeyboardLetters = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ ()");
  public stationsToShow: Istation[] = [];
  public chosenLetters = "";

  private lettersAvailableToChose: string[] = [];
  private availableStations: Istation[] = [];

  public addLetter(letter: string): void {
    console.log("addletter", letter);
    if (letter && this.letterAvailableToChose(letter)) {
      this.chosenLetters += letter;
      this.setAvailableStations();
      this.setAvailableLetters();
    }
  }

  public letterAvailableToChose(letter: string): boolean {
    return (
      !!letter &&
      (!this.lettersAvailableToChose.length ||
        this.lettersAvailableToChose.includes(letter))
    );
  }

  public back(): void {
    this.chosenLetters = this.chosenLetters.slice(0, -1);
    if (!this.chosenLetters) {
      this.clear();
    } else {
      this.setAvailableStations();
      this.setAvailableLetters();
    }
  }

  public clear(): void {
    this.chosenLetters = "";
    this.stationsToShow = [];
    this.lettersAvailableToChose = this.initialKeyboardLetters;
  }

  public selectedStation(station: Istation): void {
    if (station) {
      alert(
        `Station Selected : ${station.stationName} (${station.stationCode})`
      );
    }
  }

  private setAvailableStations(): void {
    this.availableStations = this.allStations.filter(station =>
      station.stationName.toUpperCase().startsWith(this.chosenLetters)
    );
    this.stationsToShow = this.availableStations.slice(0, 6);
  }

  private setAvailableLetters(): void {
    const lettersWithDuplicates = this.availableStations.map(
      chosenCode =>
        chosenCode.stationName.toUpperCase().replace(this.chosenLetters, "")[0]
    );
    this.lettersAvailableToChose = Array.from(new Set(lettersWithDuplicates));
  }
}
</script>

<style scoped lang="scss">
.header {
  position: absolute;
  left: 23%;
  top: 4%;
  text-transform: capitalize;
  height: 40px;
  font-size: 40px;
}

.container {
  margin: 12% 23%;
  display: flex;
  flex-direction: row;

  .keyboard {
    order: 1;
    flex-basis: 360px;
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 50px;

    &--char {
      width: 70px;
      height: 70px;
    }
  }

  .function-buttons {
    order: 2;
    display: flex;
    flex-direction: column;
    flex-basis: 50px;
    flex-grow: 0;
    flex-shrink: 0;

    &--button,
    &--placeholder {
      width: 120px;
      font-size: 50px;
    }
  }

  .result-pane {
    order: 3;
    display: flex;
    flex-direction: column;
    flex-basis: 50px;
    flex-grow: 0;
    flex-shrink: 0;

    &--result {
      width: 400px;
      font-size: 30px;
    }
  }

  .box {
    border-collapse: collapse;
    border: 1px solid black;
    display: inline-block;
    height: 66px;
    text-align: center;
    vertical-align: middle;
    padding-top: 4px;

    &:not(.clickable) {
      color: lightgrey;
    }

    &.clickable {
      cursor: pointer;
      -moz-box-shadow: 3px 3px 5px 6px #ccc;
      -webkit-box-shadow: 3px 3px 5px 6px #ccc;
      box-shadow: 3px 3px 5px 6px #ccc;
    }
  }
}
</style>
