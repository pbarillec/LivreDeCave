<template>
    <div>
        <div class="bg-paper text-ink min-h-screen p-4">
            <h1 class="text-4xl font-serif">Ma Cave</h1>
            <p class="text-lg">Bienvenue dans votre livre de cave.</p>
            <!-- <button @click="toggleFilters" class="bg-blue-500 text-white px-4 py-2 rounded shadow">
                {{ showFilters ? 'Fermer' : 'Filtrer / Trier' }}
            </button>
            <div v-if="showFilters" class="border border-gray-300 bg-gray-50 p-4 mt-2 rounded">
                <h2 class="text-lg font-bold">Options de tri</h2>
                <label>
                    Colonne :
                    <select v-model="sortColumn" class="border border-gray-300 rounded px-2 py-1">
                        <option value="name">Nom</option>
                        <option value="vintage">Millésime</option>
                        <option value="purchasePrice">Prix d'achat</option>
                        <option value="quantityLeft">Quantité Restante</option>
                    </select>
                </label>
                <div class="mt-2">
                    <label>
                        <input type="radio" value="asc" v-model="sortOrder" />
                        Ascendant
                    </label>
                    <label class="ml-4">
                        <input type="radio" value="desc" v-model="sortOrder" />
                        Descendant
                    </label>
                </div>

                <h2 class="text-lg font-bold mt-4">Filtres</h2>
                <label>
                    Couleur :
                    <select v-model="filterColor" class="border border-gray-300 rounded px-2 py-1">
                        <option value="">Toutes</option>
                        <option value="Rouge">Rouge</option>
                        <option value="Blanc">Blanc</option>
                        <option value="Rosé">Rosé</option>
                    </select>
                </label>
                <label class="ml-4">
                    Millésime :
                    <input type="number" v-model="filterVintage" class="border border-gray-300 rounded px-2 py-1" />
                </label>

                <button @click="resetFilters" class="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2">Réinitialiser</button>
            </div> -->

            <!-- Composant de tri et filtre -->
            <SortAndFilterComponent
                :data="wines"
                @update-data="updateFilteredAndSortedWines"
            />

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
                        <th class="border border-gray-300 px-4 py-2">
                            Producteur
                        </th>
                        <th class="border border-gray-300 px-4 py-2">
                            Couleur
                        </th>
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
                    <tr v-if="filteredAndSortedWines.length === 0">
                        <td
                            colspan="12"
                            class="text-center text-gray-500 italic py-4"
                        >
                            Aucun vin dans la cave pour le moment.
                        </td>
                    </tr>
                    <tr
                        v-else
                        v-for="wine in filteredAndSortedWines"
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
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { Wine } from '../models/Wine';
    import SortAndFilterComponent from './SortAndFilterComponent.vue';

    const wines = ref<Wine[]>([]);
    wines.value = [
        new Wine(
            1,
            'Château Margaux',
            'Margaux',
            'Château Margaux',
            'Rouge',
            2015,
            '01-11-2023',
            250,
            750,
            6,
            6,
            '2025-2030',
            'Un vin exceptionnel.'
        ),
        new Wine(
            2,
            'Petrus',
            'Pomerol',
            'Petrus Estate',
            'Rouge',
            2018,
            '01-12-2023',
            3000,
            750,
            3,
            3,
            '2030-2040',
            'Un vin légendaire.'
        ),
        new Wine(
            3,
            'Domaine de la Romanée-Conti',
            'Romanée-Conti',
            'Domaine de la Romanée-Conti',
            'Rouge',
            2017,
            '01-10-2024',
            15000,
            750,
            1,
            1,
            '2035-2045',
            "Chef-d'œuvre rare."
        ),
        new Wine(
            4,
            "Château d'Yquem",
            'Sauternes',
            "Château d'Yquem",
            'Blanc',
            2010,
            '20-05-2022',
            400,
            750,
            12,
            10,
            '2020-2035',
            'Un grand vin moelleux.'
        ),
        new Wine(
            5,
            'Château Lafite Rothschild',
            'Pauillac',
            'Château Lafite Rothschild',
            'Rouge',
            2016,
            '15-08-2023',
            800,
            750,
            5,
            4,
            '2028-2040',
            'Puissant et élégant.'
        ),
        new Wine(
            6,
            'Château Latour',
            'Pauillac',
            'Château Latour',
            'Rouge',
            2014,
            '09-10-2023',
            650,
            750,
            8,
            8,
            '2025-2035',
            'Solide et structuré.'
        ),
        new Wine(
            7,
            'Château Mouton Rothschild',
            'Pauillac',
            'Château Mouton Rothschild',
            'Rouge',
            2019,
            '28-02-2024',
            750,
            750,
            6,
            6,
            '2030-2040',
            'Harmonieux avec une grande finesse.'
        ),
        new Wine(
            8,
            'Domaine Leflaive',
            'Puligny-Montrachet',
            'Domaine Leflaive',
            'Blanc',
            2020,
            '10-01-2023',
            350,
            750,
            4,
            4,
            '2025-2030',
            'Frais et élégant.'
        ),
        new Wine(
            9,
            'Château Cheval Blanc',
            'Saint-Émilion',
            'Château Cheval Blanc',
            'Rouge',
            2018,
            '14-07-2023',
            950,
            750,
            7,
            5,
            '2025-2040',
            'Un équilibre remarquable.'
        ),
        new Wine(
            10,
            'Château Haut-Brion',
            'Pessac-Léognan',
            'Château Haut-Brion',
            'Rouge',
            2015,
            '22-03-2023',
            600,
            750,
            6,
            6,
            '2025-2035',
            'Complexe et raffiné.'
        ),
    ];

    // Données triées et filtrées
    const filteredAndSortedWines = ref<Wine[]>([...wines.value]);

    // Fonction pour mettre à jour les données en fonction du tri et des filtres
    const updateFilteredAndSortedWines = ({
        sortColumn,
        sortOrder,
        filterColor,
        filterVintage,
    }: any) => {
        let result = [...wines.value];

        // Appliquer les filtres
        if (filterColor)
            result = result.filter((wine) => wine.color === filterColor);
        if (filterVintage)
            result = result.filter((wine) => wine.vintage === filterVintage);

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

    // const winesComputed = computed(() => wines.value);

    // // États pour le tri et les filtres
    // const showFilters = ref(false);
    // const sortColumn = ref<keyof Wine>('name'); // Assure que c'est une clé valide de Wine
    // const sortOrder = ref<'asc' | 'desc'>('asc');
    // const filterColor = ref('');
    // const filterVintage = ref<number | null>(null);

    // const toggleFilters = () => {
    //     showFilters.value = !showFilters.value;
    // };

    // // Propriété calculée pour appliquer les filtres et le tri
    // const filteredAndSortedWines = computed(() => {
    //     let result = [...wines.value]; // Crée une copie des données
    //     // Applique les filtres
    //     if (filterColor.value) {
    //         result = result.filter((wine) => wine.color === filterColor.value);
    //     }
    //     if (filterVintage.value) {
    //         result = result.filter(
    //             (wine) => wine.vintage === filterVintage.value
    //         );
    //     }
    //     // Applique le tri
    //     result.sort((a, b) => {
    //         if (sortColumn.value === 'name') {
    //             return sortOrder.value === 'asc'
    //                 ? a.name.localeCompare(b.name)
    //                 : b.name.localeCompare(a.name);
    //         } else {
    //             const col = sortColumn.value as keyof Wine; // Assure TypeScript que la clé est valide
    //             return sortOrder.value === 'asc'
    //                 ? (a[col] as number) - (b[col] as number)
    //                 : (b[col] as number) - (a[col] as number);
    //         }
    //     });
    //     return result;
    // });

    // const resetFilters = () => {
    //     filterColor.value = ''; // Réinitialise la couleur
    //     filterVintage.value = null; // Réinitialise le millésime
    //     // sortColumn.value = "name"; // Réinitialise la colonne de tri.
    //     sortColumn.value = 'id'; // Réinitialise la colonne de tri
    //     sortOrder.value = 'desc'; // Réinitialise l'ordre de tri
    // };
</script>
