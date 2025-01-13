<template>
    <!-- Modale pour consommer un vin -->

    <VueFinalModal
        v-model="isConsumeModalVisible"
        content-class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg max-w-lg mx-auto shadow-lg"
        overlay-class="fixed inset-0 bg-black bg-opacity-50"
        overlay-transition="fade"
        content-transition="slide-up"
    >
        <h2 class="text-2xl font-bold mb-4">
            Consommer : {{ selectedWine?.name }}
        </h2>
        <div v-if="selectedWine">
            <p class="mb-2">
                <strong>Appellation :</strong>
                {{ selectedWine.appellation }}
            </p>
            <p class="mb-4">
                <strong>Quantité restante :</strong>
                {{ selectedWine.quantityLeft }}
            </p>
            <div>
                <label for="quantity" class="block font-semibold mb-1">
                    Combien de bouteilles voulez-vous consommer ?
                </label>
                <input
                    id="quantity"
                    v-model.number="quantityToConsume"
                    type="number"
                    min="1"
                    :max="selectedWine.quantityLeft"
                    class="border border-gray-300 rounded px-2 py-1 w-full"
                />
            </div>
            <div class="mt-4">
                <label for="comment" class="block font-semibold mb-1">
                    Ajouter un commentaire :
                </label>
                <textarea
                    id="comment"
                    v-model="comment"
                    class="border border-gray-300 rounded px-2 py-1 w-full"
                    rows="3"
                    placeholder="Ajouter un commentaire..."
                ></textarea>
            </div>
            <div class="flex justify-end mt-4">
                <button
                    @click="closeModal"
                    class="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Annuler
                </button>
                <button
                    @click="handleConsumption"
                    class="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Confirmer
                </button>
            </div>
        </div>
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
        onConsumeWine: {
            type: Function as PropType<
                (quantity: number, comment: string) => void
            >,
            required: true,
        },
    });

    const emit = defineEmits(['update:modelValue']);

    const drinkableWine = ref<Wine>({ ...props.selectedWine });
    const quantityToConsume = ref(1);
    const comment = ref('');

    // Synchroniser 'drinkableWine' avec 'selectedWine'
    watch(
        () => props.selectedWine,
        (newValue) => {
            drinkableWine.value = { ...newValue };
        },
        { immediate: true }
    );

    const isConsumeModalVisible = computed({
        get: () => props.modelValue,
        set: (value: boolean) => emit('update:modelValue', value),
    });

    function handleConsumption() {
        if (drinkableWine.value && drinkableWine.value.id) {
            props.onConsumeWine(quantityToConsume.value, comment.value);
        }
        closeModal();
    }

    function closeModal() {
        emit('update:modelValue', false);
    }
</script>
