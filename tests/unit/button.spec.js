import { mount } from "@vue/test-utils";
import Button from "../../src/components/Button";
import { ThemeProvider } from "vue-styled-components";
import theme from '../../src/theme/theme';
import { ButtonWrapper } from "../../src/components/Button/style";

describe("button", () => {
  it("should be a vue instance", () => {
    const wrapper = mount(ThemeProvider, {
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
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Button, {
              props: {
                text: buttonText
              }
            });
          },
        },
      },
    });

    const buttonComponent = wrapper.findComponent(Button);
    expect(buttonComponent.props('text')).toBe(buttonText);
  });

  it("should have the correct color", () => {
    const buttonColor = "success";

    const wrapper = mount(ThemeProvider, {
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Button, {
              props: {
                color: buttonColor
              }
            });
          },
        },
      },
    });

    const buttonComponent = wrapper.findComponent(Button);
    expect(buttonComponent.props('color')).toBe(buttonColor);
  });

  it("should emit click event on click", async () => {
    const wrapper = mount(ThemeProvider, {
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Button, {
              props: {}
            });
          },
        },
      },
    });

    const buttonComponent = wrapper.findComponent(Button);
    const buttonWrapperComponent = buttonComponent.findComponent(ButtonWrapper);
    await buttonWrapperComponent.trigger('click');

    expect(buttonComponent.emitted().click).toBeTruthy();
  })
});
