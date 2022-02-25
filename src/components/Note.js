import React, { useState, useRef } from 'react'
import { FiEdit, FiTrash, FiCheck } from 'react-icons/fi'
import { MdClear } from 'react-icons/md'
import convertDate from './misc/toIndianDateString'
import standardDate from './misc/toStandardDateString'
import toIndian from './misc/standardToIndia'
import Modal from './Modal'
/**
 * Note Component
 * @param  {string} id id of the note
 * @param  {function} remove function to remove note
 * @param  {function} update function to update note
 * @param  {string} title title of note
 * @param  {string} note body of note
 * @param  {string} date date of note in dd/mm/yyyy format
 * @param  {boolean} hide hide the note ?
 */
const Note = ({
    id,
    remove,
    update,
    hide = false,
    title = 'Title here...',
    note = 'Note here...',
    date = convertDate(new Date().toLocaleDateString()),
}) => {
    const [edit, setEdit] = useState(false)

    return (
        <>
            <div className={`note-container ${hide ? 'hide' : ''}`}>
                {edit ? (
                    <EditNote
                        update={update}
                        cancel={() => setEdit(false)}
                        title={title}
                        note={note}
                        date={date}
                        id={id}
                    />
                ) : (
                    <ViewNote
                        id={id}
                        title={title}
                        note={note}
                        date={date}
                        edit={() => setEdit(true)}
                        remove={remove}
                    />
                )}
            </div>
        </>
    )
}

const ViewNote = ({ id, title, note, date, edit, remove }) => {
    const [delBox, setDelBox] = useState(false)
    const handleDeleteClick = () => {
        setDelBox(true)
    }
    return (
        <>
            <div className='note-title'>{title}</div>
            <div className='note-body'>
                <pre style={{ whiteSpace: 'break-spaces' }}>{note}</pre>
            </div>
            <div className='note-footer'>
                <span>{date}</span>
                <div className='note-action'>
                    <button onClick={edit}>
                        <FiEdit />
                    </button>
                    <button onClick={handleDeleteClick}>
                        <FiTrash />
                    </button>
                    <Modal
                        open={delBox}
                        onClose={() => setDelBox(false)}
                        title='Are you sure ?'
                        noStretch={true}
                    >
                        <div
                            style={{ padding: '1rem', marginBottom: '0.5rem' }}
                        >
                            This Note would be lost forever !
                        </div>
                        <div
                            className='note-action'
                            style={{ alignSelf: 'flex-end' }}
                        >
                            <button onClick={() => remove(id)}>
                                <FiCheck />
                            </button>
                            <button onClick={() => setDelBox(false)}>
                                <MdClear />
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

const EditNote = ({ id, title, note, date, update, cancel }) => {
    let newDate = standardDate(date)
    const titleRef = useRef(null)
    const noteRef = useRef(null)
    const dateRef = useRef(null)

    const updateNote = () => {
        const newNote = {
            id: id,
            title: titleRef.current.value,
            note: noteRef.current.value,
            date: dateRef.current.value
                ? toIndian(dateRef.current.value)
                : date,
        }
        update(id, newNote)
        cancel()
    }
    return (
        <>
            <div className='note-title' style={{ padding: '0' }}>
                <input
                    type='text'
                    className='note-title input-text'
                    defaultValue={title}
                    ref={titleRef}
                />
            </div>
            <textarea
                cols='50'
                rows='10'
                ref={noteRef}
                className='note-body input-text input-area'
                defaultValue={note}
            ></textarea>
            <div className='note-footer'>
                <input ref={dateRef} type='date' defaultValue={newDate} />
                <div className='note-action'>
                    <button onClick={updateNote}>
                        <FiCheck />
                    </button>
                    <button onClick={cancel}>
                        <MdClear />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Note
