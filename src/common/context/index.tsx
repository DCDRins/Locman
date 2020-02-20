
import { combineProviders } from 'react-combine-providers'

// import UserProvider from './user/user.provider'
import LangProvider from './lang/lang.provider'

const providers = combineProviders();
providers.push(LangProvider)

export default providers.master()
