import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import './styles.css';
import { showLoginModal,
        showRegisterModal,
        hideLoginModal,
        hideRegisterModal
        } from '../../actions/modal';
import { useDispatch, useSelector } from "react-redux";
import { clearError } from '../../actions/auth';

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const LoginModal = ({isShown}) => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.modalReducer.loginModal);

    useEffect(() => {
        if (isModalOpen) {
            setIsOpen(true) 
        }
    }, [isModalOpen]);
    

    function closeModal() {
        dispatch({
            type: hideLoginModal
        })
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <button onClick={closeModal} className="modal-close" >
                    <span>×</span>
                </button>

                <p>Usuário ou senha incorretos, por favor tente novamente</p>
            </Modal>
        </div>
    );
}
