import Vue from 'vue';
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'en',
    messages: {
        'de': require('./language/DE'),
        'en': require('./language/EN'),
        'es': require('./language/ES'),
        'fr': require('./language/FR'),
        'hu': require('./language/HU'),
        'id': require('./language/ID'),
        'pt-BR': require('./language/PT-BR'),
        'tr': require('./language/TR'),
        'zh-CN': require('./language/CN'),
        'zh-HK': require('./language/HK'),
        'ja': require('./language/JP'),
    }
})
export default i18n;
