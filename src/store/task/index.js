const localStorageKey = "tasks";

const storeTasks = (tasks) => {
  localStorage.setItem(localStorageKey, JSON.stringify(tasks));
};

const getStoredTasks = () => {
  const storedTasks = JSON.parse(localStorage.getItem(localStorageKey));
  return storedTasks || [];
};

export default {
  state: () => ({
    tasks: getStoredTasks(),
  }),

  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },

  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
      storeTasks(state.tasks);
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      storeTasks(state.tasks);
    },
  },
};
