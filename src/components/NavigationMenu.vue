<template>
    <nav>
        <ul class="menu">
            <!-- Lien vers la page d'accueil -->
            <li>
                <router-link to="/" :class="{ active: $route.path === '/' }">
                    Accueil
                </router-link>
            </li>

            <!-- Menu déroulant pour les régions -->
            <li class="dropdown" :class="{ active: isRegionalActive }">
                <a href="#" class="dropdown-trigger">Vins par régions</a>
                <ul>
                    <li
                        v-for="[displayName, routeName] in regionalWineTypeMap"
                        :key="routeName"
                    >
                        <router-link
                            :to="'/type/' + routeName"
                            :class="{
                                active: $route.path === '/type/' + routeName,
                            }"
                        >
                            {{ displayName }}
                        </router-link>
                    </li>
                </ul>
            </li>

            <!-- Menu déroulant pour les autres types -->
            <li class="dropdown" :class="{ active: isOtherActive }">
                <a href="#" class="dropdown-trigger">Autres vins</a>
                <ul>
                    <li
                        v-for="[displayName, routeName] in otherWineTypeMap"
                        :key="routeName"
                    >
                        <router-link
                            :to="'/type/' + routeName"
                            :class="{
                                active: $route.path === '/type/' + routeName,
                            }"
                        >
                            {{ displayName }}
                        </router-link>
                    </li>
                </ul>
            </li>

            <!-- Lien vers l'historique -->
            <li>
                <router-link
                    to="/history"
                    :class="{ active: $route.path === '/history' }"
                >
                    Historique
                </router-link>
            </li>

            <!-- Engrenage avec menu déroulant -->
            <li class="settings">
                <!-- Icône d'engrenage -->
                <div class="settings-icon">
                    <img src="@/assets/images/cog.svg" alt="Paramètres" />
                </div>

                <!-- Menu déroulant -->
                <ul>
                    <li>
                        <a href="#" @click.prevent="handleImport">Import</a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="handleExport">Export</a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    import { useWineStore } from '../stores/wineStore';
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { invoke } from '@tauri-apps/api/core';
    import { open, save } from '@tauri-apps/plugin-dialog';
    import { readTextFile } from '@tauri-apps/plugin-fs';

    const wineStore = useWineStore();
    const wineTypeMap = computed(() =>
        Array.from(wineStore.getWineTypeMap().entries())
    );
    const route = useRoute();

    // Filtrer les régions
    const regionalWineTypeMap = computed(() =>
        wineTypeMap.value.filter(
            ([displayName]) =>
                !['Champagne', 'Pétillant', 'Divers', 'Etranger'].includes(
                    displayName
                )
        )
    );

    // Filtrer les autres types
    const otherWineTypeMap = computed(() =>
        wineTypeMap.value.filter(([displayName]) =>
            ['Champagne', 'Pétillant', 'Divers', 'Etranger'].includes(
                displayName
            )
        )
    );

    // Vérifier si une route enfant est active pour les régions
    const isRegionalActive = computed(() =>
        regionalWineTypeMap.value.some(
            ([, routeName]) => route.path === '/type/' + routeName
        )
    );

    // Vérifier si une route enfant est active pour les autres types
    const isOtherActive = computed(() =>
        otherWineTypeMap.value.some(
            ([, routeName]) => route.path === '/type/' + routeName
        )
    );

    async function handleExport() {
        console.log('Exporting wines...');
        try {
            // Ouvre la boîte de dialogue pour sélectionner l'emplacement du fichier
            const filePath = await save({
                title: 'Enregistrer les vins',
                defaultPath: 'wines.json',
                filters: [
                    {
                        name: 'JSON',
                        extensions: ['json'],
                    },
                ],
            });

            if (filePath) {
                console.log('Chemin du fichier sélectionné :', filePath);

                // Appelle la commande Rust pour exporter les données des vins
                await invoke('export_wines', { filePath });
                console.log('Vins exportés avec succès !');
            } else {
                console.log('Aucun fichier sélectionné.');
            }
        } catch (error) {
            console.error("Erreur lors de l'exportation des vins :", error);
        }
    }

    async function handleImport() {
        try {
            const filePath = await open({
                title: 'Importer des vins',
                filters: [{ name: 'JSON', extensions: ['json'] }],
            });

            if (!filePath) {
                console.log('Aucun fichier sélectionné.');
                return;
            }

            const fileContent = await readTextFile(filePath);
            console.log('Contenu brut du fichier JSON :', fileContent);

            const response = JSON.parse(fileContent);
            console.log('Données parsées :', response);

            if (!Array.isArray(response)) {
                throw new Error(
                    'Le fichier importé ne contient pas un tableau valide.'
                );
            }

            await invoke('save_wines', { wines: response });
            console.log('Données importées et sauvegardées.');

            // Recharger les données dans le store
            await wineStore.loadWines();
            alert('Importation réussie.');
        } catch (error) {
            console.error("Erreur lors de l'importation des vins :", error);
            alert("Échec de l'importation. Vérifiez le fichier.");
        }
    }
