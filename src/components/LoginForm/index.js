import { useEffect, useState } from "react";
import './style.css';
import 'font-awesome/css/font-awesome.min.css';
import { LoginModal } from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { useHistory } from 'react-router-dom';

export const LoginForm = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const dispatch = useDispatch();
    const submitForm = (e) => {
        e.preventDefault();
        dispatch(login(username, password))
        .then(() => {
            history.push('/cadastro-form');
        }); 
    }

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col-12 pb-4">
                        <p className="customFont shadow-lg registrationHeader">
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
                        <button onClick={(e) => submitForm(e)}  
                            name='btnLogin' 
                            className='btnLogin border border-dark btn btn-lg mt-4'>
                            <strong>Entrar</strong>
                        </button>
                    </form>
                </div>
            </div>
            <LoginModal/>
        </>
    );
}
