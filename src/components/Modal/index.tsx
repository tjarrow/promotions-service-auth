import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import appState from "../../state/state";
import './styles.css';

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

export const LoginModal = () => {

    const [modalIsOpen, setIsOpen] = useState(true);

    function closeModal() {
        appState.isLoginErrorShown = false;
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <button onClick={closeModal} className="modal-close" ><span
                    aria-hidden="true">×</span>
                </button>

                <p>Usuário ou senha incorretos, por favor tente novamente</p>
            </Modal>
        </div>
    );
}
