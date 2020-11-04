import { shallowMount } from "@vue/test-utils";
import TicketMachine from "@/components/TicketMachine.vue";
import stationsMock from "./helpers/mocks";

describe("TicketMachine.vue", () => {
  const wrapper = shallowMount(TicketMachine, {
    propsData: {
      allStations: stationsMock
    }
  });

  const aKey = wrapper.findAll(".keyboard--char").at(0);
  const bKey = wrapper.findAll(".keyboard--char").at(1);
  const backButton = wrapper.findAll(".function-buttons--button").at(0);
  const clearButton = wrapper.findAll(".function-buttons--button").at(1);

  describe("when click on letter", () => {
    it("chosenLetters will be updated", () => {
      // when
      aKey.trigger("click");
      bKey.trigger("click");

      // then
      expect(wrapper.vm.$data.chosenLetters).toEqual(aKey.text() + bKey.text());
    });

    it("addLetter will be performed", () => {
      // given
      const addLetter = jest.fn();
      wrapper.setMethods({ addLetter });

      // when
      aKey.trigger("click");

      // then
      expect(addLetter).toHaveBeenCalledWith(aKey.text());
    });
  });

  describe("when click on back", () => {
    describe("and chosenLetters is not empty", () => {
      beforeEach(() => {
        // given
        wrapper.vm.$data.chosenLetters = "abc";
      });

      it("setAvailableStations will be performed", () => {
        // given
        const setAvailableStations = jest.fn();
        wrapper.setMethods({ setAvailableStations });

        // when
        backButton.trigger("click");

        // then
        expect(setAvailableStations).toHaveBeenCalled();
      });

      it("setAvailableLetters will be performed", () => {
        // given
        const setAvailableLetters = jest.fn();
        wrapper.setMethods({ setAvailableLetters });

        // when
        backButton.trigger("click");

        // then
        expect(setAvailableLetters).toHaveBeenCalled();
      });

      it("chosenLetters will decrease by one", () => {
        // when
        backButton.trigger("click");

        // then
        expect(wrapper.vm.$data.chosenLetters).toEqual("ab");
      });
    });

    it("and chosenLetters is empty, clear will be performed", () => {
      // given
      wrapper.vm.$data.chosenLetters = "";
      const clear = jest.fn();
      wrapper.setMethods({ clear });

      // when
      backButton.trigger("click");

      // then
      expect(clear).toHaveBeenCalled();
    });

    it("back method will be performed", () => {
      // given
      const back = jest.fn();
      wrapper.setMethods({ back });

      // when
      backButton.trigger("click");

      // then
      expect(back).toHaveBeenCalled();
    });
  });

  describe("when click on clearButton", () => {
    it("clear method will be performed", () => {
      // given
      const clear = jest.fn();
      wrapper.setMethods({ clear });

      // when
      clearButton.trigger("click");

      // then
      expect(clear).toHaveBeenCalled();
    });

    it("chosenLetters will be cleared", () => {
      // given
      aKey.trigger("click");

      // when
      clearButton.trigger("click");

      // then
      expect(wrapper.vm.$data.chosenLetters).toEqual("");
    });
  });
});
