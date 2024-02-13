import { FC, PropsWithChildren } from 'react';
import { getAuthStatus } from '../../store/slices/user.selectors';
import { useAppSelector } from '../../hooks/use-store';
import { AuthStatus } from '../../types/auth-status.enum';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../types/app-routes.enum';

const PrivateRoute: FC<PropsWithChildren<{ isAuthNeeded?: boolean }>> = ({
  children,
  isAuthNeeded = false,
}) => {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.Unknown) {
    return null;
  }

  if (isAuthNeeded) {
    return authStatus === AuthStatus.Auth ? (
      children
    ) : (
      <Navigate to={AppRoutes.Login} />
    );
  }

  return children;
};

export default PrivateRoute;
