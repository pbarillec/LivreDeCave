import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Wine } from '../models/Wine';
import { invoke } from '@tauri-apps/api/core';
import { useActionLogStore } from './useActionLogStore';

export const useWineStore = defineStore('wineStore', () => {
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

            // Ajout aux logs
            const actionLogStore = useActionLogStore();
            const vintageInfo =
                addedWine.vintage !== null ? ` (${addedWine.vintage})` : '';

            actionLogStore.addLog('add', `: ${addedWine.name}${vintageInfo}`);
        } catch (error) {
            console.error("Erreur lors de l'ajout du vin:", error);
        }
    }

    async function editWine(updatedWine: Wine) {
        try {
            const originalWine = getWineById(updatedWine.id);
            if (!originalWine) {
                console.warn("Vin introuvable pour l'édition.");
                return;
            }

            await invoke('update_wine', { wine: updatedWine });
            await loadWines();

            const changes: string[] = [];

            const fieldsToCompare: (keyof Wine)[] = [
                'name',
                'appellation',
                'producer',
                'color',
                'vintage',
                'purchaseDate',
                'purchasePrice',
                'bottleSize',
                'quantityBought',
                'quantityDrunk',
                'peak',
                'notes',
                'wineType',
                'infos',
            ];

            for (const field of fieldsToCompare) {
                if (updatedWine[field] !== originalWine[field]) {
                    changes.push(
                        `${field} : "${originalWine[field]}" → "${updatedWine[field]}"`
                    );
                }
            }

            const actionLogStore = useActionLogStore();

            if (changes.length > 0) {
                const vintageInfo =
                    updatedWine.vintage !== null
                        ? ` (${updatedWine.vintage})`
                        : '';

                actionLogStore.addLog(
                    'edit',
                    `: "${updatedWine.name}"${vintageInfo} :\n- ${changes.join('\n- ')}`
                );
            } else {
                actionLogStore.addLog(
                    'edit',
                    `: "${updatedWine.name}" sans modification détectée.`
                );
            }
        } catch (error) {
            console.error('Erreur lors de l’édition du vin :', error);
        }
    }

    async function consumeWine(updatedWine: Wine) {
        try {
            updatedWine.quantityLeft =
                updatedWine.quantityBought - updatedWine.quantityDrunk;
            await invoke('update_wine', { wine: updatedWine });
            await loadWines();

            const actionLogStore = useActionLogStore();
            const vintageInfo =
                updatedWine.vintage !== null ? ` (${updatedWine.vintage})` : '';

            actionLogStore.addLog(
                'consume',
                `: ${updatedWine.quantityDrunk} bouteille(s) de ${updatedWine.name}${vintageInfo}`
            );
        } catch (error) {
            console.error('Erreur lors de la consommation du vin :', error);
        }
    }

    async function deleteWine(wineId: number) {
        try {
            const originalWine = getWineById(wineId);
            if (!originalWine) {
                console.warn('Vin introuvable pour la suppression.');
                return;
            }

            await invoke('delete_wine', { id: wineId });
            await loadWines(); // Recharger la liste des vins

            const actionLogStore = useActionLogStore();
            const vintageInfo =
                originalWine.vintage !== null
                    ? ` (${originalWine.vintage})`
                    : '';

            actionLogStore.addLog(
                'delete',
                ` : ${originalWine.name}${vintageInfo}`
            );
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

    // Nouvelle méthode pour importer les vins
    async function importWines(importedWines: Wine[]) {
        try {
            // Supprime les vins existants et remplace par ceux importés
            wines.value = importedWines;

            // Sauvegarde dans le backend
            await invoke('save_wines', { wines: importedWines });
        } catch (error) {
            console.error("Erreur lors de l'importation des vins:", error);
        }
    }

    // Méthoode pour obtenir un vin par son ID
    function getWineById(id: number): Wine | undefined {
        return wines.value.find((w) => w.id === id);
    }

    return {
        wines,
        addNewWine,
        editWine,
        consumeWine,
        deleteWine,
        getAllWineTypes,
        getWineTypeMap,
        loadWines,
        importWines,
    };
});
