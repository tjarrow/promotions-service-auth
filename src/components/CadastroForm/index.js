import { useState } from "react";
import './style.css';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { goLogout } from "../../actions/auth";
import { registerUser, getAddressData } from "../../actions/register";
import { getAddressInfoByZipCode } from "../../services/register.service";
import { phoneMask, dateMask } from "./utils/inputMasks";

export const CadastroForm = () => {

    const [formState, setFormState] = useState({
        gender: {
            value: '',
            type: ''
        },
        firstName: {
            value: '',
            type: ''
        },
        customerId: {
            value: '',
            type: ''
        },
        mobilePhone: {
            value: '',
            type: ''
        },
        homeEmail: {
            value: '',
            type: ''
        },
        dateOfBirth: {
            value: '',
            type: ''
        },
        homeZip: {
            value: '',
            type: ''
        },
        homeStreet: {
            value: '',
            type: ''
        },
        homeNum: {
            value: '',
            type: ''
        },
        homeDistrict: {
            value: '',
            type: ''
        },
        homeCity: {
            value: '',
            type: ''
        },
        homeState: {
            value: '',
            type: ''
        },
        homeComplement: {
            value: '',
            type: ''
        },
        smsContactFlag: false
    })
    const [genderError, setGenderError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [cpfError, setCpfError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [cepError, setCepError] = useState(false);
    const [isAddressBlockShown, setIsAddressBlockShown] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const onChangeHandler = (e) => {
        
        const value = {
            value: e.target.value,
            type: e.target.type
        }; 
        setFormState({
            ...formState,
            [e.target.name]: value
        })
        if (e.target.name === 'homeZip') {
            let validateZipCode = /^[0-9]{8}$/;
            const zipValue = e.target.value.replace(/\D/g, '');
            if (validateZipCode.test(zipValue)) {
                getAddressInfoByZipCode(zipValue).then(res => {
                    setFormState({
                        ...formState,
                        homeZip: {
                            value: e.target.value,
                            type: 'text'
                        },
                        homeStreet: {
                            value: res.logradouro,
                            type: 'text'
                        },
                        homeDistrict: {
                            value: res.bairro,
                            type: 'text'
                        },
                        
                        homeCity: {
                            value: res.localidade,
                            type: 'text'
                        },
                        homeState: {
                            value: res.uf,
                            type: 'text'
                        } 
                    })
                    setIsAddressBlockShown(true);
                });
            }
        }
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        dispatch(goLogout).then(() => {
            history.push('/');
        })
    }

    const register = (userData) => {
        userData.customerId.value = formState.customerId.value.replace(/[\,\-\.]/g, '');
        dispatch(registerUser(userData));
    }

    const regionCodesList = ['', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT',
                    'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
                    'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF'];

    const [options, ] = useState(regionCodesList);

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
                                    className='mb-4 custom-select w-100 genderSelect'
                                    name="gender"
                                    value={formState.gender.value}
                                    onChange={onChangeHandler}
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
                                        name='firstName'
                                        type="text"
                                        onChange={onChangeHandler}
                                        value={formState.firstName.value}
                                        className='form-control inputTextBox'
                                        onFocus={() => {setNameError(false)}}
                                        onBlur={() => {
                                            if (!formState.firstName.value.length) {
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
                                        type="number"
                                        name='customerId'
                                        value={formState.customerId.value}
                                        placeholder='CPF'
                                        onChange={onChangeHandler}
                                        onFocus={() => {setCpfError(false)}}
                                        onBlur={() => {
                                            if (!formState.customerId.value.length) {
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
                                        type="number"
                                        className="form-control"
                                        name='mobilePhone'
                                        value={phoneMask(formState.mobilePhone.value)}
                                        placeholder='Celular'
                                        onChange={onChangeHandler}
                                        onFocus={() => {setPhoneError(false)}}
                                        onBlur={() => {
                                            if (!formState.mobilePhone.value.length) {
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
                                        name='homeEmail'
                                        className='form-control mt-2'
                                        value={formState.homeEmail.value}
                                        type="mail"
                                        onChange={onChangeHandler}
                                        onFocus={() => {setEmailError(false)}}
                                        onBlur={() => {
                                            if (!formState.homeEmail.value.length) {
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
                                type="number"
                                value={dateMask(formState.dateOfBirth.value)}
                                name='dateOfBirth'
                                onChange={onChangeHandler}
                                onFocus={() => {setBirthDateError(false)}}
                                onBlur={() => {
                                    if (!formState.dateOfBirth.value.length) {
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
                                type="number"
                                name='homeZip'
                                placeholder='CEP'
                                value={formState.homeZip.value}
                                onChange={onChangeHandler}
                                onFocus={() => {setCepError(false)}}
                                onBlur={() => {
                                    if (!formState.homeZip.value.length) {
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
                            {isAddressBlockShown &&
                            <div id="homeStreetPt2">
                                <div className="row">
                                    <div className="col-9">
                                        <input 
                                            type="text" 
                                            name="homeStreet"
                                            onChange={onChangeHandler}
                                            value={formState.homeStreet.value}
                                            className="form-control form-control mt-2 inputTextBox"
                                            id="inputRua" 
                                            placeholder="Endereço" />
                                    </div>
                                    <div className="col-3">
                                        <input 
                                            type="number" 
                                            name="homeNum"
                                            onChange={onChangeHandler}
                                            value={formState.homeNum.value}
                                            className="form-control form-control numeric mt-2 " 
                                            id="inputNum"
                                            placeholder="Nº" 
                                            maxLength="5" /> 
                                    </div>
                                </div>
                                <input 
                                    type="text" 
                                    className="form-control form-control mt-2 inputTextBox" 
                                    id="inputBairro"
                                    name="homeDistrict"
                                    onChange={onChangeHandler}
                                    value={formState.homeDistrict.value}
                                    placeholder="Bairro" />
                                <div className="row">
                                    <div className="col-9">
                                        <input 
                                            type="text" 
                                            onChange={onChangeHandler}
                                            value={formState.homeCity.value}
                                            name="homeCity"
                                            className="form-control form-control mt-2 inputTextBox"
                                            id="inputCidade" 
                                            placeholder="Cidade" /> 
                                    </div>
                                    <div className="col-3 mt-2 custom-select">
                                        <select
                                            onChange={onChangeHandler}
                                            value={formState.homeState.value}
                                            name='homeState'
                                        >
                                            { options.map((element, index) => <option key={index}>{element}</option>) }
                                        </select>
                                    </div>
                                </div>
                                <input 
                                    type="text" 
                                    onChange={onChangeHandler}
                                    value={formState.homeComplement.value}
                                    className="form-control form-control mt-2 " 
                                    attrname="Complemento" 
                                    id="inputComplement"
                                    name="homeComplement" 
                                    placeholder="Complemento"/>
                            </div>}
                        </div>
                    </div>
                    <div className="form-group row pt-2">
                        <div className="col-sm-10 d-flex align-items-center">
                            <input 
                                className='filled-in checkboxDis' 
                                name='smsContactFlag'
                                type="checkbox" 
                                value={formState.smsContactFlag.value}
                                onChange={onChangeHandler}
                                />
                            <label className="ml-3 form-check-label.label-font">
                                Quero receber novidades, ofertas e promoções Save Ganhe por homeEmail ou SMS.
                            </label>
                        </div>
                    </div>
                    <div className="row d-flex p-4">
                        <div className="col-1">
                        </div>
                        <div className='col-12 col-xl-4 col-lg-4 col-md-4 col-sm-12 pb-2 pt-2'>
                            <button onClick={() => register(formState)} className="btn border-dark" type='submit'>Salvar</button>
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
