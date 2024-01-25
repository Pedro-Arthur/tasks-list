import { mount } from "@vue/test-utils";

import { ThemeProvider } from "vue-styled-components";
import theme from "../../src/theme/theme";

import Button from "../../src/components/Button";
import { ButtonWrapper } from "../../src/components/Button/style";

import localVue from "../localVue";

describe("button", () => {
  it("should be a vue instance", () => {
    const wrapper = mount(ThemeProvider, {
      localVue,
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Button);
          },
        },
      },
    });

    expect(wrapper.vm).toBeDefined();
  });

  it("should have the correct text", () => {
    const buttonText = "Texto botão";

    const wrapper = mount(ThemeProvider, {
      localVue,
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Button, {
              props: {
                text: buttonText,
              },
            });
          },
        },
      },
    });

    const buttonComponent = wrapper.findComponent(Button);
    expect(buttonComponent.props("text")).toBe(buttonText);
  });

  it("should have the correct color", () => {
    const buttonColor = "success";

    const wrapper = mount(ThemeProvider, {
      localVue,
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Button, {
              props: {
                color: buttonColor,
              },
            });
          },
        },
      },
    });

    const buttonComponent = wrapper.findComponent(Button);
    expect(buttonComponent.props("color")).toBe(buttonColor);
  });

  it("should emit click event on click", async () => {
    const wrapper = mount(ThemeProvider, {
      localVue,
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Button, {
              props: {},
            });
          },
        },
      },
    });

    const buttonComponent = wrapper.findComponent(Button);
    const buttonWrapperComponent = buttonComponent.findComponent(ButtonWrapper);
    await buttonWrapperComponent.trigger("click");

    expect(buttonComponent.emitted().click).toBeTruthy();
  });

  it("should show the icon if the icon prop is different from null", () => {
    const wrapper = mount(ThemeProvider, {
      localVue,
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Button, {
              props: {
                icon: "trash-can-outline",
              },
            });
          },
        },
      },
    });

    const buttonComponent = wrapper.findComponent(Button);
    expect(buttonComponent.findAll("svg").wrappers.length).toBe(1);
  });
});
