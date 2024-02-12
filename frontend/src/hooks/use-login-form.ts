import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import { LoginError } from '../components/login/login.error.const';
import store from '../store';
import { loginAction } from '../store/api-actions/user-action';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types/app-routes.enum';

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const useLoginForm = (
  ref: MutableRefObject<HTMLFormElement | null>,
  form: {
    email: string;
    password: string;
  },
  setIsDisabled: Dispatch<SetStateAction<boolean>>,
  setErrors: Dispatch<SetStateAction<{ email: string; password: string }>>
) => {
  const nav = useNavigate();
  useEffect(() => {
    const copyRef = ref.current;
    if (!ref.current) {
      return;
    }

    const handleFormSubmit = (evt: SubmitEvent) => {
      evt.preventDefault();

      if (form.email && !emailRegex.test(form.email)) {
        setErrors((prev) => ({
          password: prev.password,
          email: LoginError.InvalidEmail,
        }));
        return;
      } else if (!form.email) {
        setErrors((prev) => ({
          password: prev.password,
          email: LoginError.Empty,
        }));
        return;
      } else {
        setErrors((prev) => ({
          password: prev.password,
          email: '',
        }));
      }

      if (!form.password) {
        setErrors((prev) => ({
          email: prev.email,
          password: LoginError.Empty,
        }));
        return;
      } else if (form.password.length < 6) {
        setErrors((prev) => ({
          email: prev.email,
          password: LoginError.MinLenPassword,
        }));
        return;
      } else if (form.password.length > 12) {
        setErrors((prev) => ({
          email: prev.email,
          password: LoginError.MaxLenPassword,
        }));
        return;
      } else {
        setErrors((prev) => ({
          email: prev.email,
          password: '',
        }));
      }

      setIsDisabled(true);
      store
        .dispatch(loginAction(form))
        .then((data) => {
          if (data.meta.requestStatus === 'rejected') {
            setErrors({
              email: LoginError.InvalidLogin,
              password: LoginError.InvalidLogin,
            });
          } else {
            nav(AppRoutes.List);
          }
        })
        .finally(() => {
          setIsDisabled(false);
        });
    };

    copyRef?.addEventListener('submit', handleFormSubmit);

    return () => {
      copyRef?.removeEventListener('submit', handleFormSubmit);
    };
  }, [ref, form, setIsDisabled, setErrors, nav]);
};
