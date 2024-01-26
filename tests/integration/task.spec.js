import { mount } from "@vue/test-utils";

import { ThemeProvider } from "vue-styled-components";
import theme from "../../src/theme/theme";

import IndexPage from "../../src/pages/Index/index.vue";

import localVue from "../localVue";

import store from "../store";

import { localStorageKey } from "../../src/store/task";

describe("task", () => {
  afterEach(() => {
    store.commit("cleanTasks");
  });

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

  it("should show the same number of tasks in the store and in the DOM", async () => {
    for (let i = 0; i <= 9; i++) {
      store.commit("addTask", {
        id: i,
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

    const taskCardsBefore = wrapper
      .findComponent(IndexPage)
      .findAllComponents({ ref: "task-card" });

    expect(taskCardsBefore.wrappers.length).toBe(10);

    for (let i = 0; i <= 2; i++) {
      store.commit("removeTask", i);
    }

    await wrapper.vm.$nextTick();

    expect(store.getters.getTasks.length).toBe(7);

    const taskCardsAfter = wrapper
      .findComponent(IndexPage)
      .findAllComponents({ ref: "task-card" });

    expect(taskCardsAfter.wrappers.length).toBe(7);
  });

  it("should show the same number of tasks in the store and in the local storage", () => {
    for (let i = 0; i <= 5; i++) {
      store.commit("addTask", {
        id: i,
        description: "teste",
        date: "2023-05-05",
        hour: "12:12",
      });
    }

    expect(store.getters.getTasks.length).toBe(6);

    const tasksOnLocalStorageBefore = JSON.parse(
      localStorage.getItem(localStorageKey)
    );

    expect(tasksOnLocalStorageBefore.length).toBe(6);

    for (let i = 0; i <= 3; i++) {
      store.commit("removeTask", i);
    }

    expect(store.getters.getTasks.length).toBe(2);

    const tasksOnLocalStorageAfter = JSON.parse(
      localStorage.getItem(localStorageKey)
    );

    expect(tasksOnLocalStorageAfter.length).toBe(2);
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
