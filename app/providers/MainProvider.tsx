import Layout from '@/components/layout/Layout'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import { store } from '@/store/store'
import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import AuthProvider from './AuthProvider/AuthProvider'
import HeadProvider from './HeadProvider/HeadProvider'
import ReduxToast from './ReduxToast'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export interface MainProviderProps{
	children: ReactNode
}

const MainProvider: FC <TypeComponentAuthFields> = ({children, Component}) => {
	return(
		<HeadProvider>
		<Provider store={store}>
		<QueryClientProvider client={queryClient}> 
			<ReduxToast/>
			<AuthProvider Component={Component} />
			<Layout>{children}</Layout>
		</QueryClientProvider>
		</Provider>
		</HeadProvider>
	)
}
export default MainProvider

// QueryClientProvider - для подключения БД