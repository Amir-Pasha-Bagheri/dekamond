import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const { push } = useRouter();
    const isAuthenticated = window.localStorage.getItem('user');

    useEffect(() => {
      if (!isAuthenticated) {
        push('/sign-up');
      }
    }, [isAuthenticated, push]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
