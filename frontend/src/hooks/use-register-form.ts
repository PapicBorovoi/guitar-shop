import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import { LoginError } from '../components/login/login.error.const';
import store from '../store';
import { registerAction } from '../store/api-actions/user-action';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types/app-routes.enum';

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const useRegisterForm = (
  ref: MutableRefObject<HTMLFormElement | null>,
  form: {
    email: string;
    password: string;
    name: string;
  },
  setIsDisabled: Dispatch<SetStateAction<boolean>>,
  setErrors: Dispatch<
    SetStateAction<{ email: string; password: string; name: string }>
  >
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
          name: prev.name,
        }));
        return;
      } else if (!form.email) {
        setErrors((prev) => ({
          password: prev.password,
          email: LoginError.Empty,
          name: prev.name,
        }));
        return;
      } else {
        setErrors((prev) => ({
          password: prev.password,
          email: '',
          name: prev.name,
        }));
      }

      if (!form.password) {
        setErrors((prev) => ({
          email: prev.email,
          password: LoginError.Empty,
          name: prev.name,
        }));
        return;
      } else if (form.password.length < 6) {
        setErrors((prev) => ({
          email: prev.email,
          password: LoginError.MinLenPassword,
          name: prev.name,
        }));
        return;
      } else if (form.password.length > 12) {
        setErrors((prev) => ({
          email: prev.email,
          password: LoginError.MaxLenPassword,
          name: prev.name,
        }));
        return;
      } else {
        setErrors((prev) => ({
          email: prev.email,
          password: '',
          name: prev.name,
        }));
      }

      if (!form.name) {
        setErrors((prev) => ({
          email: prev.email,
          password: prev.password,
          name: LoginError.Empty,
        }));
        return;
      } else if (form.name.length < 1) {
        setErrors((prev) => ({
          email: prev.email,
          password: prev.password,
          name: LoginError.MinLenName,
        }));
        return;
      } else if (form.name.length > 15) {
        setErrors((prev) => ({
          email: prev.email,
          password: prev.password,
          name: LoginError.MaxLenName,
        }));
        return;
      } else {
        setErrors((prev) => ({
          email: prev.email,
          password: prev.password,
          name: '',
        }));
      }

      setIsDisabled(true);
      store
        .dispatch(registerAction(form))
        .then((data) => {
          if (data.meta.requestStatus === 'rejected') {
            setErrors({
              email: LoginError.EmailConflict,
              password: '',
              name: '',
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
