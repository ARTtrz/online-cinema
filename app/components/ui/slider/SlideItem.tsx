import { useRouter } from 'next/router';
import {FC} from 'react' 
import { ISlide } from './slider.interface'
import Image from 'next/image'
import styles from './Slider.module.scss'


interface ISlideItem{
	slide: ISlide;
	buttonTitle?: string;

}

const SlideItem: FC<ISlideItem> = ({slide, buttonTitle = 'Watch'}) => {
	
	const {push} = useRouter()

  	return <div className={styles.slide}>
		 
		{slide.bigPoster && (<Image 
			layout = "fill"
			className={styles.image}
			src={slide.bigPoster}
			alt={slide.title}
			draggable={false}
			unoptimized
			priority
		/>)}
		
		<div className={styles.content}>
			<div className={styles.heading}>{slide.title}</div>
			<div className={styles.subHeading}>{slide.subTitle}</div>
			<button className={styles.button}  onClick={() => push(slide.link)} >{buttonTitle}</button>
		</div>
		
	</div>	
}

export default SlideItem