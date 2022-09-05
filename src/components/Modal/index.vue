<template>
  <transition name="modal">
    <ModalMask>
      <ModalWrapper>
        <ModalContainer>
          <ModalHeader>
            <h3>{{ title }}</h3>
            <ModalClose @click="(v) => $emit('close')">
              <mdicon name="close" />
            </ModalClose>
          </ModalHeader>

          <slot />
        </ModalContainer>
      </ModalWrapper>
    </ModalMask>
  </transition>
</template>

<script>
import {
  ModalHeader,
  ModalWrapper,
  ModalClose,
  ModalMask,
  ModalContainer,
} from "./style";

export default {
  name: "CModal",

  components: {
    ModalHeader,
    ModalWrapper,
    ModalClose,
    ModalMask,
    ModalContainer,
  },

  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
