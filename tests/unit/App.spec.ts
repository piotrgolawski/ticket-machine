import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import { Api } from "@/constants/api";
import fetchMock from "jest-fetch-mock";
import TicketMachine from "@/components/TicketMachine.vue";
import flushPromises from "flush-promises";
import stationsMock from "./helpers/mocks";

describe("TicketMachine.vue", () => {
  fetchMock.enableMocks();
  describe("at init,", () => {
    it("proper request was performed", () => {
      // given
      fetchMock.mockResponseOnce(JSON.stringify(stationsMock));

      // when
      shallowMount(App, {});

      // then
      expect(fetch).toHaveBeenCalledWith(Api.apiUrl);
    });

    describe("and data is fetched correctly,", () => {
      it("proper data was set", async () => {
        // given
        fetchMock.mockResponseOnce(JSON.stringify(stationsMock));

        // when
        const wrapper = shallowMount(App, {});
        await flushPromises();

        // then
        expect(wrapper.vm.$data["allStations"]).toEqual(stationsMock);
      });

      it("and data was not empty, child component exist", async () => {
        // given
        fetchMock.mockResponseOnce(JSON.stringify(stationsMock));

        // when
        const wrapper = shallowMount(App, {});
        await flushPromises();

        // then
        expect(wrapper.findAllComponents(TicketMachine).exists()).toBeTruthy();
      });

      it("but data was empty, child component not exist", async () => {
        // given
        fetchMock.mockResponseOnce(JSON.stringify([]));

        // when
        const wrapper = shallowMount(App, {});
        await flushPromises();

        // then
        expect(wrapper.findAllComponents(TicketMachine).exists()).toBeFalsy();
      });
    });

    describe("and there was an error,", () => {
      it("alert appear", async () => {
        // given
        fetchMock.mockRejectOnce();
        global.alert = jest.fn();

        // when
        shallowMount(App, {});
        await flushPromises();

        // then
        expect(window.alert).toBeCalledWith(
          "Error fetching station codes, please try again later"
        );
      });
    });
  });
});
