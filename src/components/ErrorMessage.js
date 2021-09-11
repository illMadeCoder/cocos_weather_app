import Modal from 'react-modal'
import React from 'react';  

Modal.setAppElement('#root')

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({errorMessage}) {
 return <Modal isOpen={errorMessage}>
                 <h2>{errorMessage}</h2>
        </Modal>
}