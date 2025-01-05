import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Wine } from '../models/Wine';

export const useWineStore = defineStore('wineStore', () => {
    const wines = ref<Wine[]>([
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
            'Bordeaux',
            0
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
            0,
            '2030-2040',
            'Un vin légendaire.',
            'Bordeaux',
            3
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
            'Loire',
            0
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
            'Alsace',
            2
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
            'Provence',
            1
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
            'Rhône',
            0
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
            'Bourgogne',
            0
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
            'Bourgogne',
            0
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
            'Bordeaux',
            2
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
            'Divers',
            0
        ),
    ]);

    return { wines };
});
