import { FC, useState } from "react";
import './style.css';
import 'font-awesome/css/font-awesome.min.css';
import { goLogin } from "../../services/login";
import {LoginModal} from "../Modal";

interface LoginCredentials {
    username: string;
    password: string;
}

export const LoginForm: FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col-12 pb-4">
                        <p className="customFont shadow-lg registrationHeader"
                           id="texto2">
                            Promotores, faça seu login para
                            cadastrar seus clientes</p>
                    </div>
                    <form className='col-10 col-xl-5 col-lg-5 col-md-5 col-sm-10 mt-5'>
                        <input type="text"
                               className="form-control"
                               placeholder='Login'
                               onChange={e => setUserName(e.target.value)}
                        />
                        <div className="form-group mt-4">
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder='Senha'
                                    className="form-control"
                                    onChange={e => setPassword(e.target.value)}
                                    required/>
                                <span className='input-group-text'>
                                    <i className='fa fa-eye'></i>
                                </span>
                            </div>
                        </div>
                        <h6 className='mt-4'>
                            <a className='recoveryPassword' href="parameters.glob_loyaltyProgramUrl}/login?recoveryPassword">Esqueceu sua senha?</a>
                        </h6>
                        <button onClick={(e) => {
                            e.preventDefault();
                            goLogin(username, password)}
                        }  name='btnLogin' className='btnLogin border border-dark btn btn-lg mt-4'>
                            <strong>Entrar</strong>
                        </button>
                    </form>
                </div>
            </div>
            <LoginModal/>
        </>
    );
}
