import { mount } from "@vue/test-utils";

import Form from "../../src/components/Form";

import theme from "../../src/theme/theme";
import { ThemeProvider } from "vue-styled-components";

import localVue from "../localVue";

const mountFormWithProps = (props) =>
  mount(ThemeProvider, {
    localVue,
    propsData: {
      theme,
    },
    slots: {
      default: {
        render: (createElement) => createElement(Form, { props }),
      },
    },
  });

describe("form", () => {
  it("should be a vue instance", () => {
    const wrapper = mountFormWithProps({
      value: {
        description: "",
        date: "",
        hour: "",
      },
    });

    expect(wrapper.vm).toBeDefined();
  });

  it("should render the form with input fields and submit button", () => {
    const wrapper = mountFormWithProps({
      value: {
        description: "",
        date: "",
        hour: "",
      },
    });

    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input[type='text']").exists()).toBe(true);
    expect(wrapper.find("input[type='date']").exists()).toBe(true);
    expect(wrapper.find("input[type='time']").exists()).toBe(true);
    expect(wrapper.find("button[type='submit']").exists()).toBe(true);
  });

  it("should bind input values to the component's state", async () => {
    const wrapper = mountFormWithProps({
      value: {
        description: "",
        date: "",
        hour: "",
      },
    });

    await wrapper.find("input[type='text']").setValue("Test");
    await wrapper.find("input[type='date']").setValue("2024-01-23");
    await wrapper.find("input[type='time']").setValue("12:00");

    expect(wrapper.find("input[type='text']").element.value).toBe("Test");
    expect(wrapper.find("input[type='date']").element.value).toBe("2024-01-23");
    expect(wrapper.find("input[type='time']").element.value).toBe("12:00");
  });

  it("should emit a submit event on form submission", async () => {
    const wrapper = mountFormWithProps({
      value: {
        description: "Test",
        date: "2024-01-23",
        hour: "12:00",
      },
    });

    const form = wrapper.findComponent(Form).find("form");

    expect(form.exists()).toBe(true);

    await form.trigger("submit.prevent");

    expect(form.emitted().submit).toBeTruthy();
  });
});
