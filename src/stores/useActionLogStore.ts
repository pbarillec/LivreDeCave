import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Wine } from '../models/Wine';
import { remove } from '@tauri-apps/plugin-fs';

interface ActionLog {
    timestamp: string;
    type: 'add' | 'edit' | 'consume' | 'delete';
    message: string;
}

export interface UndoEntry {
    type: 'add' | 'edit' | 'delete' | 'consume';
    before: Wine | null;
    after: Wine | null;
}

export const useActionLogStore = defineStore('actionLog', () => {
    const logs = ref<ActionLog[]>([]);
    const undoStack = ref<UndoEntry[]>([]);

    function addLog(type: ActionLog['type'], message: string) {
        const now = new Date().toLocaleString();
        logs.value.unshift({ timestamp: now, type, message });
    }

    function clearLogs() {
        logs.value = [];
    }

    function pushUndo(entry: UndoEntry) {
        undoStack.value.push(entry);
    }

    function popUndo(): UndoEntry | undefined {
        return undoStack.value.pop();
    }

    function removeLastLog() {
        logs.value.shift(); // shift = supprime le premier élément (unshift à l'ajout)
    }

    return {
        logs,
        undoStack,
        addLog,
        clearLogs,
        pushUndo,
        popUndo,
        removeLastLog,
    };
});
