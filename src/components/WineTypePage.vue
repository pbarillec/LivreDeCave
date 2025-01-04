<template>
    <div>
        <div class="bg-paper text-ink min-h-screen p-4">
            <h1 class="text-4xl font-serif">Vins de {{ wineType }}</h1>
            <p>Voici tous les vins de type "{{ wineType }}".</p>

            <!-- Composant de tri et filtre -->
            <SortAndFilterComponent
                @update-data="updateFilteredAndSortedWines"
            />

            <!-- Tableau des vins -->
            <WineTable :wines="filteredAndSortedWines" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import SortAndFilterComponent from '../components/SortAndFilterComponent.vue';
    import WineTable from '../components/WineTable.vue';
    import { Wine } from '../models/Wine';

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
            'Un vin exceptionnel.',
            'Bordeaux'
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
            'Un vin légendaire.',
            'Bordeaux'
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
            "Chef-d'œuvre rare.",
            'Loire'
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
            'Un grand vin moelleux.',
            'Alsace'
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
            'Puissant et élégant.',
            'Provence'
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
            'Solide et structuré.',
            'Côote du Rhône'
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
            'Harmonieux avec une grande finesse.',
            'Bourgogne'
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
            'Frais et élégant.',
            'Bourgogne'
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
            'Un équilibre remarquable.',
            'Bordeaux'
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
            'Complexe et raffiné.',
            'Divers'
        ),
    ];

    const route = useRoute();
    const wineType = ref(route.params.type as string);

    // Liste des vins filtrés par type
    const winesByType = computed(() => {
        return wines.value.filter((wine) => wine.wineType === wineType.value);
    });

    // Données triées et filtrées
    const filteredAndSortedWines = ref<Wine[]>([]);
    // Mettre à jour la liste après tri/filtrage
    const updateFilteredAndSortedWines = ({
        sortColumn,
        sortOrder,
        filterColor,
        filterVintage,
    }: {
        sortColumn: keyof Wine;
        sortOrder: 'asc' | 'desc';
        filterColor?: string;
        filterVintage?: number;
    }) => {
        let result = [...winesByType.value];

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
                return sortOrder === 'asc'
                    ? (a[sortColumn] as number) - (b[sortColumn] as number)
                    : (b[sortColumn] as number) - (a[sortColumn] as number);
            }
        });

        filteredAndSortedWines.value = result;
    };

    // Initialiser avec les vins non triés/filtrés
    filteredAndSortedWines.value = [...winesByType.value];
</script>
