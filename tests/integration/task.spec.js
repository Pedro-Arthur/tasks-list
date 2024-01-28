import { mount } from "@vue/test-utils";

import { ThemeProvider } from "vue-styled-components";
import theme from "../../src/theme/theme";

import IndexPage from "../../src/pages/Index/index.vue";

import localVue from "../localVue";

import store from "../store";

import { localStorageKey } from "../../src/store/task";

const createWrapper = () =>
  mount(ThemeProvider, {
    localVue,
    store,
    propsData: {
      theme,
    },
    slots: {
      default: {
        render: (createElement) => createElement(IndexPage),
      },
    },
  });

const addTasksToStore = (count) => {
  for (let i = 0; i < count; i++) {
    store.commit("addTask", {
      id: i,
      description: "teste",
      date: "2023-05-05",
      hour: "12:12",
    });
  }
};

const removeTasksFromStore = (count) => {
  for (let i = 0; i < count; i++) {
    store.commit("removeTask", i);
  }
};

describe("task", () => {
  afterEach(() => {
    store.commit("cleanTasks");
  });

  it("should show message 'Sem tarefas cadastradas...' if the number of tasks in the store is 0", () => {
    const wrapper = createWrapper();

    expect(store.getters.getTasks.length).toBe(0);

    const emptyText = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "empty-text" });

    expect(emptyText.exists()).toBe(true);

    expect(emptyText.text()).toBe("Sem tarefas cadastradas...");
  });

  it("should show the same number of tasks in the store and in the DOM", async () => {
    addTasksToStore(10);

    const wrapper = createWrapper();

    expect(store.getters.getTasks.length).toBe(10);

    const emptyText = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "empty-text" });

    expect(emptyText.exists()).toBe(false);

    const taskCardsBefore = wrapper
      .findComponent(IndexPage)
      .findAllComponents({ ref: "task-card" });

    expect(taskCardsBefore.wrappers.length).toBe(10);

    removeTasksFromStore(3);

    await wrapper.vm.$nextTick();

    expect(store.getters.getTasks.length).toBe(7);

    const taskCardsAfter = wrapper
      .findComponent(IndexPage)
      .findAllComponents({ ref: "task-card" });

    expect(taskCardsAfter.wrappers.length).toBe(7);
  });

  it("should show the same number of tasks in the store and in the local storage", () => {
    addTasksToStore(6);

    expect(store.getters.getTasks.length).toBe(6);

    const tasksOnLocalStorageBefore = JSON.parse(
      localStorage.getItem(localStorageKey)
    );

    expect(tasksOnLocalStorageBefore.length).toBe(6);

    removeTasksFromStore(4);

    expect(store.getters.getTasks.length).toBe(2);

    const tasksOnLocalStorageAfter = JSON.parse(
      localStorage.getItem(localStorageKey)
    );

    expect(tasksOnLocalStorageAfter.length).toBe(2);
  });

  it("should show modal when add button is clicked", async () => {
    const wrapper = createWrapper();

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

  it("should add an item to storage and store when the form is submitted", async () => {
    const wrapper = createWrapper();

    const addButton = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "add-button" });

    expect(addButton.exists()).toBe(true);

    await addButton.trigger("click");

    const addModal = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "add-modal" });

    expect(addModal.exists()).toBe(true);

    const addForm = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "add-form" });

    expect(addForm.exists()).toBe(true);

    const descriptionInput = addForm.find("input[type='text']");
    const dateInput = addForm.find("input[type='date']");
    const timeInput = addForm.find("input[type='time']");
    const submitButton = addForm.find("button[type='submit']");

    expect(descriptionInput.exists()).toBe(true);
    expect(dateInput.exists()).toBe(true);
    expect(timeInput.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);

    await descriptionInput.setValue("Teste 123");
    await dateInput.setValue("2024-01-27");
    await timeInput.setValue("15:00");

    await submitButton.trigger("click");

    const addFormChild = addForm.find("form");

    await addFormChild.trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    const taskCards = wrapper
      .findComponent(IndexPage)
      .findAllComponents({ ref: "task-card" });

    expect(taskCards.wrappers.length).toBe(1);

    expect(store.getters.getTasks.length).toBe(1);

    const tasksOnLocalStorage = JSON.parse(
      localStorage.getItem(localStorageKey)
    );

    expect(tasksOnLocalStorage.length).toBe(1);
  });

  it("should remove an item to storage and store when the remove button is clicked", async () => {
    addTasksToStore(2);

    const wrapper = createWrapper();

    const deleteButton = wrapper
      .findComponent(IndexPage)
      .findComponent({ ref: "delete-button" });

    expect(deleteButton.exists()).toBe(true);

    await deleteButton.trigger("click");

    await wrapper.vm.$nextTick();

    const taskCards = wrapper
      .findComponent(IndexPage)
      .findAllComponents({ ref: "task-card" });

    expect(taskCards.wrappers.length).toBe(1);

    expect(store.getters.getTasks.length).toBe(1);

    const tasksOnLocalStorage = JSON.parse(
      localStorage.getItem(localStorageKey)
    );

    expect(tasksOnLocalStorage.length).toBe(1);
  });
});
