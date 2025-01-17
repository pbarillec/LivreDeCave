<template>
    <!-- Modale pour ajouter un vin -->
    <VueFinalModal
        v-model="isModalVisible"
        content-class="fixed-center bg-white p-6 rounded-lg max-w-lg mx-auto shadow-lg"
        overlay-class="bg-black bg-opacity-50"
        overlay-transition="fade"
        content-transition="slide-up"
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
                    <Field
                        name="name"
                        rules="required|min:3"
                        v-slot="{ field, errors }"
                    >
                        <input
                            v-bind="field"
                            type="text"
                            class="w-full border-gray-300 rounded px-3 py-2"
                            placeholder="Ex : Château Margaux"
                        />
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Appellation :</label
                    >
                    <Field
                        name="appellation"
                        rules="required|min:3"
                        v-slot="{ field, errors }"
                    >
                        <input
                            v-bind="field"
                            type="text"
                            class="w-full border-gray-300 rounded px-3 py-2"
                            placeholder="Ex : Margaux"
                        />
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
                </div>
            </div>

            <!-- Ligne 2 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Producteur :</label
                    >
                    <Field
                        name="producer"
                        rules="required|min:3"
                        v-slot="{ field, errors }"
                    >
                        <input
                            v-bind="field"
                            type="text"
                            class="w-full border-gray-300 rounded px-3 py-2"
                            placeholder="Ex : Château Margaux"
                        />
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Couleur :</label
                    >
                    <Field
                        name="color"
                        rules="required"
                        v-slot="{ field, errors }"
                    >
                        <select
                            v-bind="field"
                            class="w-full border-gray-300 rounded px-3 py-2"
                        >
                            <option value="Rouge">Rouge</option>
                            <option value="Blanc">Blanc</option>
                            <option value="Rosé">Rosé</option>
                        </select>
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
                </div>
            </div>

            <!-- Ligne 3 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Millésime :</label
                    >
                    <Field
                        name="vintage"
                        rules="required|integer|min_value:1900|max_value:2099"
                        v-slot="{ field, errors }"
                    >
                        <input
                            v-bind="field"
                            type="number"
                            class="w-full border-gray-300 rounded px-3 py-2"
                            placeholder="Ex : 2015"
                        />
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Date d'achat :</label
                    >
                    <Field
                        name="purchaseDate"
                        rules="required|date"
                        v-slot="{ field, errors }"
                    >
                        <input
                            v-bind="field"
                            type="date"
                            class="w-full border-gray-300 rounded px-3 py-2"
                        />
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
                </div>
            </div>

            <!-- Ligne 4 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Prix d'achat :</label
                    >
                    <Field
                        name="purchasePrice"
                        rules="required|numeric|min_value:0"
                        v-slot="{ field, errors }"
                    >
                        <input
                            v-bind="field"
                            type="number"
                            step="0.01"
                            class="w-full border-gray-300 rounded px-3 py-2"
                            placeholder="Ex : 25.50"
                        />
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Contenance de la bouteille (cl) :</label
                    >
                    <Field
                        name="bottleSize"
                        rules="required|integer|min_value:1"
                        v-slot="{ field, errors }"
                    >
                        <input
                            v-bind="field"
                            type="number"
                            class="w-full border-gray-300 rounded px-3 py-2"
                            placeholder="Ex : 75 (en cl)"
                        />
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
                </div>
            </div>

            <!-- Ligne 5 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Quantité achetée :</label
                    >
                    <Field
                        name="quantityBought"
                        rules="required|integer|min_value:1"
                        v-slot="{ field, errors }"
                    >
                        <input
                            v-bind="field"
                            type="number"
                            class="w-full border-gray-300 rounded px-3 py-2"
                            placeholder="Ex : 6"
                        />
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
                </div>
                <div>
                    <label class="block text-gray-700 font-medium mb-1"
                        >Date de consommation optimale :</label
                    >
                    <Field
                        name="peak"
                        rules="required|integer|min_value:1900|max_value:2099"
                        v-slot="{ field, errors }"
                    >
                        <input
                            v-bind="field"
                            type="number"
                            class="w-full border-gray-300 rounded px-3 py-2"
                            placeholder="Ex : 2030"
                        />
                        <span
                            v-if="errors.length"
                            class="text-red-500 text-sm"
                            >{{ errors[0] }}</span
                        >
                    </Field>
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
    import { PropType, computed } from 'vue';
    import { Wine } from '../models/Wine';
    import { useForm, Field } from 'vee-validate';
    import * as yup from 'yup';

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

    // Schéma de validation Yup
    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Le nom du vin est requis')
            .min(3, 'Le nom doit comporter au moins 3 caractères'),
        appellation: yup.string().required("L'appellation est requise"),
        producer: yup.string().required('Le producteur est requis'),
        color: yup.string().required('La couleur est requise'),
        vintage: yup
            .number()
            .required('Le millésime est requis')
            .min(1900, 'Millésime non valide')
            .max(new Date().getFullYear(), 'Millésime non valide'),
        purchaseDate: yup.string().required("La date d'achat est requise"),
        purchasePrice: yup
            .number()
            .required("Le prix d'achat est requis")
            .min(1, 'Le prix doit être supérieur à 1'),
        bottleSize: yup
            .number()
            .required('La contenance est requise')
            .min(1, 'La contenance doit être supérieure à 1'),
        quantityBought: yup
            .number()
            .required('La quantité achetée est requise')
            .min(1, 'La quantité doit être supérieure à 0'),
        peak: yup
            .number()
            .required("L'apogée est requise")
            .min(new Date().getFullYear(), "L'apogée doit être dans le futur"),
    });

    // Initialisation de Vee-Validate
    const { handleSubmit, resetForm } = useForm({
        validationSchema,
        initialValues: {
            name: '',
            appellation: '',
            producer: '',
            color: 'Rouge',
            vintage: '',
            purchaseDate: new Date().toISOString().split('T')[0],
            purchasePrice: '',
            bottleSize: '',
            quantityBought: '',
            peak: '',
        },
    });

    // Gestion de la soumission
    const submitForm = handleSubmit((values) => {
        const newWine = new Wine(
            0, // id
            values.name,
            values.appellation,
            values.producer,
            values.color,
            parseInt(values.vintage, 10),
            values.purchaseDate,
            parseFloat(values.purchasePrice),
            parseInt(values.bottleSize, 10),
            parseInt(values.quantityBought, 10),
            0, // quantityLeft
            parseInt(values.peak, 10),
            '', // notes
            props.wineTypeUrl ?? '', // wineType
            0 // quantityDrunk
        );

        if (props.onAddWine) {
            props.onAddWine(newWine);
        }

        resetForm(); // Réinitialise le formulaire après soumission
        closeModal();
    });

    // Fermer la modale
    function closeModal() {
        emit('update:modelValue', false); // Informe le parent que la modale doit se fermer
    }
</script>
