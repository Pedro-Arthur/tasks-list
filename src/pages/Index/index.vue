<template>
  <Container>
    <Header>
      <h1>Tarefas</h1>
      <CButton
        ref="add-button"
        icon="plus"
        @click="visibleModal = true"
        text="Adicionar"
        color="primary"
      />
    </Header>

    <CModal v-if="visibleModal" @close="closeModal" ref="add-modal" title="Adicionar tarefa">
      <CForm ref="add-form" v-model="formTask" @submit="addTask" />
    </CModal>

    <TaskContent v-if="tasks.length > 0">
      <CCard v-for="task in tasks" :key="task.id" :task="task" ref="task-card">
        <template v-slot:actions>
          <CButton
            ref="delete-button"
            icon="trash-can-outline"
            @click="removeTask(task.id)"
            text="Apagar"
            color="danger"
          />
        </template>
      </CCard>
    </TaskContent>
    <p v-else ref="empty-text">Sem tarefas cadastradas...</p>
  </Container>
</template>

<script>
import CButton from "../../components/Button";
import CCard from "../../components/Card";
import CForm from "../../components/Form";
import CModal from "../../components/Modal";
import { Header, TaskContent, Container } from "./style";

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
    CModal,
    Header,
    TaskContent,
    Container,
  },

  data() {
    return {
      formTask: Object.assign({}, defaultFormTask),
      visibleModal: false,
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
      this.closeModal();
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
    closeModal() {
      this.cleanTaskForm();
      this.visibleModal = false;
    },
  },
};
</script>
