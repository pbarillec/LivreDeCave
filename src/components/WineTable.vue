<template>
    <div>
        <!-- Total de chaque couleur de vin -->
        <div class="mt-4">
            <span class="font-bold">Total de chaque couleur de vin :</span>
            <span class="ml-2">
                Rouge ({{ computeNumberOfBottleByColor('Rouge') }}),
            </span>
            <span class="ml-2">
                Blanc ({{ computeNumberOfBottleByColor('Blanc') }}),
            </span>
            <span class="ml-2">
                Rosé ({{ computeNumberOfBottleByColor('Rosé') }})
            </span>
        </div>

        <!-- Tableau -->
        <table
            class="table-auto w-full border-collapse border border-gray-300 mt-4"
        >
            <thead>
                <tr class="bg-gray-200">
                    <th
                        v-for="column in columns"
                        :key="column"
                        class="border border-gray-300 px-4 py-2"
                    >
                        {{ columnLabels[column] }}
                    </th>
                    <th
                        v-if="actions.length"
                        class="border border-gray-300 px-4 py-2 text-center"
                    >
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="wines.length === 0">
                    <td
                        :colspan="columns.length + (actions.length ? 1 : 0)"
                        class="text-center text-gray-500 italic py-4"
                    >
                        Aucun vin disponible.
                    </td>
                </tr>
                <tr
                    v-else
                    v-for="wine in wines"
                    :key="wine.id"
                    class="odd:bg-white even:bg-gray-100"
                >
                    <td
                        v-for="column in columns"
                        :key="column"
                        class="border border-gray-300 px-4 py-2"
                    >
                        {{
                            column === 'purchaseDate'
                                ? formatDate(String(wine[column as keyof Wine]))
                                : wine[column as keyof Wine]
                        }}

                        <!-- {{ wine[column as keyof Wine] }} -->
                    </td>
                    <td
                        v-if="actions.length"
                        class="border border-gray-300 px-4 py-2 text-center"
                    >
                        <button
                            v-if="actions.includes('consume')"
                            @click="$emit('consume', wine)"
                            class="bg-green-500 text-white px-2 py-1 rounded shadow"
                        >
                            Consommer
                        </button>
                        <button
                            v-if="actions.includes('edit')"
                            @click="$emit('edit', wine)"
                            class="bg-blue-500 text-white px-2 py-1 rounded shadow"
                        >
                            Modifier
                        </button>
                        <button
                            v-if="actions.includes('delete')"
                            @click="$emit('delete', wine)"
                            class="bg-red-500 text-white px-2 py-1 rounded shadow"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
    import { Wine } from '../models/Wine';
    import { PropType } from 'vue';

    const props = defineProps({
        wines: {
            type: Array as PropType<Wine[]>,
            required: true,
        },
        columns: {
            type: Array as PropType<string[]>,
            required: true,
        },
        actions: {
            type: Array as PropType<string[]>,
            default: () => [],
        },
    });

    const columnLabels: Record<string, string> = {
        name: 'Nom',
        appellation: 'Appellation',
        producer: 'Producteur',
        wineType: 'Vignoble',
        color: 'Couleur',
        vintage: 'Millésime',
        purchaseDate: "Date d'achat",
        purchasePrice: "Prix d'achat",
        bottleSize: 'Contenance (cl)',
        quantityBought: 'Quantité achetée',
        quantityLeft: 'Quantité Restante',
        quantityDrunk: 'Quantité Bue',
        peak: 'Apogée',
        notes: 'Commentaires',
    };

    function formatDate(date: string): string {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }

    function computeNumberOfBottleByColor(color: string) {
        const winesFound = props.wines.filter((wine) => wine.color === color);
        let total = 0;
        for (const wine of winesFound) {
            total += wine.quantityBought;
        }
        return total;
    }
</script>
