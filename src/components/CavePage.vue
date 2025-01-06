<template>
    <div>
        <div class="bg-paper text-ink min-h-screen p-4">
            <h1 class="text-4xl font-serif">Ma Cave</h1>

            <!-- <table
                class="table-auto w-full border-collapse border border-gray-300"
            >
                <thead>
                    <tr>
                        <th class="border border-gray-300 px-4 py-2">
                            Vignoble
                        </th>
                        <th class="border border-gray-300 px-4 py-2">Rouge</th>
                        <th class="border border-gray-300 px-4 py-2">Blanc</th>
                        <th class="border border-gray-300 px-4 py-2">Rosé</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, index) in groupedData"
                        :key="row.wineType"
                        :class="{
                            'bg-red-200': index % 2 === 0 && row.Rouge > 0,
                            'bg-red-100': index % 2 !== 0 && row.Rouge > 0,
                            'bg-yellow-200': index % 2 === 0 && row.Blanc > 0,
                            'bg-yellow-100': index % 2 !== 0 && row.Blanc > 0,
                            'bg-orange-200': index % 2 === 0 && row.Rosé > 0,
                            'bg-orange-100': index % 2 !== 0 && row.Rosé > 0,
                        }"
                    >
                        <td class="border border-gray-300 px-4 py-2">
                            {{ row.wineType }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2">
                            {{ row.Rouge }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2">
                            {{ row.Blanc }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2">
                            {{ row.Rosé }}
                        </td>
                    </tr>
                </tbody>
            </table> -->
            <table
                class="table-auto w-full border-collapse border border-gray-300 mt-4"
            >
                <thead>
                    <tr class="bg-gray-200">
                        <th class="border border-gray-300 px-4 py-2 font-serif">
                            Vignoble
                        </th>
                        <th
                            class="border border-gray-300 px-4 py-2 bg-dark-red text-red-900 font-serif"
                        >
                            Rouge
                        </th>
                        <th
                            class="border border-gray-300 px-4 py-2 bg-dark-yellow text-yellow-900 font-serif"
                        >
                            Blanc
                        </th>
                        <th
                            class="border border-gray-300 px-4 py-2 bg-dark-orange text-orange-900 font-serif"
                        >
                            Rosé
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, index) in groupedData"
                        :key="row.wineType"
                        class="odd:bg-white even:bg-gray-100"
                    >
                        <td
                            class="border border-gray-300 px-4 py-2 font-serif text-center"
                        >
                            {{ row.wineType }}
                        </td>
                        <td
                            class="border border-gray-300 px-4 py-2 font-serif text-center"
                            :class="[
                                index % 2 === 0
                                    ? 'bg-light-red'
                                    : 'bg-dark-red',
                                row.Rouge > 0 ? 'font-bold' : '',
                            ]"
                        >
                            {{ row.Rouge }}
                        </td>
                        <td
                            class="border border-gray-300 px-4 py-2 font-serif text-center"
                            :class="[
                                index % 2 === 0
                                    ? 'bg-light-yellow'
                                    : 'bg-dark-yellow',
                                row.Blanc > 0 ? 'font-bold' : '',
                            ]"
                        >
                            {{ row.Blanc }}
                        </td>
                        <td
                            class="border border-gray-300 px-4 py-2 font-serif text-center"
                            :class="[
                                index % 2 === 0
                                    ? 'bg-light-orange'
                                    : 'bg-dark-orange',
                                row.Rosé > 0 ? 'font-bold' : '',
                            ]"
                        >
                            {{ row.Rosé }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { Wine } from '../models/Wine';
    import SortAndFilterComponent from './SortAndFilterComponent.vue';
    import WineTable from './WineTable.vue';
    import { useWineStore } from '../stores/wineStore';

    // Variable de contrôle pour afficher ou cacher la modale
    const wineStore = useWineStore();
    const wines = computed(() => wineStore.wines);

    const isConsumeModalVisible = ref(false);
    const selectedWine = ref<Wine | null>(null);
    const quantityToConsume = ref(1);
    const comment = ref('');

    // Données triées et filtrées
    const filteredAndSortedWines = ref<Wine[]>([...wines.value]);

    // Appeler la fonction lors du montage du composant
    onMounted(() => {
        updateFilteredAndSortedWines({
            sortColumn: 'id', // Colonne par défaut pour le tri
            sortOrder: 'desc', // Ordre par défaut
            filterColor: '', // Pas de filtre couleur par défaut
            filterVintage: null, // Pas de filtre millésime par défaut
        });
    });

    // Colonne à afficher
    const columnsToDisplay = ['wineType', 'color', 'quantityLeft'];

    // Actions disponible
    // const availableActions = ['consume', 'edit', 'delete'];

    // Fonction pour mettre à jour les données en fonction du tri et des filtres
    const updateFilteredAndSortedWines = ({
        sortColumn,
        sortOrder,
        filterColor,
        filterVintage,
    }: any) => {
        // Créer une copie des données des vins
        let result = [...wines.value];

        // Filtrer les vins avec quantité restante > 0
        result = result.filter((wine) => wine.quantityLeft > 0);

        // Appliquer les filtres
        if (filterColor) {
            result = result.filter((wine) => wine.color === filterColor);
        }

        if (filterVintage) {
            result = result.filter((wine) => wine.vintage === filterVintage);
        }

        // Appliquer le tri
        result.sort((a, b) => {
            if (sortColumn === 'name') {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else {
                const col = sortColumn as keyof Wine;
                return sortOrder === 'asc'
                    ? (a[col] as number) - (b[col] as number)
                    : (b[col] as number) - (a[col] as number);
            }
        });

        filteredAndSortedWines.value = result;
    };

    const groupedData = computed(() => {
        const data: {
            wineType: string;
            Rouge: number;
            Blanc: number;
            Rosé: number;
        }[] = [];

        // Couleurs fixes : Rouge, Blanc, Rosé
        const colors = ['Rouge', 'Blanc', 'Rosé'] as const;

        // Obtenir la map des types de vin
        const wineTypeMap = wineStore.getWineTypeMap();
        const allWineTypes = Array.from(wineTypeMap.keys()); // Noms des types pour affichage

        // Initialiser les groupes pour chaque type de vin
        allWineTypes.forEach((wineType: string) => {
            data.push({
                wineType, // Utilise le nom d'affichage
                Rouge: 0,
                Blanc: 0,
                Rosé: 0,
            });
        });

        // Ajouter les données des vins existants dans les groupes correspondants
        wines.value.forEach((wine) => {
            const wineTypeDisplayName = Array.from(wineTypeMap.entries()).find(
                ([, value]) => value === wine.wineType
            )?.[0]; // Récupérer le nom d'affichage à partir de la valeur URL-friendly

            if (!wineTypeDisplayName) return; // Ignorer les types inconnus

            const group = data.find(
                (entry) => entry.wineType === wineTypeDisplayName
            );

            if (
                group &&
                colors.includes(wine.color as (typeof colors)[number])
            ) {
                group[wine.color as 'Rouge' | 'Blanc' | 'Rosé'] +=
                    wine.quantityLeft;
            }
        });

        // Trier par ordre alphabétique des types de vin
        data.sort((a, b) => a.wineType.localeCompare(b.wineType));

        return data;
    });

    // Ouvrir la modal pour consommer
    function openConsumeModal(wine: Wine) {
        selectedWine.value = wine;
        quantityToConsume.value = 1;
        comment.value = wine.notes || ''; // Charger un commentaire existant si présent
        isConsumeModalVisible.value = true;
    }

    // Fermer la modal
    function closeConsumeModal() {
        isConsumeModalVisible.value = false;
        selectedWine.value = null;
    }

    // Confirmer la consommation
    function handleConsumption() {
        if (!selectedWine.value || quantityToConsume.value <= 0) return;

        if (quantityToConsume.value > selectedWine.value.quantityLeft) {
            alert('Quantité invalide !');
            return;
        }

        // Mettre à jour les données
        selectedWine.value.quantityLeft -= quantityToConsume.value;
        selectedWine.value.quantityDrunk += quantityToConsume.value;
        selectedWine.value.notes = comment.value;

        // Mettre à jour le store
        wineStore.updateWine(selectedWine.value);

        console.log(`${quantityToConsume.value} bouteille(s) consommée(s).`);
        closeConsumeModal();
    }

    function handleEdit(wine: Wine) {
        // wineStore.edit(wine);
    }

    function handleDelete(wine: Wine) {
        // wineStore.delete(wine);
    }
</script>
<style scoped>
    /* Rouge Bordeaux */
    .bg-light-red {
        background-color: #f8d7da; /* Couleur claire */
    }

    .bg-dark-red {
        background-color: #f4c2c4; /* Couleur foncée */
    }

    /* Jaune vin blanc */
    .bg-light-yellow {
        background-color: #fff9d6; /* Couleur claire */
    }

    .bg-dark-yellow {
        background-color: #ffeeba; /* Couleur foncée */
    }

    /* Orange vin rosé */
    .bg-light-orange {
        background-color: #ffd9b3; /* Couleur claire */
    }

    .bg-dark-orange {
        background-color: #ffcc88; /* Couleur foncée */
    }

    /* Alignement du texte */
    .text-center {
        text-align: center;
    }
</style>
