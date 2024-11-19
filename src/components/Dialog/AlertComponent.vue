<template>
  <q-dialog v-model="isVisible" persistent @hide="onDialogHide">
    <q-card class="my-card">
      <!-- Title -->
      <q-card-section
        v-if="props.title"
        class="text-center title-text-dark-blue font-22"
      >
        {{ props.title }}
      </q-card-section>

      <q-separator />

      <!-- ICON -->
      <q-card-section v-if="props.iconPath">
        <q-icon :name="`img:${props.iconPath}`" />
      </q-card-section>

      <!-- Dynamic Icon Sections -->
      <q-card-section
        v-if="props.iconName === 'check_circle'"
        class="success-icon row flex flex-center"
      >
        <q-icon size="60px" :name="props.iconName" :class="props.iconClass" />
      </q-card-section>
      <q-card-section
        v-if="props.iconName === 'cancel'"
        class="reject-icon row flex flex-center"
      >
        <q-icon size="60px" :name="props.iconName" :class="props.iconClass" />
      </q-card-section>

      <!-- Message -->
      <q-card-section class="text-center">
        {{ props.message }}
      </q-card-section>

      <!-- Full Time -->
      <q-card-section class="text-center text-bold"> Full Time </q-card-section>
      <q-card-section class="text-center">
        {{ props.fulltime }}
      </q-card-section>

      <!-- Scores History -->
      <q-card-section
        v-for="(item, idx) in props.scoresHistory"
        :key="idx"
        class="text-center row"
      >
        <div class="col">
          <div>
            {{ item.teamA }}
            <q-chip v-if="item.isBallA" dense color="secondary" />
          </div>
          <div class="text-weight-bold">{{ item.score1 }}</div>
        </div>
        <div class="col">vs</div>
        <div class="col">
          <div>
            {{ item.teamB }}
            <q-chip v-if="!item.isBallA" dense color="secondary" />
          </div>
          <div class="text-weight-bold">{{ item.score2 }}</div>
        </div>
      </q-card-section>

      <!-- Actions -->
      <q-card-actions align="center">
        <q-btn
          name="alertBtn"
          class="btn-80"
          unelevated
          no-caps
          :label="props.label"
          color="primary"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";

// Props
const props = defineProps({
  title: String,
  scoresHistory: Array,
  message: String,
  fulltime: String,
  iconPath: { type: String, default: "" },
  iconName: { type: String, default: "" },
  iconClass: { type: String, default: "" },
  label: { type: String, default: "OK" },
});

// Emit
const emit = defineEmits(["ok", "hide"]);

// Visibility state
const isVisible = ref(false);

// Methods
const show = () => {
  isVisible.value = true;
};

const hide = () => {
  isVisible.value = false;
};

const onDialogHide = () => {
  emit("hide");
};

const onOKClick = () => {
  emit("ok");
  hide();
};

// Computed helper (if necessary)
const datas = computed(() => {
  return message?.split(",").filter((item) => item !== "") || [];
});
</script>

<style>
.font-22 {
  font-size: 22px;
  font-weight: bold;
}
.my-card {
  min-width: 480px;
}
.success-icon {
  color: #1ec759;
}
.reject-icon {
  margin-bottom: 8px;
  color: #eb5757;
}
</style>
