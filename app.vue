<script setup lang="ts">
// <html lang> und hreflang-Links je Sprache (D-018)
const head = useLocaleHead()
useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang },
  link: () => head.value.link ?? [],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
