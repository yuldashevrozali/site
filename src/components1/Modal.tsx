import {useState } from 'react'
import Box from '@mui/material/Box';
import styled from "styled-components"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
var CryptoJS = require("crypto-js");

interface ModalProps {
    info: string;
    status: number;
    isAdd: boolean;
    setInfo: React.Dispatch<React.SetStateAction<string>>;
    handleOpen: () => void;
    handleClose: () => void;
    setStatus: React.Dispatch<React.SetStateAction<any>>;
    open: boolean;
  }
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 430,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: '0px 4px 32px 0px rgba(51, 51, 51, 0.04)',
  p: '24px',
};
const CustomModal: React.FC<ModalProps> = ({ info, status, isAdd, setInfo, handleOpen, handleClose, setStatus, open }) => {
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let data = {}

    if(info?.length > 0) {
        data = {
            "isbn": info
        }
    } else {
        data = {
            "status": status
        }
    }
    console.log(data, 'data')
    const res = `POST` + `/books` + JSON.stringify(data) + `${localStorage.getItem('key')}`
    const res2 = `PATCH` + `/books/${localStorage.getItem('bookId')}` + JSON.stringify(data) + `${localStorage.getItem('key')}`
    const token = CryptoJS.MD5(res).toString()
    const token2 = CryptoJS.MD5(res2).toString()
      try {
        const response = await fetch(
          `https://0001.uz/books${isAdd ? '' : `/${localStorage.getItem('bookId')}`} `,
          {
            method: `${isAdd ? 'POST' : 'PATCH'}`,
            headers: {
              "Content-Type": "application/json",
              Key: `${localStorage.getItem('name')}`,
              Sign: `${isAdd ? token : token2}`
            },
            body: JSON.stringify(data),
          }
        );
        if (!response?.ok) {
          throw new Error(`HTTP Error! Status: ${response?.status}`);

        }
        const responseData = await response.json();
        if(isAdd) {
            toast.success('Added Succesfully!')
        } else {
            toast.success('Updated Succesfully!')
        }
        if(responseData?.isOk) {
            handleClose()
            setInfo('')
            setStatus(0)
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error('Something went wrong!')
      }
  }

  const closeModal = () => {
    handleClose()
    setInfo('')
    setStatus(0)
  }
  return (
    <div>
      <button onClick={handleOpen}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M8.00001 3.83331V13.1666M3.33334 8.49998H12.6667" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>  Create a book</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <ModalWrapper onSubmit={handleSubmit}>
            <ModalTop>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {isAdd ? 'Create a book' : 'Edit a book'}
                </Typography>
                <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M15 9.5L9 15.5M9 9.5L15 15.5M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z" stroke="#151515" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </ModalTop>
            <ModalInputs>
            <InputWrapper>
            {isAdd ? <><label>Isbn</label>
                <input 
                    placeholder="Enter isbn"
                    id='title'
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    required
                /></> : <><label>Status</label>
                <input 
                    type='number'
                    placeholder="Enter status"
                    id='title'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                /></>}
                
            </InputWrapper>
            {/* <InputWrapper>
                <label>Author</label>
                <input 
                    placeholder="Enter your author"
                    id='author'
                    value={author}
                    onChange={handleChange}
                />
            </InputWrapper>
            <InputWrapper>
                <label>Cover</label>
                <input 
                    placeholder="Enter your cover"
                    id='cover'
                    value={cover}
                    onChange={handleChange}
                />
            </InputWrapper>
            <InputWrapper>
                <label>Published</label>
                <input 
                    placeholder="Enter your published"
                    id='published'
                    value={published}
                    onChange={handleChange}
                />
            </InputWrapper>
            <InputWrapper>
                <label>Pages</label>
                <input 
                    placeholder="Enter your pages"
                    id='pages'
                    value={pages}
                    onChange={handleChange}
                />
            </InputWrapper> */}
            </ModalInputs>
            <ModalButtons>
                <CloseBtn onClick={closeModal}>Close</CloseBtn>
                <SubmitBtn type='submit'>Submit</SubmitBtn>
            </ModalButtons>
            </ModalWrapper>
        </Box>
      </Modal>
    </div>
  )
}

export default CustomModal

const ModalTop = styled.div`
    display: flex;
    justify-content: space-between;
    svg {
        margin-top: 5px;
        corsor: pointer;
    }
`
const ModalWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 28px;
`
const ModalInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  label {
    color: #151515;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Mulish;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  }
  input {
    padding: 14px 16px;
    margin-top: 5px;
    align-items: center;
    border-radius: 6px;
    border: 1px solid #EBEBEB;
    background: #FEFEFE;
  }
`
const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
`
const CloseBtn = styled.button`
    display: flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    border-radius: 4px;
    border: 1px solid #6200EE;
    background-color: #fff;
    cursor: pointer;
`
const SubmitBtn = styled.button`
    display: flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    border-radius: 4px;
    background: #6200EE;
    boder: none;
    color: #FEFEFE;
    font-family: Mulish;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
`