<template>
    <div>
        <!-- Total de chaque couleur de vin -->
        <div class="mt-4">
            <span class="font-bold">Total de chaque couleur de vin :</span>
            <span class="ml-2">
                Rouge ({{
                    wines.filter((wine) => wine.color === 'Rouge').length
                }}),
            </span>
            <span class="ml-2">
                Blanc ({{
                    wines.filter((wine) => wine.color === 'Blanc').length
                }}),
            </span>
            <span class="ml-2">
                Rosé ({{
                    wines.filter((wine) => wine.color === 'Rosé').length
                }})
            </span>
        </div>

        <!-- Tableau -->
        <table
            class="table-auto w-full border-collapse border border-gray-300 mt-4"
        >
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2">Nom</th>
                    <th class="border border-gray-300 px-4 py-2">
                        Appellation
                    </th>
                    <th class="border border-gray-300 px-4 py-2">Producteur</th>
                    <th class="border border-gray-300 px-4 py-2">Couleur</th>
                    <th class="border border-gray-300 px-4 py-2 w-20">
                        Millésime
                    </th>
                    <th class="border border-gray-300 px-4 py-2 w-32">
                        Date d'achat
                    </th>
                    <th class="border border-gray-300 px-4 py-2 w-28">
                        Prix d'achat
                    </th>
                    <th class="border border-gray-300 px-4 py-2 w-28">
                        Contenance
                    </th>
                    <th class="border border-gray-300 px-4 py-2 w-20">
                        Quantité achetée
                    </th>
                    <th class="border border-gray-300 px-4 py-2 w-20">
                        Quantité Restante
                    </th>
                    <th class="border border-gray-300 px-4 py-2 w-36">
                        Apogée
                    </th>
                    <th class="border border-gray-300 px-4 py-2">
                        Commentaires
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="wines.length === 0">
                    <td
                        colspan="12"
                        class="text-center text-gray-500 italic py-4"
                    >
                        Aucun vin dans la cave pour le moment.
                    </td>
                </tr>
                <tr
                    v-else
                    v-for="wine in wines"
                    :key="wine.id"
                    class="odd:bg-white even:bg-gray-100"
                >
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.name }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.appellation }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.producer }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.color }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.vintage }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.purchaseDate }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.purchasePrice }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.bottleSize }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.quantityBought }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.quantityLeft }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.peak }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ wine.notes }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
    import { Wine } from '../models/Wine';

    defineProps<{
        wines: Wine[];
    }>();
</script>
