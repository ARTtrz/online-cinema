import {FC} from 'react' 
import styles from './SlideArrow.module.scss';
import cn from 'classnames'
import MaterialIcon from '../../MaterialIcon';

interface ISliderArrow{
	variant: 'left'|'right';
	clickHandler: () => void
}

const SlideArrow: FC<ISliderArrow> = ({variant, clickHandler}) => {
	
	const isLeft = variant == 'left';
	

   	return <button onClick={clickHandler} className={cn(styles.arrow, {
			[styles.left] : isLeft,
			[styles.right] : !isLeft
	   })} aria-label={isLeft ? 'previous slide' : 'next slide'}>
		   <MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight' }/>
	</button>
}

export default SlideArrow