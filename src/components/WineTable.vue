<template>
    <div class="wine-table-container">
        <!-- Titres des colonnes -->
        <div class="table-header">
            <span v-for="column in columns" :key="column" class="column-title">
                {{ columnLabels[column] }}
            </span>
            <span v-if="actions.length" class="column-title text-center">
                Actions
            </span>
        </div>

        <!-- Conteneur avec SCROLL SEULEMENT SUR LE TABLEAU -->
        <div class="table-scrollable">
            <!-- Ligne de chaque vin -->
            <div v-if="wines.length === 0" class="no-wines">
                Aucun vin disponible.
            </div>
            <div v-else v-for="wine in wines" :key="wine.id" class="wine-row">
                <!-- Données du vin -->
                <div v-for="column in columns" :key="column" class="wine-data">
                    <span
                        v-if="column === 'name'"
                        class="flex items-center justify-center gap-2"
                    >
                        {{ wine[column as keyof Wine] }}
                        <span
                            v-if="wine.infos"
                            class="info-icon group relative"
                        >
                            ℹ️
                            <span
                                class="tooltip opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {{ wine.infos }}
                            </span>
                        </span>
                    </span>
                    <span v-else>
                        {{
                            column === 'purchaseDate'
                                ? formatDate(String(wine[column as keyof Wine]))
                                : wine[column as keyof Wine]
                        }}
                    </span>
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
        infos: 'Infos',
    };

    function formatDate(date: string): string {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }
</script>
<style scoped>
    /* Conteneur du tableau avec scroll */
    .wine-table-container {
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 220px); /* Ajuste selon le besoin */
    }

    /* Titres des colonnes */
    .table-header {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(100px, 1fr)
        ); /* Aligne avec les données */
        font-weight: bold;
        font-size: 1em;
        border-bottom: 2px solid #8b0000;
        padding: 10px 0;
        background-color: #fff5e1; /* Fond légèrement teinté */
        position: sticky;
        top: 0;
        z-index: 2;
        text-align: center;
    }

    /* Chaque ligne de vin */
    .wine-row {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(100px, 1fr)
        ); /* Même structure que le header */
        font-family: 'Cursive', serif;
        padding: 15px 0;
        border-bottom: 1px solid #8b0000;
        text-align: center;
    }

    /* Données du vin */
    .wine-data {
        flex: 1;
        text-align: center;
        white-space: normal; /* Permet le retour à la ligne */
        word-wrap: break-word;
        overflow-wrap: break-word;
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

    /* Icône ℹ️ et tooltip */

    .info-icon {
        cursor: pointer;
        font-size: 16px;
        color: #007bff;
        position: relative;
    }

    .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: white;
        font-size: 12px;
        padding: 5px;
        border-radius: 4px;
        white-space: nowrap;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .group:hover .tooltip {
        opacity: 1;
    }
</style>
