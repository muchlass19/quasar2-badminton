<template>
  <div>
    <div class="row">
      <!-- TEAM A -->
      <div class="col-6">
        <div>
          <q-card
            @click="addScoreA"
            :class="`${
              valueIsServerA1 ? 'bg-warning' : 'bg-positive'
            } my-card text-white`"
            square
            flat
            bordered
          >
            <q-card-section class="absolute-center">
              <div class="text-h6">{{ valueNameA1 }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div>
          <q-card
            @click="addScoreA"
            :class="`${
              valueIsServerA2 ? 'bg-warning' : 'bg-positive'
            } my-card text-white`"
            square
            flat
            bordered
          >
            <q-card-section class="absolute-center">
              <div class="text-h6">{{ valueNameA2 }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- TEAM B -->
      <div class="col-6">
        <div>
          <q-card
            @click="addScoreB"
            :class="`${
              valueIsServerB1 ? 'bg-warning' : 'bg-positive'
            } my-card text-white`"
            square
            flat
            bordered
          >
            <q-card-section class="absolute-center">
              <div class="text-h6">{{ valueNameB1 }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div>
          <q-card
            @click="addScoreB"
            :class="`${
              valueIsServerB2 ? 'bg-warning' : 'bg-positive'
            } my-card text-white`"
            square
            flat
            bordered
          >
            <q-card-section class="absolute-center">
              <div class="text-h6">{{ valueNameB2 }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useBadmintonStore } from "../stores/BadmintonStore";
import { computed } from "vue";

// Pinia Store
const store = useBadmintonStore();

const valueNameA1 = computed(() => store.getNameA1);
const valueNameA2 = computed(() => store.getNameA2);
const valueNameB1 = computed(() => store.getNameB1);
const valueNameB2 = computed(() => store.getNameB2);
const valueScore1 = computed(() => store.getScore1);
const valueScore2 = computed(() => store.getScore2);
const valueIsServerA1 = computed(() => store.getIsServerA1);
const valueIsServerA2 = computed(() => store.getIsServerA2);
const valueIsServerB1 = computed(() => store.getIsServerB1);
const valueIsServerB2 = computed(() => store.getIsServerB2);
const valueIsFastStart = computed(() => store.getIsFastStart);

// Methods for score manipulation
defineEmits(["config-on"]);
function addScoreA() {
  if (
    valueScore1.value === 0 &&
    valueScore2.value === 0 &&
    valueNameA2.value === "" &&
    !valueIsFastStart.value
  ) {
    emit("config-on");
  } else {
    store.setScore1();
  }
}

function addScoreB() {
  if (
    valueScore1.value === 0 &&
    valueScore2.value === 0 &&
    valueNameB1.value === "" &&
    !valueIsFastStart.value
  ) {
    emit("config-on");
  } else {
    store.setScore2();
  }
}
</script>
<style scoped>
.my-card {
  min-height: 47vh;
  text-align: center;
  border: 4px solid #f4f5f7;
  cursor: pointer;
  min-width: 30vw;
}

@media only screen and (max-width: 600px) {
  .my-card {
    min-height: 32vh;
  }
}
</style>
