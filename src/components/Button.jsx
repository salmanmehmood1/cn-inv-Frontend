import React from 'react'

const button = ({ bgColor, color, size, text, borderRadius, onClick, padding, margin, disabled }) => {
  return (
    <button type='button' style={{ backgroundColor: bgColor, color, borderRadius , padding , margin, disabled}} className={`text-${size} p-3 hover:drop-shadow-xl`} onClick={onClick}>
      {text}
    </button>
  )
}

export default button