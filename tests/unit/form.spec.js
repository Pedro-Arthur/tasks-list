import { mount } from "@vue/test-utils";
import Form from "../../src/components/Form";
import theme from '../../src/theme/theme';
import { ThemeProvider } from "vue-styled-components";
import localVue from '../localVue';

describe("form", () => {
  it("should be a vue instance", () => {
    const wrapper = mount(ThemeProvider, {
      localVue,
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

  it("should render the form with input fields and submit button", () => {
    const wrapper = mount(ThemeProvider, {
      localVue,
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

    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input[type='text']").exists()).toBe(true);
    expect(wrapper.find("input[type='date']").exists()).toBe(true);
    expect(wrapper.find("input[type='time']").exists()).toBe(true);
    expect(wrapper.find("button[type='submit']").exists()).toBe(true);
  });

  it("should bind input values to the component's state", async () => {
    const wrapper = mount(ThemeProvider, {
      localVue,
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

    await wrapper.find("input[type='text']").setValue('Test');
    await wrapper.find("input[type='date']").setValue('2024-01-23');
    await wrapper.find("input[type='time']").setValue('12:00');

    expect(wrapper.find("input[type='text']").element.value).toBe('Test');
    expect(wrapper.find("input[type='date']").element.value).toBe('2024-01-23');
    expect(wrapper.find("input[type='time']").element.value).toBe('12:00');
  });

  it("should emit a submit event on form submission", async () => {
    const wrapper = mount(ThemeProvider, {
      localVue,
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

    await wrapper.find("input[type='text']").setValue('Test');
    await wrapper.find("input[type='date']").setValue('2024-01-23');
    await wrapper.find("input[type='time']").setValue('12:00');

    await wrapper.find("button[type='submit']").trigger("click");

    // TODO: Não está funcionando...
    expect(wrapper.find('form').emitted().submit).toBeTruthy();
  });
});
