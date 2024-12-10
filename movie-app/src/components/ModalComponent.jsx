import Modal from '@mui/material/Modal';

export default function ModalComponent({open, handleClose}) {
  return (
    <Modal
        open={open}
        onClose={handleClose}
       
    >
        <div>
          asdfs
        </div>
    </Modal>
)
}
