import { mount } from "@vue/test-utils";
import Form from "../../src/components/Form";
import theme from '../../src/theme/theme';
import { ThemeProvider } from "vue-styled-components";

describe("form", () => {
  it("should be a vue instance", () => {
    const wrapper = mount(ThemeProvider, {
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(Form, {
              props: {
                value: {
                  description: '',
                  date: '',
                  hour: ''
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
