
import { combineProviders } from 'react-combine-providers'

import ThemeProvider from './theme/theme.provider'
import UserProvider from './user/user.provider'
import LangProvider from './lang/lang.provider'

const providers = combineProviders();
providers.push(ThemeProvider)
providers.push(LangProvider)

export default providers.master()
