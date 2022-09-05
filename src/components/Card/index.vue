<template>
  <CardWrapper>
    <CardTitle>{{ task.description }}</CardTitle>

    <CardLine>
      <mdicon name="calendar" />
      <p>Data: {{ formattedDate }}</p>
    </CardLine>

    <CardLine>
      <mdicon name="clock-outline" />
      <p>Hora: {{ task.hour }}</p>
    </CardLine>

    <slot name="actions"></slot>
  </CardWrapper>
</template>

<script>
import { CardWrapper, CardLine, CardTitle } from "./style";

export default {
  name: "CCard",

  components: {
    CardWrapper,
    CardLine,
    CardTitle,
  },

  computed: {
    formattedDate() {
      if (typeof this.task.date !== "string") {
        return this.task.date;
      }
      return this.task.date.split("-").reverse().join("/");
    },
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
