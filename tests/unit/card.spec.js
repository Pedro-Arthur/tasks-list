import { mount } from "@vue/test-utils";
import Card from "../../src/components/Card";
import { ThemeProvider } from "vue-styled-components";
import theme from '../../src/theme/theme';

describe("card", () => {
  it("should be a vue instance", () => {
    const wrapper = mount(ThemeProvider, {
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Card, {
              props: {
                task: {
                  description: "test",
                  hour: "12:12",
                  date: "2022-08-29",
                }
              }
            });
          },
        },
      },
    });

    expect(wrapper.vm).toBeDefined();
  });
});
