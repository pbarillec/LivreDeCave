<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <ActionLog />
            <div class="modal-actions">
                <button class="btn" @click="actionLogStore.clearLogs()">
                    Vider le journal
                </button>
                <button class="btn btn-close" @click="close">Fermer</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ActionLog from './ActionLog.vue';
    import { useActionLogStore } from '../stores/useActionLogStore';

    const actionLogStore = useActionLogStore();
    const emit = defineEmits(['close']);
    const close = () => emit('close');
</script>

<style scoped>
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
    }

    .modal-content {
        background-color: #f9f3e6;
        border: 1px solid #8b0000;
        border-radius: 8px;
        padding: 20px;
        width: 90%;
        max-width: 900px;
        max-height: 80vh;
        overflow-y: auto;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
        gap: 10px;
    }

    .btn {
        background-color: #8b0000;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
    }

    .btn:hover {
        background-color: #a40000;
    }

    .btn-close {
        background-color: transparent;
        color: #8b0000;
        border: 1px solid #8b0000;
    }

    .btn-close:hover {
        background-color: #eee0d0;
    }
</style>
