import Button from '@/components/ui/form-elements/Button';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import Meta from '@/utils/meta/Meta';
import {FC} from 'react' 
import { useForm } from 'react-hook-form';
import AuthFields from '../auth/AuthFields';
import { IProfileInput } from './profile.interface';
import styles from './Profile.module.scss';
import { useProfile } from './useProfile';

const Profile: FC = () => {

	const {handleSubmit, formState, register, setValue} = useForm<IProfileInput>({
		mode: 'onChange',
		defaultValues: {
			email: ''
		}
	})

	const {isLoading, onSubmit} = useProfile(setValue)
   	return <Meta title="Profile">
			<Heading title="Profile" className={styles.form}/>

			<form onSubmit={handleSubmit(onSubmit)}>
				
				{isLoading ? <SkeletonLoader count={2}/> : (

				<AuthFields formState={formState} register={register} />
				)}

				<div className={styles.buttons}>

					<Button>
							Update
					</Button>
				</div>
				
			</form>

	</Meta>
}

export default Profile