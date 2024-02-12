import { FC, useRef, useState } from 'react';
import { useRegisterForm } from '../../hooks/use-register-form';

const RegisterMain: FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const formRef = useRef(null);
  useRegisterForm(formRef, form, setIsDisabled, setErrors);

  return (
    <main className='page-content'>
      <div className='container'>
        <section className='login'>
          <h1 className='login__title'>Регистрация</h1>
          <form method='post' action='/' ref={formRef}>
            <div className='input-login'>
              <label htmlFor='name'>Введите имя</label>
              <input
                type='text'
                id='name'
                name='name'
                autoComplete='off'
                required
                value={form.name}
                onChange={(evt) => {
                  setForm({ ...form, name: evt.target.value });
                }}
              />
              <p className='input-login__error'>{errors.name}</p>
            </div>
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
              />
              <p className='input-login__error'>{errors.email}</p>
            </div>
            <div className='input-login'>
              <label htmlFor='password'>Придумайте пароль</label>
              <span>
                <input
                  type={isPasswordVisible ? 'password' : 'text'}
                  placeholder='• • • • • • • • • • • •'
                  id='password'
                  name='password'
                  autoComplete='off'
                  required
                  value={form.password}
                  onChange={(evt) => {
                    setForm({ ...form, password: evt.target.value });
                  }}
                />
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
              Зарегистрироваться
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default RegisterMain;
