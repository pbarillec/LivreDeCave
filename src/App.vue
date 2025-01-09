<template>
    <NavigationMenu />
    <router-view />
</template>

<script setup lang="ts">
    import NavigationMenu from './components/NavigationMenu.vue';
    import { onMounted } from 'vue';
    import { useWineStore } from './stores/wineStore';

    const wineStore = useWineStore();

    onMounted(() => {
        wineStore.loadWines();
    });
</script>
