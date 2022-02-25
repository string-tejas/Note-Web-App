import React, { useState, useEffect, useRef } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdClear } from 'react-icons/md'

/**
 * @param  {string} placeholder default 'Search...'
 * @param  {string} width width of search bar 'default 20rem'
 * @param  {function} search the search function
 */
const SearchBar = ({
    showAll,
    placeholder = 'Search...',
    width = '20rem',
    search,
}) => {
    const [showClear, setShowClear] = useState(false)
    const [query, setQuery] = useState('')
    const input = useRef(null)

    useEffect(() => {
        if (query === '') {
            setShowClear(false)
            showAll()
        } else {
            setShowClear(true)
            search(query.toLowerCase())
        }
    }, [query])

    const clearInput = () => {
        setQuery('')
        input.current.value = ''
    }

    const searchClick = () => {
        search(input.current.value)
    }

    return (
        <>
            <div className='search-box' style={{ width: width }}>
                <div
                    className='search-icon'
                    style={{ color: 'blue' }}
                    onClick={searchClick}
                >
                    <FiSearch />
                </div>
                <input
                    type='text'
                    ref={input}
                    className='search-bar'
                    placeholder={placeholder}
                    onChange={e => setQuery(e.target.value)}
                    style={{ width: width }}
                />
                {showClear && (
                    <div onClick={clearInput} className='search-clear'>
                        <MdClear />
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchBar
