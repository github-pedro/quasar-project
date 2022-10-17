import { boot } from 'quasar/wrappers'
import rules from 'app/src/utils/rules';

export default boot(({ app }) => {
  app.config.globalProperties.$rules = rules
})
