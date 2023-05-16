import { ContentManager } from '@vfgroup-oneplatform/foundation'

// eslint-disable-next-line no-restricted-imports
import * as en from '../../CMS/internationalisation_en_GB.json'

ContentManager.setLocale('en')
ContentManager.configureI18nTranslations({
  en
})
