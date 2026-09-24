<script setup lang="ts">
// Demo-Seite für die Sichtprüfung von Typo-Klassen und Raster (P2).
// Wird später durch die echte Startseite (P5/P6) ersetzt.
const gridItems = Array.from({ length: 6 }, (_, i) => i + 1)
</script>

<template>
  <main class="container demo">
    <section class="demo__block">
      <p class="font-body-12 uppercase">Font Body 12 · uppercase</p>
    </section>

    <section class="demo__block">
      <p class="font-body">
        Font Body – Fließtext in normaler Größe für längere Absätze und Beschreibungen.
      </p>
    </section>

    <section class="demo__block">
      <p class="font-body-24">Font Body 24 – für About-Texte.</p>
    </section>

    <section class="demo__block">
      <p class="font-body-40-100">Font Body 40–100 – Intro-Text auf der Case-Seite.</p>
    </section>

    <section class="demo__block">
      <h2 class="font-headline-2">Font Headline 2</h2>
    </section>

    <section class="demo__block">
      <h1 class="font-headline-1">Font Headline 1</h1>
    </section>

    <section class="demo__block">
      <p class="font-body-12 uppercase">Raster · 6 Spalten mobil / 14 ab Desktop</p>
      <div class="grid demo__grid">
        <div v-for="n in gridItems" :key="n" class="demo__cell font-body-12">
          {{ n }}
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.demo {
  padding-block: 4rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.demo__cell {
  background-color: color-mix(in srgb, var(--color-main) 8%, transparent);
  padding: 1.6rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo__grid {
  margin-top: 1.6rem;
}
</style>
