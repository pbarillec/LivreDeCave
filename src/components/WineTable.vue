<template>
    <div>
        <!-- Titres des colonnes -->
        <div class="table-header">
            <span v-for="column in columns" :key="column" class="column-title">
                {{ columnLabels[column] }}
            </span>
            <span v-if="actions.length" class="column-title text-center">
                Actions
            </span>
        </div>

        <!-- Ligne de chaque vin -->
        <div v-if="wines.length === 0" class="no-wines">
            Aucun vin disponible.
        </div>
        <div v-else v-for="wine in wines" :key="wine.id" class="wine-row">
            <!-- Données du vin -->
            <div v-for="column in columns" :key="column" class="wine-data">
                {{
                    column === 'purchaseDate'
                        ? formatDate(String(wine[column as keyof Wine]))
                        : wine[column as keyof Wine]
                }}
            </div>

            <!-- Actions -->
            <div v-if="actions.length" class="actions">
                <button
                    v-if="actions.includes('consume')"
                    @click="$emit('consume', wine)"
                    class="action-button"
                >
                    <img
                        src="@/assets/images/fill-wine-glass.svg"
                        alt="Consommer"
                        class="action-icon"
                    />
                </button>
                <button
                    v-if="actions.includes('edit')"
                    @click="$emit('edit', wine)"
                    class="action-button"
                >
                    <PencilIcon class="action-icon" />
                </button>
                <button
                    v-if="actions.includes('delete')"
                    @click="$emit('delete', wine)"
                    class="action-button"
                >
                    <TrashIcon class="action-icon" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Wine } from '../models/Wine';
    import { PropType } from 'vue';
    import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

    defineProps({
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
</script>
<style scoped>
    /* Titres des colonnes */
    .table-header {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: 1em; /* Taille réduite pour correspondre à l'ancienne taille */
        margin-bottom: 10px;
        border-bottom: 2px solid #8b0000;
        padding-bottom: 10px;
    }

    /* Colonnes des titres */
    .column-title {
        flex: 1;
        text-align: center;
        font-family: 'Georgia', serif;
        font-size: 0.9em; /* Taille ajustée pour une meilleure lisibilité */
    }

    /* Chaque ligne de vin */
    .wine-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Cursive', serif;
        padding: 15px 0;
        border-bottom: 1px solid #8b0000;
    }

    /* Données du vin */
    .wine-data {
        flex: 1;
        text-align: center;
    }

    /* Pas de vins disponibles */
    .no-wines {
        text-align: center;
        font-style: italic;
        color: #888;
        margin-top: 20px;
    }

    /* Boutons d'action */
    .actions {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .action-button {
        background: none;
        border: none;
        cursor: pointer;
    }

    .action-icon {
        width: 24px;
        height: 24px;
        color: black;
        transition: transform 0.3s ease;
    }

    .action-icon:hover {
        transform: scale(1.2);
        color: #8b0000;
    }
</style>
