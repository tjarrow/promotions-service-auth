import {ChangeEvent, FC, useEffect, useState} from "react";
import './style.css';
import { useHistory } from "react-router-dom";
import {logout} from "../../services/logout";
import appState from "../../state/state";

export const CadastroForm: FC = () => {
    let history = useHistory();

    useEffect(() => {
        if (!appState.isAuthenticated) {
            history.push("/");
        }
    }, []);

    const [inputValue, setInputValue] = useState('')
    const [genderError, setGenderError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [cpfError, setCpfError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [cepError, setCepError] = useState(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="row cusBanner2 p-4">
            <div className="col-12 p-4">
                <p className='customerHeader customFont shadow-lg'>Cadastre seu cliente</p>
            </div>
            <div className="col-2"></div>
            <div className="col-12">
                <form action="">
                    <div className="form-group row d-flex">
                        <div className="col-sm-8 cusContactCard mt-2 p-4">
                            <div className="mb-2">
                                <p>Qual seu gênero?</p>
                                <select
                                    className='mb-4 custom-select w-100'
                                    name=""
                                    id=""
                                >
                                    <option>Selecione um gênero</option>
                                    <option value='M'>Masculino</option>
                                    <option value='F'>Feminino</option>
                                    <option value='NONE'>Não desejo informar</option>
                                </select>
                                {
                                    genderError &&
                                    <div className="genderError alert alert-warning alerts shadow-sm
                                    mt-1 p-2 errorMsg dontShow">
                                    <span>Por favor, informe seu gênero.</span>
                                </div>
                                }
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input placeholder='Nome'
                                           name='inputName'
                                           type="text"
                                           onChange={onChangeHandler}
                                           value={inputValue}
                                           className='form-control inputTextBox'
                                           onFocus={() => {setNameError(false)}}
                                           onBlur={() => {
                                               if (!inputValue.length) {
                                                   setNameError(true)
                                               }
                                           }}
                                    />
                                    {nameError &&
                                        <div className='nameError alert alert-warning alerts shadow-sm
                                            mt-1 p-2 errorMsg dontShow'>
                                            <span>Por favor, informe seu nome.</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 cusContactCard p-4">
                            <div className="row">
                                <div className="col-6">
                                    <input
                                        className='form-control'
                                        type="tel"
                                        name='cpf'
                                        placeholder='CPF'
                                        onChange={onChangeHandler}
                                        onFocus={() => {setCpfError(false)}}
                                        onBlur={() => {
                                            if (!inputValue.length) {
                                                setCpfError(true)
                                            }
                                        }}
                                    />
                                    {cpfError &&
                                        <div className='cpfError alert alert-warning alerts shadow-sm mt-1 p-2 errorMsg'>
                                        <span className="cpfErrorMsg">Por favor, digite um CPF válido</span>
                                    </div>}
                                </div>
                                <div className="col-6">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name='inputPhone'
                                        placeholder='Celular'
                                        onChange={onChangeHandler}
                                        onFocus={() => {setPhoneError(false)}}
                                        onBlur={() => {
                                            if (!inputValue.length) {
                                                setPhoneError(true)
                                            }
                                        }}
                                    />
                                    {phoneError &&
                                        <div className="phoneError alert alert-warning alerts shadow-sm mt-1 p-2 errorMsg">
                                        <span>Digite seu telefone celular corretamente.</span>
                                    </div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 pt-4">
                                    <input
                                        placeholder='E-mail'
                                        name='inputEmail'
                                        className='form-control mt-2'
                                        type="text"
                                        onChange={onChangeHandler}
                                        onFocus={() => {setEmailError(false)}}
                                        onBlur={() => {
                                            if (!inputValue.length) {
                                                setEmailError(true)
                                            }
                                        }}
                                        />
                                    { emailError &&
                                        <div className="emailError alert alert-warning alerts shadow-sm mt-1 p-2 errorMsg">
                                        <span>Digite seu endereço de e-mail corretamente.</span>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row d-flex">
                        <div className="col-sm-8 cusContactCard p-4">
                            <input
                                placeholder='Data de nascimento'
                                className='form-control inputBirthDate mt-2 col-6'
                                type="tel"
                                name='inputBirthDate'
                                onChange={onChangeHandler}
                                onFocus={() => {setBirthDateError(false)}}
                                onBlur={() => {
                                    if (!inputValue.length) {
                                        setBirthDateError(true)
                                    }
                                }}
                            />
                            {birthDateError &&
                                <div className="BirthDateError alert alert-warning alerts
                                    shadow-sm mt-1 p-2 errorMsg dontShow">
                                <span>Por favor, informe sua data de nascimento.</span>
                            </div>}
                        </div>
                        <div className="col-sm-8 cusContactCard mt-2 p-4">
                            <input
                                className='form-control inputCep cep col-6'
                                type="tel"
                                name='inputCep'
                                placeholder='CEP'
                                onChange={onChangeHandler}
                                onFocus={() => {setCepError(false)}}
                                onBlur={() => {
                                    if (!inputValue.length) {
                                        setCepError(true)
                                    }
                                }}
                            />
                            {cepError &&
                                <div className="cepError alert alert-warning alerts
                            shadow-sm mt-1 p-2 errorMsg dontShow">
                                <span>Por favor, insira seu endereço corretamente.</span>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="form-group row pt-2">
                        <div className="col-sm-10 d-flex align-items-center">
                            <input className='filled-in checkboxDis' type="checkbox" />
                            <label className="ml-3 form-check-label.label-font">
                                Quero receber novidades, ofertas e promoções Save Ganhe por email ou SMS.
                            </label>
                        </div>
                    </div>
                    <div className="row d-flex p-4">
                        <div className="col-1">
                        </div>
                        <div className='col-12 col-xl-4 col-lg-4 col-md-4 col-sm-12 pb-2 pt-2'>
                            <button className="btn border-dark" type='button'>Salvar</button>
                        </div>
                        <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 pb-2 pt-2'>
                            <button className='btn border-dark' type='button'>Cancelar</button>
                        </div>
                        <div className='col-12 col-xl-3 col-lg-3 col-md-3 col-sm-12 pb-2 pt-2'>
                            <button onClick={() => logout()} type='button' className='btn border-dark'>Sair</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
