<template>
  <div>
    <p>Descrição: {{ task.description }}</p>
    <p>Data: {{ task.date }}</p>
    <p>Hora: {{ task.hour }}</p>

    <mdicon name="react" />

    <slot name="actions"></slot>
  </div>
</template>

<script>
export default {
  name: "CCard",
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