</script>
<style scoped>
    /* Navigation bar */
    nav ul.menu {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #2c2c2c;
        padding: 10px 20px;
        border-bottom: 2px solid #ddd;
    }

    nav ul.menu li {
        margin: 0 10px;
        position: relative;
    }

    nav ul.menu li a {
        text-decoration: none;
        color: #ddd;
        font-size: 16px;
        font-weight: bold;
        padding: 5px 10px;
        border-radius: 5px;
        transition: all 0.3s ease;
    }

    nav ul.menu li a:hover {
        background-color: #444;
        color: white;
    }

    nav ul.menu li a.active,
    nav ul.menu li.active > a.dropdown-trigger {
        background-color: #8b0000;
        color: white;
        pointer-events: none;
    }

    /* Dropdown styles */
    .menu > li.dropdown {
        position: relative;
    }

    .menu > li.dropdown .dropdown-trigger {
        cursor: pointer;
    }

    .menu > li.dropdown:hover ul {
        display: block;
    }

    .menu > li.dropdown ul {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #2c2c2c;
        border: 1px solid #444;
        border-radius: 5px;
        padding: 10px;
        list-style: none;
        margin: 0;
        z-index: 10;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .menu > li.dropdown ul li {
        margin: 5px 0;
    }

    .menu > li.dropdown ul li a {
        display: block;
        color: #ddd;
        padding: 5px;
        border-radius: 3px;
        text-decoration: none;
        font-size: 14px;
        transition: background-color 0.3s ease;
    }

    .menu > li.dropdown ul li a:hover {
        background-color: #444;
        color: white;
    }

    /* Engrenage */
    .menu .settings {
        position: relative;
        margin-left: auto; /* Place l'engrenage à droite */
    }

    .settings-icon img {
        width: 30px;
        height: 30px;
        cursor: pointer;
        filter: invert(1) brightness(2); /* Rend l'icône blanche */
        transition:
            transform 0.3s ease,
            filter 0.3s ease;
    }

    .settings-icon img:hover {
        transform: rotate(15deg); /* Rotation au survol */
        filter: invert(1) brightness(3); /* Accentue la luminosité au survol */
    }

    .menu .settings ul {
        display: none;
        position: absolute;
        top: 30px;
        right: 0;
        background-color: #2c2c2c;
        border: 1px solid #444;
        border-radius: 5px;
        padding: 10px;
        list-style: none;
        margin: 0;
        z-index: 10;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        min-width: 150px;
    }

    .menu .settings:hover ul {
        display: block;
    }

    .menu .settings ul li {
        margin: 5px 0;
    }

    .menu .settings ul li a {
        display: block;
        color: #ddd;
        padding: 8px 10px;
        border-radius: 3px;
        text-decoration: none;
        font-size: 14px;
        transition: background-color 0.3s ease;
    }

    .menu .settings ul li a:hover {
        background-color: #444;
        color: white;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        nav ul.menu {
            flex-wrap: wrap;
            justify-content: center;
        }

        nav ul.menu li {
            margin: 5px 0;
        }

        nav ul.menu li a {
            font-size: 14px;
        }
    }
</style>
