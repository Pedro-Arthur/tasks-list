import { mount } from "@vue/test-utils";

import Card from "../../src/components/Card";
import {
  CardLine,
  CardTitle,
  CardWrapper,
} from "../../src/components/Card/style";

import localVue from "../localVue";

const mountCardWithProps = (props) =>
  mount(Card, {
    localVue,
    propsData: props,
  });

describe("card", () => {
  it("should be a vue instance", () => {
    const wrapper = mountCardWithProps({
      task: {
        description: "test",
        hour: "12:12",
        date: "2022-08-29",
      },
    });
    expect(wrapper.vm).toBeDefined();
  });

  it("should throw an error if task prop is not provided", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    try {
      mountCardWithProps({});
    } catch (e) {
      expect(e.message.startsWith("Cannot read properties of undefined")).toBe(
        true
      );
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });

  it("should format the date correctly", () => {
    const wrapper = mountCardWithProps({
      task: {
        description: "test",
        hour: "12:12",
        date: "2022-08-29",
      },
    });
    expect(wrapper.vm.formattedDate).toBe("29/08/2022");
  });

  it("should render the correct DOM structure", () => {
    const wrapper = mountCardWithProps({
      task: {
        description: "test",
        hour: "12:12",
        date: "2022-08-29",
      },
    });

    expect(wrapper.findComponent(CardWrapper).exists()).toBeTruthy();
    expect(wrapper.findComponent(CardTitle).exists()).toBeTruthy();
    expect(wrapper.findComponent(CardLine).exists()).toBeTruthy();
    expect(wrapper.findAll("p").length).toBe(2);
    expect(wrapper.findAll("svg").length).toBe(2); // mdi icons
  });
});
