<template>
  <button class='btn' type='{{buttonType}}'>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String
    }
  },
  name: 'app-button',
};
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: lightslategray;
  border: 1px solid lightslategray;
  cursor: pointer;
;
}
</style>