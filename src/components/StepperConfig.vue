<template>
  <q-dialog v-model="localStepDialog" class="q-pa-md" persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Config</div>
        <q-space />
        <q-btn
          @click="closeDialog"
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
          contracted
          header-nav
        >
          <q-step :name="1" title="Pilih Langsung Mulai" :done="step > 1">
            <div class="q-gutter-sm q-pa-md text-center">
              <q-radio
                v-model="isFastStart"
                :val="true"
                label="Langsung Mulai"
              />
              <q-radio
                v-model="isFastStart"
                :val="false"
                label="Masukkan Nama"
              />
            </div>
          </q-step>

          <q-step :name="2" title="Pilih Mode Pertandingan" :done="step > 2">
            <div class="q-gutter-sm q-pa-md text-center">
              <div class="text-subtitle2">Match Type</div>
              <q-radio v-model="isSingle" :val="true" label="Single" />
              <q-radio v-model="isSingle" :val="false" label="Ganda" />
            </div>
          </q-step>

          <q-step
            :name="3"
            title="Masukkan Nama Team"
            caption="Optional"
            class="text-center"
            :done="step > 3"
          >
            <div class="text-subtitle2">Team Name</div>
            <SingleForm
              :value="valueTeamA"
              :label="labelTeamA"
              @setValue="setTeamAValue"
            />
            <SingleForm
              :value="valueTeamB"
              :label="labelTeamB"
              @setValue="setTeamBValue"
            />
          </q-step>

          <q-step
            :name="4"
            title="Masukkan Nama Player A"
            class="text-center"
            :done="step > 4"
          >
            <div class="text-subtitle2">{{ valueTeamA }}</div>
            <SingleForm
              v-if="!isSingle"
              :value="valuePlayerA1"
              :label="labelPlayerA1"
              @setValue="setPlayerA1Value"
            />
            <SingleForm
              :value="valuePlayerA2"
              :label="labelPlayerA2"
              @setValue="setPlayerA2Value"
            />
          </q-step>

          <q-step :name="5" title="Masukkan Nama Player B" class="text-center">
            <div class="text-subtitle2">{{ valueTeamB }}</div>
            <SingleForm
              v-if="!isSingle"
              :value="valuePlayerB2"
              :label="labelPlayerB2"
              @setValue="setPlayerB2Value"
            />
            <SingleForm
              :value="valuePlayerB1"
              :label="labelPlayerB1"
              @setValue="setPlayerB1Value"
            />
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="row justify-center">
              <q-btn
                @click="handleClick"
                color="primary"
                :label="stepperLabelBtn"
              />
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useBadmintonStore } from "../stores/BadmintonStore";
import { defineProps } from "vue";
import SingleForm from "./SingleForm.vue";

// Define props and emitters
const props = defineProps({
  stepDialog: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["closeDialog"]);

// Sync dialog state with the prop
const step = ref(1);

// Pinia store
const badmintonStore = useBadmintonStore();

// Define values for teams and players
const labelTeamA = "Team A";
const labelPlayerA1 = "Player A Kiri";
const labelPlayerA2 = "Player A Kanan";
const labelTeamB = "Team B";
const labelPlayerB1 = "Player B Kanan";
const labelPlayerB2 = "Player B Kiri";

// Computed values
const valueTeamA = computed(() => badmintonStore.getTeam1);
const valueTeamB = computed(() => badmintonStore.getTeam2);
const valuePlayerA1 = computed(() => badmintonStore.getNameA1);
const valuePlayerA2 = computed(() => badmintonStore.getNameA2);
const valuePlayerB1 = computed(() => badmintonStore.getNameB1);
const valuePlayerB2 = computed(() => badmintonStore.getNameB2);
const valueIsSingle = computed(() => badmintonStore.getIsSingle);
const valueIsFastStart = computed(() => badmintonStore.getIsFastStart);

const stepperLabelBtn = computed(() =>
  step.value === 5 || valueIsFastStart.value ? "Finish" : "Continue"
);

// Binding isSingle and isFastStart to store values
const isSingle = computed({
  get: () => valueIsSingle.value,
  set: (val) => badmintonStore.setIsSingle(val),
});

const isFastStart = computed({
  get: () => valueIsFastStart.value,
  set: (val) => badmintonStore.setIsFastStart(val),
});

const localStepDialog = computed({
  get: () => props.stepDialog,
  set: (val) => emit("closeDialog", val),
});

// Methods to set values
const setTeamAValue = (val) => badmintonStore.setTeamA(val);
const setTeamBValue = (val) => badmintonStore.setTeamB(val);
const setPlayerA1Value = (val) => badmintonStore.setNameA1(val);
const setPlayerA2Value = (val) => badmintonStore.setNameA2(val);
const setPlayerB1Value = (val) => badmintonStore.setNameB1(val);
const setPlayerB2Value = (val) => badmintonStore.setNameB2(val);

// Handle next/finish action
const handleClick = () => {
  if (step.value < 5 && !valueIsFastStart.value) {
    step.value++;
  } else {
    badmintonStore.setScoresHistory();
    badmintonStore.setCanPlay();
    step.value = 1;
    emit("closeDialog");
  }
};
</script>
