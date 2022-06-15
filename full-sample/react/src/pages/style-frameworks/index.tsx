import clsx from 'clsx';
import { ReactNode } from 'react';
import { Outlet, To, useMatch, useNavigate, useResolvedPath } from 'react-router';
import styles from './index.module.scss';


const CustomNavLink = ({ to, children }: { to: To, children: ReactNode }) => {
  const nav = useNavigate();
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <button onClick={() => nav(to)} className={match && styles.active}>
      {children}
    </button>
  )
}

export function StyleFrameworksPage() {
  return <view className={clsx(styles.host)}>
    <row className={clsx(styles.tabs)}>
      <CustomNavLink to={'./jss'}>JSS</CustomNavLink>
      <CustomNavLink to={'./styled-components'}>Styled Components</CustomNavLink>
      <CustomNavLink to={'./emotion'}>Emotion</CustomNavLink>
      <CustomNavLink to={'./tailwind'}>Tailwind</CustomNavLink>
    </row>

    <Outlet />
  </view>;
}

export default StyleFrameworksPage;
