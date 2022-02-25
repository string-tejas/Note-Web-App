import React, { useState, useEffect } from 'react'
import { NavBar, Note, SearchBar, AddButton } from './components/components'
import './App.css'
import { nanoid } from 'nanoid'
import convertDate from './components/misc/toIndianDateString'

function App() {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([])
    document.title = 'Note App'
    useEffect(() => {
        let storedNotes = localStorage.getItem('tj-note')
        if (storedNotes) {
            storedNotes = JSON.parse(storedNotes)
            setNotes(storedNotes)
        }
        setLoading(false)
    }, [])
    useEffect(() => {
        if (notes.length === 0) {
            localStorage.removeItem('tj-note')
        } else {
            localStorage.setItem('tj-note', JSON.stringify(notes))
        }
    }, [notes])

    const createNote = (title, note) => {
        const newNote = {
            id: nanoid(),
            title: title,
            note: note,
            hide: false,
            date: convertDate(new Date().toLocaleDateString()),
        }
        const notesList = [...notes, newNote]
        setNotes(notesList)
    }
    const searchNote = query => {
        let queryResult = notes.map(note => {
            let result =
                note.title.toLowerCase().includes(query) ||
                note.note.toLowerCase().includes(query)
            if (result) note.hide = false
            else note.hide = true
            return note
        })
        setNotes(queryResult)
    }
    const showAll = () => {
        let noteList = notes.map(note => {
            note.hide = false
            return note
        })
        setNotes(noteList)
    }
    const updateNote = (id, updatedNote) => {
        let noteList = notes.filter(note => note.id !== id)
        noteList = [...noteList, updatedNote]
        setNotes(noteList)
    }
    const deleteNote = id => {
        const noteList = notes.filter(note => note.id !== id)
        setNotes(noteList)
    }
    return (
        <div className='container'>
            <NavBar>
                <h1 className='navbar-title'>Notes</h1>
                <SearchBar search={searchNote} showAll={showAll} />
                <AddButton createNote={createNote} />
            </NavBar>
            <div className='body-container'>
                {loading ? (
                    <div className='message-mid'>Loading...</div>
                ) : notes.length === 0 ? (
                    <div className='message-mid'>No Notes Found :(</div>
                ) : (
                    notes.map(note => (
                        <Note
                            id={note.id}
                            key={note.id}
                            title={note.title}
                            note={note.note}
                            date={note.date}
                            hide={note.hide}
                            remove={deleteNote}
                            update={updateNote}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default App
