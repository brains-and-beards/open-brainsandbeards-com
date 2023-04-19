import React from 'react'
import { useEffect } from 'react'

const Modal = ({ show, onClose, mainText, title, footerText }) => {
  useEffect(() => {
    const modal = document.getElementById('error-modal')
    if (show) {
      modal.style.display = 'block'
      setTimeout(() => (modal.style.opacity = 1), 50)
      window.onclick = event => (event.target === modal ? onClose() : null)
    } else {
      modal.style.opacity = 0
      setTimeout(() => (modal.style.display = 'none'), 500)
      window.onclick = event => (event.target === modal ? onClose() : null)
    }
  }, [show])

  return (
    <div id="error-modal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          <p dangerouslySetInnerHTML={{ __html: mainText }} />
        </div>
        {footerText ? (
          <div className="modal-footer">
            <h3>{footerText}</h3>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Modal
