import Vue from 'vue';
import VueI18n from 'vue-i18n'
import store from '../store/index'

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'EN',
    messages: {
        'DE': require('./language/DE'),
        'EN': require('./language/EN'),
        'ES': require('./language/ES'),
        'FR': require('./language/FR'),
        'HU': require('./language/HU'),
        'ID': require('./language/ID'),
        'PT-BR': require('./language/PT-BR'),
        'TR': require('./language/TR'),
        'CN': require('./language/CN'),
    }
})
export default i18n;
