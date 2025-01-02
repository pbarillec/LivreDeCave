<template>
    <div>
        <h1>Ma Cave</h1>
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Appellation</th>
                    <th>Producteur</th>
                    <th>Couleur</th>
                    <th>Millésime</th>
                    <th>Date d'achat</th>
                    <th>Prix d'achat</th>
                    <th>Contenance</th>
                    <th>Quantité achetée</th>
                    <th>Quantité Restante</th>
                    <th>Apogée</th>
                    <th>Commentaires</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="winesComputed.length === 0">
                    <td colspan="12">Aucun vin dans la cave pour le moment.</td>
                </tr>
                <tr v-else v-for="wine in winesComputed" :key="wine.id">
                    <td>{{ wine.name }}</td>
                    <td>{{ wine.appellation }}</td>
                    <td>{{ wine.producer }}</td>
                    <td>{{ wine.color }}</td>
                    <td>{{ wine.vintage }}</td>
                    <td>{{ wine.purchaseDate }}</td>
                    <td>{{ wine.purchasePrice }}</td>
                    <td>{{ wine.bottleSize }}</td>
                    <td>{{ wine.quantityBought }}</td>
                    <td>{{ wine.quantityLeft }}</td>
                    <td>{{ wine.peak }}</td>
                    <td>{{ wine.notes }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const wines = ref([]);
wines.value = [
    {
        id: 1,
        name: "Château Margaux",
        appellation: "Margaux",
        producer: "Château Margaux",
        color: "Red",
        vintage: 2015,
        purchaseDate: "2023-11-01",
        purchasePrice: 250,
        bottleSize: 750,
        quantityBought: 6,
        quantityLeft: 6,
        peak: "2025-2030",
        notes: "A great wine.",
    },
];

const winesComputed = computed(() => wines.value);


</script>
