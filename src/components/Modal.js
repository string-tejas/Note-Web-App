import React, { useState, useEffect, Component } from 'react'
import ReactDom from 'react-dom'
import { ImCross } from 'react-icons/im'

/**
 * Modal Component
 * @param  {boolean} open state determining whether modal is open or close
 * @param  {string} title title of the Modal
 * @param  {Component} children body of the Modal
 * @param  {function} onClose function to set open state to false
 * @param  {string} width width of Modal (optional)
 * @param  {string} height height of Modal (optional)
 * @param  {boolean} noStretch stretch Modal for mobile devices
 */
const Modal = ({
    open,
    title,
    children,
    onClose,
    width,
    height,
    noStretch = false,
}) => {
    let style = { width, height }

    const [styleUse, setStyleUse] = useState(
        window.innerWidth > 500 ? true : false
    )
    const checkWidth = () => {
        if (window.innerWidth > 500) setStyleUse(true)
        else setStyleUse(false)
    }
    useEffect(() => {
        window.addEventListener('resize', checkWidth)
        return () => {
            window.removeEventListener('resize', checkWidth)
        }
    })
    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className='overlay' onClick={onClose} />
            <div
                className={`modal ${noStretch ? 'no-stretch' : ''}`}
                style={styleUse ? style : {}}
            >
                <div className='modal-header'>
                    <span>{title}</span>
                    <button onClick={onClose}>
                        <ImCross />
                    </button>
                </div>
                <div className='modal-body'>{children}</div>
            </div>
            ,
        </>,
        document.getElementById('portal')
    )
}

export default Modal
