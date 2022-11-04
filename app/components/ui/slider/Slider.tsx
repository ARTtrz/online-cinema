import {FC} from 'react' 
import { ISlide } from './slider.interface'
import { useSlider } from './useSlider';
import {CSSTransition} from 'react-transition-group'
import styles from './Slider.module.scss';
import SlideArrow from './slide-arrow/SlideArrow';
import SlideItem from './SlideItem';

interface ISlider{
	slides: ISlide[];
	buttonTitle?: string
}

const Slider: FC<ISlider> = ({slides, buttonTitle}) => {

	const {handleClick, index, isNext, isPrev, slideIn } = useSlider(slides.length)


   	return <div className={styles.slider}>

		<CSSTransition in={slideIn}  className='slide-animation' timeout={300} unmountOnExit>

			<SlideItem slide={slides[index]} buttonTitle={buttonTitle}/>

		</CSSTransition>

		{isPrev && (<SlideArrow variant='left' clickHandler={() => handleClick('prev')}/>)}

		{isNext && (<SlideArrow variant='right' clickHandler={() => handleClick('next')}/>)}

	</div>
}

export default Slider