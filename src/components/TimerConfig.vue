<template>
  <div>
    <!-- Menampilkan timer -->
    <div class="text-subtitle2">{{ timer }}</div>
  </div>
</template>

<script>
import { useBadmintonStore } from "../stores/BadmintonStore"; // Ganti dengan path store yang sesuai

export default {
  name: "TimerConfig",
  computed: {
    // Ambil state langsung dari store Pinia
    timer() {
      const store = useBadmintonStore();
      return store.timer;
    },
  },
};
</script>

<style scoped>
/* Tambahkan gaya kustom di sini jika diperlukan */
</style>
