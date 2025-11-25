<template>
    <div class="action-log-container">
        <h2 class="log-title">Journal des actions</h2>
        <ul class="log-list">
            <li
                v-for="log in actionLogStore.logs"
                :key="log.timestamp + log.message"
                class="log-item"
            >
                <span class="log-timestamp">[{{ log.timestamp }}]</span>
                <span class="log-type">{{ formatType(log.type) }}</span>
                <span class="log-message">{{ log.message }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { useActionLogStore } from '../stores/useActionLogStore';

    const actionLogStore = useActionLogStore();

    function formatType(type: string): string {
        switch (type) {
            case 'add':
                return '✅ Ajout';
            case 'edit':
                return '📝 Modification';
            case 'consume':
                return '🍷 Consommation';
            case 'delete':
                return '❌ Suppression';
            default:
                return 'ℹ️';
        }
    }
</script>

<style scoped>
    .action-log-container {
        background-color: #f9f3e6;
        padding: 20px;
        border: 1px solid #8b0000;
        border-radius: 8px;
        max-height: 400px;
        overflow-y: auto;
    }

    .log-title {
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: #8b0000;
    }

    .log-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .log-item {
        margin-bottom: 10px;
        font-family: 'Courier New', monospace;
    }

    .log-timestamp {
        color: #888;
        margin-right: 8px;
    }

    .log-type {
        font-weight: bold;
        margin-right: 5px;
    }

    .log-message {
        white-space: pre-line;
    }

    .clear-button {
        margin-top: 10px;
        background-color: #8b0000;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
    }

    .clear-button:hover {
        background-color: #a40000;
    }
</style>
