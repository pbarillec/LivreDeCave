import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Wine } from '../models/Wine';
import { invoke } from '@tauri-apps/api/core';

export const useWineStore = defineStore('wineStore', () => {
    // const wines = ref<Wine[]>([
    //     new Wine(
    //         1,
    //         'Château Margaux',
    //         'Margaux',
    //         'Château Margaux',
    //         'Rouge',
    //         2015,
    //         '01-11-2023',
    //         250,
    //         750,
    //         6,
    //         6,
    //         '2025-2030',
    //         'Un vin exceptionnel.',
    //         'bordeaux',
    //         0
    //     ),
    //     new Wine(
    //         2,
    //         'Petrus',
    //         'Pomerol',
    //         'Petrus Estate',
    //         'Rouge',
    //         2018,
    //         '01-12-2023',
    //         3000,
    //         750,
    //         3,
    //         0,
    //         '2030-2040',
    //         'Un vin légendaire.',
    //         'bordeaux',
    //         3
    //     ),
    //     new Wine(
    //         3,
    //         'Domaine de la Romanée-Conti',
    //         'Romanée-Conti',
    //         'Domaine de la Romanée-Conti',
    //         'Rouge',
    //         2017,
    //         '01-10-2024',
    //         15000,
    //         750,
    //         1,
    //         1,
    //         '2035-2045',
    //         "Chef-d'œuvre rare.",
    //         'loire',
    //         0
    //     ),
    //     new Wine(
    //         4,
    //         "Château d'Yquem",
    //         'Sauternes',
    //         "Château d'Yquem",
    //         'Blanc',
    //         2010,
    //         '20-05-2022',
    //         400,
    //         750,
    //         12,
    //         10,
    //         '2020-2035',
    //         'Un grand vin moelleux.',
    //         'alsace',
    //         2
    //     ),
    //     new Wine(
    //         5,
    //         'Château Lafite Rothschild',
    //         'Pauillac',
    //         'Château Lafite Rothschild',
    //         'Rouge',
    //         2016,
    //         '15-08-2023',
    //         800,
    //         750,
    //         5,
    //         4,
    //         '2028-2040',
    //         'Puissant et élégant.',
    //         'provence',
    //         1
    //     ),
    //     new Wine(
    //         6,
    //         'Château Latour',
    //         'Pauillac',
    //         'Château Latour',
    //         'Rouge',
    //         2014,
    //         '09-10-2023',
    //         650,
    //         750,
    //         8,
    //         8,
    //         '2025-2035',
    //         'Solide et structuré.',
    //         'cote-du-rhone',
    //         0
    //     ),
    //     new Wine(
    //         7,
    //         'Château Mouton Rothschild',
    //         'Pauillac',
    //         'Château Mouton Rothschild',
    //         'Rouge',
    //         2019,
    //         '28-02-2024',
    //         750,
    //         750,
    //         6,
    //         6,
    //         '2030-2040',
    //         'Harmonieux avec une grande finesse.',
    //         'bourgogne',
    //         0
    //     ),
    //     new Wine(
    //         8,
    //         'Domaine Leflaive',
    //         'Puligny-Montrachet',
    //         'Domaine Leflaive',
    //         'Blanc',
    //         2020,
    //         '10-01-2023',
    //         350,
    //         750,
    //         4,
    //         4,
    //         '2025-2030',
    //         'Frais et élégant.',
    //         'bourgogne',
    //         0
    //     ),
    //     new Wine(
    //         9,
    //         'Château Cheval Blanc',
    //         'Saint-Émilion',
    //         'Château Cheval Blanc',
    //         'Rouge',
    //         2018,
    //         '14-07-2023',
    //         950,
    //         750,
    //         7,
    //         5,
    //         '2025-2040',
    //         'Un équilibre remarquable.',
    //         'bordeaux',
    //         2
    //     ),
    //     new Wine(
    //         10,
    //         'Château Haut-Brion',
    //         'Pessac-Léognan',
    //         'Château Haut-Brion',
    //         'Rouge',
    //         2015,
    //         '22-03-2023',
    //         600,
    //         750,
    //         6,
    //         6,
    //         '2025-2035',
    //         'Complexe et raffiné.',
    //         'divers',
    //         0
    //     ),
    // ]);
    const wines = ref<Wine[]>([]);

    // Charger les vins depuis le backend
    async function loadWines() {
        try {
            const loadedWines = await invoke<Wine[]>('load_wines');
            wines.value = loadedWines;
        } catch (error) {
            console.error('Erreur lors du chargement des vins:', error);
        }
    }

    function getAllWineTypes(): string[] {
        const wineTypes = [
            'Alsace',
            'Bordeaux',
            'Bourgogne',
            'Champagne',
            'Côte du Rhône',
            'Divers',
            'Etranger',
            'Loire',
            'Pétillant',
            'Provence',
            'Sud-Ouest',
            'Savoie',
        ];
        return wineTypes;
    }

    function getWineTypeMap(): Map<string, string> {
        const wineTypeMap = new Map<string, string>();
        wineTypeMap.set('Alsace', 'alsace');
        wineTypeMap.set('Bordeaux', 'bordeaux');
        wineTypeMap.set('Bourgogne', 'bourgogne');
        wineTypeMap.set('Champagne', 'champagne');
        wineTypeMap.set('Côte du Rhône', 'cote-du-rhone');
        wineTypeMap.set('Corse', 'corse');
        wineTypeMap.set('Divers', 'divers');
        wineTypeMap.set('Etranger', 'etranger');
        wineTypeMap.set('Loire', 'loire');
        wineTypeMap.set('Pétillant', 'petillant');
        wineTypeMap.set('Provence', 'provence');
        wineTypeMap.set('Sud-Ouest', 'sud-ouest');
        wineTypeMap.set('Savoie', 'savoie');
        return wineTypeMap;
    }

    async function addNewWine(newWine: Wine) {
        try {
            newWine.id = generateId(); // Assigne un nouvel ID unique
            newWine.quantityLeft = newWine.quantityBought; // Initialise la quantité restante

            const addedWine = await invoke<Wine>('add_wine', { wine: newWine });

            // Mettre à jour directement le store
            wines.value.push(addedWine);
        } catch (error) {
            console.error("Erreur lors de l'ajout du vin:", error);
        }
    }

    async function updateWine(updatedWine: Wine) {
        try {
            await invoke('update_wine', { wine: updatedWine });
            await loadWines();
        } catch (error) {
            console.error('Erreur lors de la mise à jour du vin:', error);
        }
    }

    async function deleteWine(wineId: number) {
        try {
            await invoke('delete_wine', { id: wineId });
            await loadWines(); // Recharger la liste des vins
        } catch (error) {
            console.error('Erreur lors de la suppression du vin:', error);
        }
    }

    function generateId(): number {
        if (wines.value.length === 0) {
            return 1; // Si aucun vin n'est présent, commence à 1
        }

        // Trouve le plus grand ID existant
        const maxId = Math.max(...wines.value.map((wine) => wine.id));
        return maxId + 1; // Retourne l'ID suivant
    }

    return {
        wines,
        addNewWine,
        updateWine,
        deleteWine,
        getAllWineTypes,
        getWineTypeMap,
        loadWines,
    };
});
