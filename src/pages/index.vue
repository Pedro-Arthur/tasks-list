<template>
  <div>
    <h1>Tarefas</h1>

    <CForm v-model="formTask" @submit="addTask" />

    <CCard v-for="task in tasks" :key="task.id" :task="task">
      <template v-slot:actions>
        <CButton @click="removeTask(task.id)" text="Apagar" />
      </template>
    </CCard>
  </div>
</template>

<script>
import CButton from "../components/Button";
import CCard from "../components/Card";
import CForm from "../components/Form";

const defaultFormTask = {
  id: null,
  description: "",
  date: "",
  hour: "",
};

export default {
  name: "IndexPage",

  components: {
    CButton,
    CCard,
    CForm,
  },

  data() {
    return {
      formTask: Object.assign({}, defaultFormTask),
    };
  },

  computed: {
    tasks() {
      return this.$store.getters.getTasks;
    },
  },

  methods: {
    addTask() {
      this.formTask.id = this.generateRandomId();
      this.$store.commit("addTask", this.formTask);
      this.cleanTaskForm();
    },
    removeTask(taskId) {
      this.$store.commit("removeTask", taskId);
    },
    cleanTaskForm() {
      this.formTask = Object.assign({}, defaultFormTask);
    },
    generateRandomId() {
      return (Math.random() + 1).toString(36).substring(7);
    },
  },
};
</script>
