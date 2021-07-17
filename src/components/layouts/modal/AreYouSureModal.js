import React from 'react'
import MModal from './MModal'

export default function AreYouSureModal({ open, setOpen, submitText, onSubmit }) {
    return (
        <MModal title="Are You Sure?" open={open || false} setOpen={setOpen} onSubmit={onSubmit} submitText={submitText}>
        </MModal>
    )
}
