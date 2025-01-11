<template>
    <!-- Modale pour ajouter un vin -->
    <VueFinalModal
        v-model="isModalVisible"
        content-class="bg-white p-6 rounded-lg max-w-4xl mx-auto"
        overlay-class="bg-black bg-opacity-50"
    >
        <h2 class="text-2xl font-bold mb-6">
            Ajouter un vin - {{ wineTypeDisplayName }}
        </h2>
        <form @submit.prevent="submitForm">
            <!-- Ligne 1 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Nom du vin :</label
                    >
                    <input
                        type="text"
                        v-model="newWine.name"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : Château Margaux"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Appellation :</label
                    >
                    <input
                        type="text"
                        v-model="newWine.appellation"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : Margaux"
                    />
                </div>
            </div>

            <!-- Ligne 2 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Producteur :</label
                    >
                    <input
                        type="text"
                        v-model="newWine.producer"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : Château Margaux"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Couleur :</label
                    >
                    <select
                        v-model="newWine.color"
                        class="w-full border-gray-300 rounded px-3 py-2"
                    >
                        <option value="Rouge">Rouge</option>
                        <option value="Blanc">Blanc</option>
                        <option value="Rosé">Rosé</option>
                    </select>
                </div>
            </div>

            <!-- Ligne 3 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Millésime :</label
                    >
                    <input
                        type="number"
                        v-model="newWine.vintage"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : 2015"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Date d'achat :</label
                    >
                    <input
                        type="date"
                        v-model="newWine.purchaseDate"
                        class="w-full border-gray-300 rounded px-3 py-2"
                    />
                </div>
            </div>

            <!-- Ligne 4 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Prix d'achat :</label
                    >
                    <input
                        type="number"
                        step="0.01"
                        v-model="newWine.purchasePrice"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : 25.50"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Contenance de la bouteille (cl) :</label
                    >
                    <input
                        type="number"
                        v-model="newWine.bottleSize"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : 75 (en cl)"
                    />
                </div>
            </div>

            <!-- Ligne 5 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Quantité achetée :</label
                    >
                    <input
                        type="number"
                        v-model="newWine.quantityBought"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : 6"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Date de consommation optimale :</label
                    >
                    <input
                        type="number"
                        v-model="newWine.peak"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : 2030"
                    />
                </div>
            </div>

            <!-- Boutons -->
            <div class="flex justify-end gap-4 mt-6">
                <button
                    type="button"
                    @click="closeModal"
                    class="px-6 py-2 bg-gray-400 text-white rounded"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    class="px-6 py-2 bg-blue-600 text-white rounded"
                >
                    Ajouter
                </button>
            </div>
        </form>
    </VueFinalModal>
</template>
<script setup lang="ts">
    import { VueFinalModal } from 'vue-final-modal';
    import { PropType, ref, computed } from 'vue';
    import { Wine } from '../models/Wine';

    const props = defineProps({
        modelValue: {
            type: Boolean,
            required: true,
        },
        wineTypeDisplayName: String,
        wineTypeUrl: String,
        onAddWine: {
            type: Function,
            required: true,
        } as unknown as PropType<(wine: Wine) => void>,
    });

    const emit = defineEmits(['update:modelValue']);

    // Proxy pour `v-model`
    const isModalVisible = computed({
        get: () => props.modelValue,
        set: (value: boolean) => emit('update:modelValue', value),
    });

    // Modèle pour un nouveau vin
    const newWine = ref<Wine>(
        new Wine(
            0, // id
            '', // name
            '', // appellation
            '', // producer
            'Rouge', // color
            0, // vintage
            '', // purchaseDate
            0, // purchasePrice
            750, // bottleSize
            6, // quantityBought
            0, // quantityLeft
            2030, // peak
            '', // notes
            props.wineTypeUrl ?? '', // wineType
            0 // quantityDrunk
        )
    );

    function submitForm() {
        if (props.onAddWine) {
            props.onAddWine(newWine.value); // Appelle la fonction d'ajout
        }
        closeModal();
    }

    // Fermer la modale
    function closeModal() {
        emit('update:modelValue', false); // Informe le parent que la modale doit se fermer
    }
</script>
