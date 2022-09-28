import { useEffect } from 'react'
import Swal from 'sweetalert2'
import useAuthStore from '../../hooks/useAuthStore'
import { useForm } from '../../hooks/useForm'
import './LoginPage.css'


const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',

}

const LoginPage = () => {

  const {loginEmail, loginPassword, onInputChange: onInputLoginChange} = useForm(loginFormFields)

  const {registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange} = useForm(registerFormFields);

  const {startLogin, startRegister, errorMessage} = useAuthStore()

  const registerSubmit = (e) => {
    e.preventDefault();

    if(registerPassword !== registerPassword2)[
      Swal.fire('Error en el registro', 'Las contraseñas no son iguales', 'error')
    ]
    startRegister({name: registerName, email:registerEmail, password:registerPassword, password2:registerPassword2});
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin({email: loginEmail,password: loginPassword});
  }

  useEffect(() => {
    if (errorMessage !== undefined)[
      Swal.fire('Error en la authenticación', errorMessage, 'error' )
    ]
  }, [errorMessage])
  

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                onChange={onInputLoginChange}
                
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                onChange={onInputLoginChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                onChange={onRegisterInputChange}

              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='registerPassword'
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name='registerPassword2'
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage