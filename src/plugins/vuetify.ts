import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#74C69D',
        secondary: '#081C15',
        accent: '#52B788',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: colors.grey.lighten4,
        text: {
          base: '#777',
        }
      },
      dark: {
        primary: '#74C69D',
        secondary: '#081C15',
        accent: '#52B788',
      }
    },
  },
});
