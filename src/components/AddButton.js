import React, { useState, useRef } from 'react'
import { FiPlus } from 'react-icons/fi'
import Modal from './Modal'

const AddButton = ({ createNote }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className='add-button' onClick={() => setIsOpen(true)}>
                <FiPlus /> <span>Create</span>
            </div>
            <Modal
                open={isOpen}
                title={'Add note'}
                onClose={() => setIsOpen(false)}
            >
                <AddForm
                    closeForm={() => setIsOpen(false)}
                    createNote={createNote}
                />
            </Modal>
        </>
    )
}

const AddForm = ({ createNote, closeForm }) => {
    const titleRef = useRef(null)
    const noteRef = useRef(null)

    const handleSubmit = e => {
        e.preventDefault()
        createNote(titleRef.current.value, noteRef.current.value)
        closeForm()
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div
                    className='note-container'
                    style={{
                        height: '20rem',
                        position: 'relative',
                        borderRadius: '0',
                    }}
                >
                    <input
                        type='text'
                        className='note-title input-text'
                        required
                        placeholder='Title'
                        ref={titleRef}
                    />
                    <textarea
                        cols='50'
                        rows='10'
                        required
                        ref={noteRef}
                        placeholder='Note'
                        className='note-body input-text input-area'
                    ></textarea>
                    <input type='submit' value='Create' />
                </div>
            </form>
        </>
    )
}

export default AddButton
