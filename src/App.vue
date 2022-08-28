<template>
  <div id="app">
    <h1>Tasks</h1>

    <form @submit.prevent="addTask">
      <input placeholder="Descrição" v-model="task.description" />
      <br />

      <input type="date" placeholder="Data" v-model="task.date" />
      <br />

      <input type="time" placeholder="Hora" v-model="task.hour" />
      <br />

      <input type="checkbox" id="checkbox" v-model="task.isFinished" />
      <label for="checkbox">Finalizada</label>
      <br />

      <input type="submit" value="Adicionar" />
    </form>

    <div v-for="task in tasks" :key="task.id">
      <p>ID: {{ task.id }}</p>
      <p>Descrição: {{ task.description }}</p>
      <p>Data: {{ task.date }}</p>
      <p>Hora: {{ task.hour }}</p>
      <p>Finalizada: {{ task.isFinished }}</p>
      <button @click="removeTask(task.id)">DELETAR</button>
    </div>
  </div>
</template>

<script>
const defaultTask = {
  id: null,
  description: "",
  date: "",
  hour: "",
  isFinished: false,
};

export default {
  name: "App",

  data() {
    return {
      task: Object.assign({}, defaultTask),
    };
  },

  computed: {
    tasks() {
      return this.$store.getters.getTasks;
    },
  },

  methods: {
    addTask() {
      this.task.id = this.generateRandomId();
      this.$store.commit("addTask", this.task);
      this.cleanTaskForm();
    },
    removeTask(taskId) {
      this.$store.commit("removeTask", taskId);
    },
    cleanTaskForm() {
      this.task = Object.assign({}, defaultTask);
    },
    generateRandomId() {
      return (Math.random() + 1).toString(36).substring(7);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
