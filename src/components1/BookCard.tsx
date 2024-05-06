"use client"
import React from 'react'
import styled from "styled-components"
import { toast } from 'react-toastify';
var CryptoJS = require("crypto-js");

const BookCard: React.FC<any> = ({ book, setInfo, handleOpen, getBooks, setIsAdd, setStatus }) => {
    const clickHandle = () => {
        if(book?.isbn) {
            setInfo(book?.isbn)
            handleOpen()
            setIsAdd(true)
        }
    }
    const editHandle = () => {
        setStatus(book?.status*1)
        localStorage.setItem('bookId', book?.book?.id)
        handleOpen()
        setIsAdd(false)
    }
    const deleteBook = async (id: string) => {
        const res = 'DELETE' + `/books/${id}` + `${localStorage.getItem('key')}`
    const token = CryptoJS.MD5(res).toString()
    try {
      const response = await fetch(
        `https://0001.uz/books/${id}` ,
        {
            method: 'DELETE',
          headers: {
            Key: `${localStorage.getItem('name')}`,
            Sign: token
          },
        }
      );
      if (!response?.ok) {
        throw new Error(`HTTP Error! Status: ${response?.status}`);
      }
      toast.success('Deleted successfully')
      getBooks()
    } catch (error) {
      console.log("Error:", error);
    }
    }
  return (
    <CardWrapper onClick={clickHandle}>
        <Wrapper>
        <h2>{book?.title || book?.book?.title}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor gravida ante, 
          id scelerisque quam varius at. Nulla nec hendrerit tellus. Vivamus euismod fringilla neque, 
          ac condimentum sapien.
        </p>
        <BottomWrapper>
        <p>Eben Upton: {book?.published || book?.book?.published}-year</p>
        <span>{book?.pages || book?.book?.pages || 0} pages</span>
    </BottomWrapper>
    </Wrapper>
    {book?.book?.id ? <Buttons>
        <DeleteBtn onClick={() => deleteBook(book?.book?.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M11.3334 3.99998V3.46665C11.3334 2.71991 11.3334 2.34654 11.1881 2.06133C11.0603 1.81044 10.8563 1.60647 10.6054 1.47864C10.3202 1.33331 9.94682 1.33331 9.20008 1.33331H8.13341C7.38668 1.33331 7.01331 1.33331 6.72809 1.47864C6.47721 1.60647 6.27324 1.81044 6.14541 2.06133C6.00008 2.34654 6.00008 2.71991 6.00008 3.46665V3.99998M7.33341 7.66665V11M10.0001 7.66665V11M2.66675 3.99998H14.6667M13.3334 3.99998V11.4666C13.3334 12.5868 13.3334 13.1468 13.1154 13.5746C12.9237 13.951 12.6177 14.2569 12.2414 14.4487C11.8136 14.6666 11.2535 14.6666 10.1334 14.6666H7.20008C6.07998 14.6666 5.51992 14.6666 5.0921 14.4487C4.71578 14.2569 4.40982 13.951 4.21807 13.5746C4.00008 13.1468 4.00008 12.5868 4.00008 11.4666V3.99998" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </DeleteBtn>
        <EditBtn onClick={editHandle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M14.6667 12L14 12.7294C13.6464 13.1161 13.1668 13.3333 12.6668 13.3333C12.1668 13.3333 11.6873 13.1161 11.3337 12.7294C10.9796 12.3434 10.5001 12.1267 10.0002 12.1267C9.50033 12.1267 9.02084 12.3434 8.66673 12.7294M2.66675 13.3333H3.78311C4.10923 13.3333 4.27229 13.3333 4.42574 13.2965C4.56179 13.2638 4.69185 13.21 4.81115 13.1369C4.9457 13.0544 5.061 12.9391 5.2916 12.7085L13.6668 4.33334C14.219 3.78106 14.219 2.88563 13.6668 2.33334C13.1145 1.78106 12.219 1.78106 11.6668 2.33334L3.29159 10.7085C3.06099 10.9391 2.94568 11.0544 2.86323 11.189C2.79012 11.3083 2.73625 11.4383 2.70359 11.5744C2.66675 11.7278 2.66675 11.8909 2.66675 12.217V13.3333Z" stroke="#FEFEFE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </EditBtn>
    </Buttons> : null}
    
    </CardWrapper>
  )
}

export default BookCard
const CardWrapper = styled.div`
    width: 32%;
    display: flex;
    cursor: pointer;
`
const Buttons = styled.div`
    margin-top: 15px;
`
const DeleteBtn = styled.button`
    padding: 2px;
    cursor: pointer;
    border-radius: 12px;
    border-radius: 6px 6px 6px 0px;
    background: #FF4D4F;
    box-shadow: 0px 6px 32px 0px rgba(21, 21, 21, 0.48);
`
const EditBtn = styled.button`
    background-color: red;
    padding: 2px;
    cursor: pointer;
    border-radius: 0px 6px 6px 6px;
    background: #6200EE;
    box-shadow: 0px 6px 32px 0px rgba(21, 21, 21, 0.48);
`
const Wrapper = styled.div`
    display: flex;
    padding: 32px;
    flex-direction: column;
    gap: 16px;
    border-radius: 12px;
    border: 1px solid #EBEBEB;
    background: #FEFEFE;
    box-shadow: 0px 4px 24px 0px rgba(51, 51, 51, 0.08);
    h2 {
        color: #151515;
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    p {
        color: #333;
        font-family: Mulish;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
    }
`
const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    p {
        color: #333;
        font-family: Mulish;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 15px;
    }
    span {
        display: flex;
        padding: 2px 12px;
        align-items: center;
        gap: 6px;
        border-radius: 8.5px;
        background: #EFE6FD;    
        color: #9654F4;
        text-align: center;
        font-family: Mulish;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`