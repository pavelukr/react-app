import React from 'react';
import Modal from 'react-modal';
import styled from "styled-components";

const modalStyles = {
    overlay: {zIndex: 1007, background: 'rgba(0, 0, 0, 0.4)'},
    content: {
        fontFamily: 'Poppins',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '568px',
        borderRadius: '10px',
        padding: '24px 32px',
        maxHeight: '85vh',
        overflow: 'auto',
        width: '90%',
        color: '#495F67',
        letterSpacing: '1px',
    }
}

const Field = styled.div`
  border-radius: 4px;
  
  input {
    min-height: 50px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    margin: 0 0 12px 0;
    padding: 12px;
    width: 96%;
  }
  
  textarea {
    width: 100%;
    min-height: 80px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    margin: 12px 0;
    padding: 12px;
  }
`

const NewMovieModal = ({ modalFlag, toggleModal, handleChange, handleSubmit, movie }) => {
    if (!modalFlag) return null;
    return (
        <Modal
            isOpen={modalFlag}
            appElement={document.getElementById('body')}
            ariaHideApp={false}
            style={modalStyles}
        >
            <div className="float-container">
               <div className="float-child-left"> <h3 className="font-bold text-2xl text-gray-800">Add new Movie</h3></div>
                <div className="float-child-right">
                    <button
                        className="btn btn-secondary"
                        onClick={() => toggleModal()}
                    >
                        Close
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <Field>
                    <input onChange={handleChange} value={movie.title} type="text" name="title" placeholder="Movie Title"/>
                </Field>
                <Field>
                    <input onChange={handleChange} value={movie.poster_url} type="text" name="poster_url" placeholder="Poster URL"/>
                </Field>
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Add Movie
                </button>
            </div>
        </Modal>
    );
};

export default NewMovieModal;
