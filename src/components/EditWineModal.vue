<template>
    <!-- Modale pour modifier un vin -->
    <VueFinalModal
        v-model="isEditModalVisible"
        content-class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg mx-auto shadow-lg"
        overlay-class="fixed inset-0 bg-black bg-opacity-50"
        overlay-transition="fade"
        content-transition="slide-up"
    >
        <h2 class="text-2xl font-bold mb-6">
            Modifier le vin - {{ selectedWine?.name }}
        </h2>
        <form v-if="editableWine" @submit.prevent="submitForm">
            <!-- Ligne 1 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Nom du vin :</label
                    >
                    <input
                        type="text"
                        v-model="editableWine.name"
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
                        v-model="editableWine.appellation"
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
                        v-model="editableWine.producer"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : Château Margaux"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Couleur :</label
                    >
                    <select
                        v-model="editableWine.color"
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
                        v-model="editableWine.vintage"
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
                        v-model="editableWine.purchaseDate"
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
                        type="test"
                        v-model="editableWine.purchasePrice"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : 25.50"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Contenance de la bouteille :</label
                    >
                    <input
                        type="number"
                        v-model="editableWine.bottleSize"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : 750 (en ml)"
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
                        v-model="editableWine.quantityBought"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : 6"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Date de consommation optimale :</label
                    >
                    <input
                        type="date"
                        v-model="editableWine.peak"
                        class="w-full border-gray-300 rounded px-3 py-2"
                    />
                </div>
            </div>

            <!-- Ligne 6 -->
            <div class="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Infos supplémentaire :</label
                    >
                    <input
                        type="text"
                        v-model="editableWine.infos"
                        class="w-full border-gray-300 rounded px-3 py-2"
                        placeholder="Ex : Moelleux"
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
                    Enregistrer
                </button>
            </div>
        </form>
    </VueFinalModal>
</template>
<script setup lang="ts">
    import { VueFinalModal } from 'vue-final-modal';
    import { PropType, ref, computed, watch } from 'vue';
    import { Wine } from '../models/Wine';

    const props = defineProps({
        modelValue: {
            type: Boolean,
            required: true,
        },
        selectedWine: {
            type: Object as PropType<Wine>,
            required: true,
        },
        onEditWine: {
            type: Function,
            required: true,
        } as unknown as PropType<(wine: Wine) => void>,
    });

    const emit = defineEmits(['update:modelValue']);

    const editableWine = ref<Wine>({ ...props.selectedWine });

    // Synchroniser `editableWine` avec `selectedWine` lorsque ce dernier change
    watch(
        () => props.selectedWine,
        (newWine) => {
            editableWine.value = { ...newWine }; // Met à jour `editableWine` avec les nouvelles données
        },
        { immediate: true } // Exécute immédiatement au montage
    );

    // Proxy pour `v-model`
    const isEditModalVisible = computed({
        get: () => props.modelValue,
        set: (value: boolean) => emit('update:modelValue', value),
    });

    function submitForm() {
        if (props.onEditWine) {
            props.onEditWine(editableWine.value); // Émet l'événement pour modifier le vin
        }
        closeModal();
    }

    // Fermer la modale
    function closeModal() {
        emit('update:modelValue', false); // Informe le parent que la modale doit se fermer
    }
</script>
