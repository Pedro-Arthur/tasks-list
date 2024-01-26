import { mount } from "@vue/test-utils";

import { ThemeProvider } from "vue-styled-components";
import theme from "../../src/theme/theme";

import IndexPage from "../../src/pages/Index/index.vue";

import localVue from "../localVue";

import store from "../store";

describe("task", () => {
  it("should show message 'Sem tarefas cadastradas...' if the number of tasks in the store is 0", () => {
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

    expect(store.getters.getTasks.length).toBe(0);

    const emptyText = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "empty-text" });

    expect(emptyText.exists()).toBe(true);

    expect(emptyText.text()).toBe("Sem tarefas cadastradas...");
  });

  it("should show the same number of tasks in the store and in the DOM", () => {
    for (let i = 0; i <= 9; i++) {
      store.commit("addTask", {
        id: Math.random(),
        description: "teste",
        date: "2023-05-05",
        hour: "12:12",
      });
    }

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

    expect(store.getters.getTasks.length).toBe(10);

    const emptyText = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "empty-text" });

    expect(emptyText.exists()).toBe(false);

    const taskCards = wrapper
      .findComponent(IndexPage)
      .findAllComponents({ ref: "task-card" });

    expect(taskCards.wrappers.length).toBe(10);
  });

  it("should show modal when add button is clicked", async () => {
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

    const addButton = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "add-button" });
    expect(addButton.exists()).toBe(true);

    const addModalBefore = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "add-modal" });
    expect(addModalBefore.exists()).toBe(false);

    await addButton.trigger("click");

    const addModalAfter = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "add-modal" });
    expect(addModalAfter.exists()).toBe(true);
  });
});
