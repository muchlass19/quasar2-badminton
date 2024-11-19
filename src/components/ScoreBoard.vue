<template>
  <div class="row justify-center my-absolute">
    <q-card class="my-card">
      <!-- SCORE & TEAM NAME -->
      <q-card-section>
        <div class="row">
          <!-- TEAM 1 -->
          <div class="col text-center">
            <div class="text-h6 text-regular q-mb-md">{{ valueTeam1 }}</div>
            <div class="text-h2 text-bold">{{ valueScore1 }}</div>
          </div>

          <!-- TYPOGRAPHY VS -->
          <div class="col text-center q-mx-lg q-pa-lg">
            <div class="text-h6 text-regular">vs</div>
            <TimerConfig />
          </div>

          <!-- TEAM 2 -->
          <div class="col text-center">
            <div class="text-h6 text-regular q-mb-md">{{ valueTeam2 }}</div>
            <div class="text-h2 text-bold">{{ valueScore2 }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- BUTTON CONFIG -->
      <q-card-section class="flex flex-center">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-btn
              unelevated
              :color="valueIsStart ? 'warning' : 'secondary'"
              :label="valueIsStart ? 'Pause' : 'Start'"
              @click="stopWatchButton"
              :icon="valueIsStart ? 'pause' : 'play_arrow'"
            />
          </div>
          <div class="col">
            <q-btn
              flat
              label="Reset"
              color="negative"
              @click="resetStopwatch"
              icon="replay"
              :disable="disableReset"
            />
          </div>
          <div class="col">
            <q-btn flat @click="undo" :disable="disableUndo">
              <div>
                <img src="~assets/img/undo.svg" class="q-mb-sm" />
                <div class="text-caption text-secondary">Undo</div>
              </div>
            </q-btn>
          </div>
          <div class="col">
            <q-btn flat @click="redo" :disable="!valueIsUndo">
              <div>
                <img src="~assets/img/redo.svg" class="q-mb-sm" />
                <div class="text-caption text-secondary">Redo</div>
              </div>
            </q-btn>
          </div>
          <div class="col">
            <q-btn flat @click="config">
              <div>
                <img src="~assets/img/config.svg" class="q-mb-sm" />
                <div class="text-caption text-secondary">Config</div>
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <StepperConfig :step-dialog="isStepDialog" @closeDialog="close" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import StepperConfig from "./StepperConfig.vue";
import { useBadmintonStore } from "../stores/BadmintonStore"; // Pinia store
import TimerConfig from "./TimerConfig.vue";

// Props
const props = defineProps({
  configOn: {
    type: Boolean,
    default: false,
  },
});

// Refs
const isStepDialog = ref(false);

// Store
const store = useBadmintonStore();
const { setUndo, setRedo, setTimer, resetTimer } = store;

const valueScore1 = computed(() => store.getScore1);
const valueScore2 = computed(() => store.getScore2);
const valueTeam1 = computed(() => store.getTeam1);
const valueTeam2 = computed(() => store.getTeam2);
const valueIsUndo = computed(() => store.getIsUndo);
const valueIsStart = computed(() => store.getIsStart);
const valueTimer = computed(() => store.getTimer);
const valueIsFastStart = computed(() => store.getIsFastStart);
const valueCanPlay = computed(() => store.getCanPlay);

// Computed
const disableUndo = computed(
  () => valueScore1.value === 0 && valueScore2.value === 0
);
const disableReset = computed(
  () => valueTimer.value === "00:00:000" && !valueIsStart.value
);

// Methods
const undo = () => setUndo();
const redo = () => {
  if (valueIsUndo.value) setRedo();
};
const config = () => {
  isStepDialog.value = true;
};
const stopWatchButton = () => {
  if (
    valueScore1.value === 0 &&
    valueScore2.value === 0 &&
    !valueIsFastStart.value &&
    !valueCanPlay.value
  ) {
    isStepDialog.value = true;
  } else {
    setTimer();
  }
};

const emit = defineEmits(["config-off"]);

const resetStopwatch = () => resetTimer();
const close = () => {
  isStepDialog.value = false;
  emit("config-off");
};

// Watch
watch(
  () => props.configOn,
  (newVal) => {
    isStepDialog.value = newVal;
  }
);
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .my-card {
    min-width: 100%;
  }
}

@media only screen and (min-width: 601px) {
  .my-absolute {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
