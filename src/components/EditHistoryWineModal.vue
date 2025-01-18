<template>
    <!-- Modale pour modifier un vin -->
    <VueFinalModal
        v-model="isEditHistoryModalVisible"
        content-class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg mx-auto shadow-lg"
        overlay-class="fixed inset-0 bg-black bg-opacity-50"
        overlay-transition="fade"
        content-transition="slide-up"
    >
        <h2 class="text-2xl font-bold mb-6">
            Modifier le vin - {{ editableWine?.name }}
        </h2>

        <form v-if="editableWine" @submit.prevent="submitForm">
            <div>
                <p class="mb-2">
                    <strong>Appellation :</strong>
                    {{ editableWine.appellation }}
                </p>
                <p class="mb-4">
                    <strong>Quantité restante :</strong>
                    {{ editableWine.quantityLeft }}
                </p>
                <div>
                    <label for="quantity" class="block font-semibold mb-1">
                        Moodifier le nombres de bouteilles consommées :
                    </label>
                    <input
                        id="quantity"
                        v-model.number="editableWine.quantityDrunk"
                        type="number"
                        min="0"
                        :max="editableWine.quantityLeft"
                        class="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                </div>
                <div class="mt-4">
                    <label for="comment" class="block font-semibold mb-1">
                        Modifier le commentaire :
                    </label>
                    <textarea
                        id="comment"
                        v-model="editableWine.notes"
                        class="border border-gray-300 rounded px-2 py-1 w-full"
                        rows="3"
                        placeholder="Ajouter un commentaire..."
                    ></textarea>
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
            </div>
        </form>
    </VueFinalModal>
</template>
<script setup lang="ts">
    import { VueFinalModal } from 'vue-final-modal';
    import { PropType, ref, computed, watch } from 'vue';
    import { Wine } from '../models/Wine';

    // Props
    const props = defineProps({
        modelValue: {
            type: Boolean,
            required: true,
        },
        selectedWine: {
            type: Object as PropType<Wine>,
            required: true,
        },
        onEditDrunkWine: {
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
    const isEditHistoryModalVisible = computed({
        get: () => props.modelValue,
        set: (value: boolean) => emit('update:modelValue', value),
    });

    function submitForm() {
        if (props.onEditDrunkWine) {
            props.onEditDrunkWine(editableWine.value); // Émet l'événement pour modifier le vin
        }
        closeModal();
    }

    // Fermer la modale
    function closeModal() {
        emit('update:modelValue', false); // Informe le parent que la modale doit se fermer
    }
</script>
