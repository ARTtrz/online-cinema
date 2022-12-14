import {Head, Html, Main, NextScript} from 'next/document'

export default function Document(){
	return (
		<Html lang='eng'>
			<Head>

				<link
					href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&display=swap"
					rel ="stylesheet"
				/>
			</Head>
			<body>
				<Main/>
				<NextScript/>
				
			</body>
		</Html>
	)
}