import { configure } from 'vee-validate';
import { defineRule } from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import fr from '@vee-validate/i18n/dist/locale/fr.json';

// Charger toutes les règles disponibles
Object.entries(rules).forEach(([ruleName, ruleFn]) => {
    defineRule(ruleName, ruleFn as any);
});

// Configurer les options globales
configure({
    generateMessage: localize('fr', fr), // Définit la langue à "français"
    validateOnInput: true, // Valide les champs dès que l'utilisateur tape
});
