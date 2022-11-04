import Link from 'next/link'
import {FC} from 'react' 
import { IGalleryItemProps } from './gallery.interface'

import styles from './Gallery.module.scss'

import cn from 'classnames'
import Image from 'next/image'

const GalleryItem: FC<IGalleryItemProps> = ({variant, value}) => {
   return <Link href={value.link}>
	   <a className={cn(styles.item, {
		   [styles.withText]: value.content,
		   [styles.horizontal]: variant == 'horizontal',
		   [styles.vertical]: variant == 'vertical'
	   })}>

	   	<Image alt={value.name} src={value.posterPath} layout="fill" draggable={false} priority/>
	   	{value.content?.title && (
			   <div className={styles.content}>
				   <div className={styles.title}>{value.content.title}</div>
				   {value.content.subTitle && (
					   <div className={styles.subTitle}>{value.content.subTitle}</div>
				   )}
			   </div>
		   )}
	   </a>
   </Link>
}

export default GalleryItem