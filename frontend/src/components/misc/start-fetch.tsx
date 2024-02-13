import { FC, useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { useAppDispatch } from '../../hooks/use-store';
import { checkAuthAction } from '../../store/api-actions/user-action';

const StartFetch: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return <div>{children}</div>;
};

export default StartFetch;
