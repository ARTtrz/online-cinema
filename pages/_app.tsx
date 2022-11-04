import type { AppProps } from 'next/app'
import MainProvider from 'providers/MainProvider'
import { useEffect, useState } from 'react'

import '@/assets/styles/globals.scss'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

type TypeAppProps = AppProps & TypeComponentAuthFields

// function MyApp({ Component, pageProps }:TypeAppProps ) {
//   return (
//     <MainProvider Component={Component}>
//       <Component {...pageProps} />
//     </MainProvider>
//   )
// }

// export default MyApp

//       <Component {...pageProps} />  - index.jsx (Home.tsx)

export default function MyApp({ Component, pageProps }: TypeAppProps) {
	const [showChild, setShowChild] = useState(false)
	useEffect(() => {
		setShowChild(true)
	}, [])

	if (!showChild) {
		return null
	}

	if (typeof window === 'undefined') {
		return <></>
	} else {
		return (
			<MainProvider Component={Component}>
				<Component {...pageProps} />
			</MainProvider>
		)
	}
}
