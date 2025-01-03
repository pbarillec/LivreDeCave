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
import { ref, computed } from "vue";
import { Wine } from "../models/Wine";

const wines = ref<Wine[]>([]); 
    wines.value = [
    new Wine(1, "Château Margaux", "Margaux", "Château Margaux", "Red", 2015, "2023-11-01", 250, 750, 6, 6, "2025-2030", "Un vin exceptionnel."),
    new Wine(2, "Petrus", "Pomerol", "Petrus Estate", "Red", 2018, "2023-12-01", 3000, 750, 3, 3, "2030-2040", "Un vin légendaire."),
    new Wine(3, "Domaine de la Romanée-Conti", "Romanée-Conti", "Domaine de la Romanée-Conti", "Red", 2017, "2024-01-10", 15000, 750, 1, 1, "2035-2045", "Chef-d'œuvre rare."),
    new Wine(4, "Château d'Yquem", "Sauternes", "Château d'Yquem", "White", 2010, "2022-05-20", 400, 750, 12, 10, "2020-2035", "Un grand vin moelleux."),
    new Wine(5, "Château Lafite Rothschild", "Pauillac", "Château Lafite Rothschild", "Red", 2016, "2023-08-15", 800, 750, 5, 4, "2028-2040", "Puissant et élégant."),
    new Wine(6, "Château Latour", "Pauillac", "Château Latour", "Red", 2014, "2023-09-10", 650, 750, 8, 8, "2025-2035", "Solide et structuré."),
    new Wine(7, "Château Mouton Rothschild", "Pauillac", "Château Mouton Rothschild", "Red", 2019, "2024-02-28", 750, 750, 6, 6, "2030-2040", "Harmonieux avec une grande finesse."),
    new Wine(8, "Domaine Leflaive", "Puligny-Montrachet", "Domaine Leflaive", "White", 2020, "2023-10-01", 350, 750, 4, 4, "2025-2030", "Frais et élégant."),
    new Wine(9, "Château Cheval Blanc", "Saint-Émilion", "Château Cheval Blanc", "Red", 2018, "2023-07-14", 950, 750, 7, 5, "2025-2040", "Un équilibre remarquable."),
    new Wine(10, "Château Haut-Brion", "Pessac-Léognan", "Château Haut-Brion", "Red", 2015, "2023-03-22", 600, 750, 6, 6, "2025-2035", "Complexe et raffiné."),
];

const winesComputed = computed(() => wines.value);


</script>
