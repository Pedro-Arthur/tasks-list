import { mount } from "@vue/test-utils";
import Button from "../../src/components/Button";
import Modal from "../../src/components/Modal";
import { ThemeProvider } from "vue-styled-components";
import theme from '../../src/theme/theme';
import IndexPage from "../../src/pages/Index/index.vue";
import localVue from '../localVue';
import store from '../store';

describe("task", () => {
  it("should show message 'Sem tarefas cadastradas...' if the number of tasks in the store is 0", () => {})

  it("should show the same number of tasks in the store and in the DOM", () => {})

  it("should show modal when add button is clicked", () => {
    const wrapper = mount(ThemeProvider, {
      localVue,
      store,
      propsData: {
        theme,
      },
      slots: {
        default: {
          render: (createElement) => {
            return createElement(IndexPage);
          },
        },
      },
    });

    const buttonComponent = wrapper.findComponent(Button);
    const modalComponent = wrapper.findComponent(Modal);

    expect(buttonComponent).toBeTruthy();
    expect(modalComponent).toBeTruthy();
  })
});