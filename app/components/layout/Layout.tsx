import styles from './Layout.module.scss';

import { FC } from 'react';
import Navigation from './Navigation/Navigation';
import Sidebar from './Sidebar/Sidebar';
import { LayoutProps } from './Layout.props';



const Layout: FC<LayoutProps> = ({children}) => {
  
  return (
    <div className={styles.layout}>
      <Navigation/>
      <div className={styles.center}>
        {children}
      </div>
      <Sidebar/>
    </div>
  )
  
}
export default Layout

