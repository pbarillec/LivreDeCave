import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ActionLog {
    timestamp: string;
    type: 'add' | 'edit' | 'consume' | 'delete';
    message: string;
}

export const useActionLogStore = defineStore('actionLog', () => {
    const logs = ref<ActionLog[]>([]);

    function addLog(type: ActionLog['type'], message: string) {
        const now = new Date().toLocaleString();
        logs.value.unshift({ timestamp: now, type, message });
    }

    function clearLogs() {
        logs.value = [];
    }

    return {
        logs,
        addLog,
        clearLogs,
    };
});
