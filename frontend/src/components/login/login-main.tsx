import { FC, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../types/app-routes.enum';
import { useLoginForm } from '../../hooks/use-login-form';

const LoginMain: FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const formRef = useRef(null);
  useLoginForm(formRef, form, setIsDisabled, setErrors);

  return (
    <main className='page-content'>
      <div className='container'>
        <section className='login'>
          <h1 className='login__title'>Войти</h1>
          <p className='login__text'>
            Hовый пользователь?{' '}
            <Link className='login__link' to={AppRoutes.Register}>
              Зарегистрируйтесь
            </Link>{' '}
            прямо сейчас
          </p>
          <form method='post' action='/' ref={formRef}>
            <div className='input-login'>
              <label htmlFor='email'>Введите e-mail</label>
              <input
                type='email'
                id='email'
                name='email'
                autoComplete='off'
                required
                value={form.email}
                onChange={(evt) => {
                  setForm({ ...form, email: evt.target.value });
                }}
              ></input>
              <p className='input-login__error'>{errors.email}</p>
            </div>
            <div className='input-login'>
              <label htmlFor='passwordLogin'>Введите пароль</label>
              <span>
                <input
                  type={isPasswordVisible ? 'password' : 'text'}
                  placeholder='• • • • • • • • • • • •'
                  id='passwordLogin'
                  name='password'
                  autoComplete='off'
                  required
                  value={form.password}
                  onChange={(evt) => {
                    setForm({ ...form, password: evt.target.value });
                  }}
                ></input>
                <button className='input-login__button-eye' type='button'>
                  <svg
                    width='14'
                    height='8'
                    aria-hidden='true'
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <use xlinkHref='#icon-eye'></use>
                  </svg>
                </button>
              </span>
              <p className='input-login__error'>{errors.password}</p>
            </div>
            <button
              className='button login__button button--medium'
              type='submit'
              disabled={isDisabled}
            >
              Войти
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LoginMain;
