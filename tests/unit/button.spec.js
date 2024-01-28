import { mount } from "@vue/test-utils";

import { ThemeProvider } from "vue-styled-components";
import theme from "../../src/theme/theme";

import Button from "../../src/components/Button";
import { ButtonWrapper } from "../../src/components/Button/style";

import localVue from "../localVue";

const mountButtonWithProps = (props) =>
  mount(ThemeProvider, {
    localVue,
    propsData: { theme },
    slots: {
      default: {
        render: (createElement) => createElement(Button, { props }),
      },
    },
  });

describe("button", () => {
  it("should be a vue instance", () => {
    const wrapper = mountButtonWithProps();
    expect(wrapper.vm).toBeDefined();
  });

  it("should have the correct text", () => {
    const buttonText = "Texto botão";
    const wrapper = mountButtonWithProps({ text: buttonText });
    const buttonComponent = wrapper.findComponent(Button);
    expect(buttonComponent.props("text")).toBe(buttonText);
  });

  it("should have the correct color", () => {
    const buttonColor = "success";
    const wrapper = mountButtonWithProps({ color: buttonColor });
    const buttonComponent = wrapper.findComponent(Button);
    expect(buttonComponent.props("color")).toBe(buttonColor);
  });

  it("should emit click event on click", async () => {
    const wrapper = mountButtonWithProps();
    const buttonComponent = wrapper.findComponent(Button);
    await buttonComponent.findComponent(ButtonWrapper).trigger("click");
    expect(buttonComponent.emitted().click).toBeTruthy();
  });

  it("should show the icon if the icon prop is different from null", () => {
    const wrapper = mountButtonWithProps({ icon: "trash-can-outline" });
    const buttonComponent = wrapper.findComponent(Button);
    expect(buttonComponent.findAll("svg").length).toBe(1);
  });
});
