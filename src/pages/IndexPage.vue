<template>
  <q-page>
    <ScoreBoard :config-on="configOn" @config-off="false" />
    <BadmintonField @config-on="true" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useBadmintonStore } from "stores/BadmintonStore";
import BadmintonField from "src/components/BadmintonField.vue";
import ScoreBoard from "src/components/ScoreBoard.vue";

// Initialize the Pinia store
const store = useBadmintonStore();

// Access the state and actions from the store
const configOn = ref(false);
// const toggleConfig = () => store.toggleConfig();

// // Lazy load components
// const BadmintonField = defineAsyncComponent(() =>
//   import("src/components/BadmintonField")
// );
// const ScoreBoard = defineAsyncComponent(() =>
//   import("src/components/ScoreBoard")
// );

// Call setDefault on component creation
store.setDefault();
</script>
