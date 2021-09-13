import Modal from "react-modal"
import React, {useState} from "react";

Modal.setAppElement('#root');

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ show, setShow, prevZipCode, handleNewZipCode, handleBadZipCode, isBadZipCode }) {
    const [newZipCode, setNewZipCode] = useState(prevZipCode)
    return <Modal
        id='changeLocationModal'
        isOpen={show}
        onAfterOpen={() => { } }
        onRequestClose={() => { } }
        style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '50%',
                backgroundColor: 'lightcoral'
            }
        }}>
        <h2 style={{
            color: 'white',
            fontFamily: 'Patrick Hand',
            fontSize: '4em',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center'
        }}>
            {isBadZipCode === true ? "Unknown ZipCode - Try Again" : 'Type in a ZipCode!'}
        </h2>
        <form id='changeLocationForm'
            onSubmit={(e) => {
            e.preventDefault()
            handleNewZipCode(newZipCode)
        } }>
            <input autoFocus
                id='newZipCode'
                onChange={(e) => {
                    setNewZipCode(e.target.value)
                }}
                onBlur={(e) => {
                    setShow(false)
                }}
                value={newZipCode}
                style={{
                    fontFamily: 'Patrick Hand',
                    fontSize: '4em',
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center'
                }} />
        </form>
    </Modal>
}