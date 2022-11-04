import {FC} from 'react' 
import ReactSelect from 'react-select';
import reactSelect, {OnChangeValue} from 'react-select'
import makeAnimated from 'react-select/animated'
import { IOption, ISelect } from './select.interface'
import formStyles from '../../ui/form-elements/form.module.scss'
import styles from './Select.module.scss';
const animatedComponents = makeAnimated()


const Select: FC<ISelect> = ({
	placeholder,
	error,
	isLoading,
	isMulti,
	options,
	field,


}) => {

	const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
		field.onChange(isMulti ? (newValue as IOption[]).map(item=> item.value) : (newValue as IOption).value)
	}

	const getValues = () => {
		if(field.value){
			return isMulti? options.filter(option => field.value.indexOf(option.value) >=0) : options.find(option=> option.value == field.value)
		}
		else {
			return isMulti? [] : ''
		}
	}

	return <div className={styles.selectContainer}>
		<label>
			<span>{placeholder}</span>
			<ReactSelect
				classNamePrefix='custom-select'
				options={options}
				value={getValues()}
				isMulti={isMulti}
				onChange={onChange}
				components={animatedComponents}
				isLoading={isLoading}
			
			/>
		</label>
		{error && <div className={formStyles.error}>{error.message}</div>}

	</div>
}

export default Select