<template>
    <div>
        <div class="bg-paper text-ink min-h-screen p-4">
            <h1 class="text-4xl font-serif">Ma Cave</h1>
            <p class="text-lg">Bienvenue dans votre livre de cave.</p>
            <table class="table-auto w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="border border-gray-300 px-4 py-2">Nom</th>
                        <th class="border border-gray-300 px-4 py-2">Appellation</th>
                        <th class="border border-gray-300 px-4 py-2">Producteur</th>
                        <th class="border border-gray-300 px-4 py-2">Couleur</th>
                        <th class="border border-gray-300 px-4 py-2 w-20">Millésime</th>
                        <th class="border border-gray-300 px-4 py-2 w-32">Date d'achat</th>
                        <th class="border border-gray-300 px-4 py-2 w-28">Prix d'achat</th>
                        <th class="border border-gray-300 px-4 py-2 w-28">Contenance</th>
                        <th class="border border-gray-300 px-4 py-2 w-20">Quantité achetée</th>
                        <th class="border border-gray-300 px-4 py-2 w-20">Quantité Restante</th>
                        <th class="border border-gray-300 px-4 py-2 w-36">Apogée</th>
                        <th class="border border-gray-300 px-4 py-2">Commentaires</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="winesComputed.length === 0">
                        <td colspan="12" class="text-center text-gray-500 italic py-4">
                            Aucun vin dans la cave pour le moment.
                        </td>
                    </tr>
                    <tr v-else v-for="wine in winesComputed" :key="wine.id" class="odd:bg-white even:bg-gray-100">
                        <td class="border border-gray-300 px-4 py-2">{{ wine.name }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.appellation }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.producer }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.color }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.vintage }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.purchaseDate }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.purchasePrice }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.bottleSize }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.quantityBought }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.quantityLeft }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.peak }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ wine.notes }}</td>
                    </tr>
                </tbody>
            </table>
        </div>    
        
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Wine } from "../models/Wine";

const wines = ref<Wine[]>([]); 
    wines.value = [
    new Wine(1, "Château Margaux", "Margaux", "Château Margaux", "Rouge", 2015, "01-11-2023", 250, 750, 6, 6, "2025-2030", "Un vin exceptionnel."),
    new Wine(2, "Petrus", "Pomerol", "Petrus Estate", "Rouge", 2018, "01-12-2023", 3000, 750, 3, 3, "2030-2040", "Un vin légendaire."),
    new Wine(3, "Domaine de la Romanée-Conti", "Romanée-Conti", "Domaine de la Romanée-Conti", "Rouge", 2017, "01-10-2024", 15000, 750, 1, 1, "2035-2045", "Chef-d'œuvre rare."),
    new Wine(4, "Château d'Yquem", "Sauternes", "Château d'Yquem", "Blanc", 2010, "05-20-2022", 400, 750, 12, 10, "2020-2035", "Un grand vin moelleux."),
    new Wine(5, "Château Lafite Rothschild", "Pauillac", "Château Lafite Rothschild", "Rouge", 2016, "08-15-2023", 800, 750, 5, 4, "2028-2040", "Puissant et élégant."),
    new Wine(6, "Château Latour", "Pauillac", "Château Latour", "Rouge", 2014, "09-10-2023", 650, 750, 8, 8, "2025-2035", "Solide et structuré."),
    new Wine(7, "Château Mouton Rothschild", "Pauillac", "Château Mouton Rothschild", "Rouge", 2019, "02-28-2024", 750, 750, 6, 6, "2030-2040", "Harmonieux avec une grande finesse."),
    new Wine(8, "Domaine Leflaive", "Puligny-Montrachet", "Domaine Leflaive", "Blanc", 2020, "10-01-2023", 350, 750, 4, 4, "2025-2030", "Frais et élégant."),
    new Wine(9, "Château Cheval Blanc", "Saint-Émilion", "Château Cheval Blanc", "Rouge", 2018, "07-14-2023", 950, 750, 7, 5, "2025-2040", "Un équilibre remarquable."),
    new Wine(10, "Château Haut-Brion", "Pessac-Léognan", "Château Haut-Brion", "Rouge", 2015, "03-22-2023", 600, 750, 6, 6, "2025-2035", "Complexe et raffiné."),
];

const winesComputed = computed(() => wines.value);


</script>
