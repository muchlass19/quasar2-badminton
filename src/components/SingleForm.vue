<template>
  <div class="q-pa-md">
    <q-input :label="label" v-model="model" outlined />
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
});

// Emit
const emit = defineEmits(["setValue"]);

// Computed Model
const model = computed({
  get: () => props.value,
  set: (val) => emit("setValue", val),
});
</script>

<style>
/* Tambahkan style jika diperlukan */
</style>
