"use client"
import Navbar from "@/components/Navbar"
import styled from "styled-components"
import { useEffect, useState } from 'react'
import { Books } from "@/interfaces"
import BookCard from "@/components/BookCard"
import { useRouter } from 'next/navigation'
import CustomModal from "@/components/Modal"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
var CryptoJS = require("crypto-js");

const Home = () => {

  const router = useRouter()
  const [data, setData] = useState<Books[]>([])
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('')
  const [info, setInfo] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const [isAdd, setIsAdd] = useState<boolean>(true)
  const handleOpen = () => {
    setOpen(true)
    setIsAdd(true)
  };
  const handleClose = () => setOpen(false);
  const getBooks = async () => {
    const res = 'GET' + `/books${inputValue?.length > 2 ? `/${inputValue}` : ''}` + `${localStorage.getItem('key')}`
    const token = CryptoJS.MD5(res).toString()
    try {
      const response = await fetch(
        `https://0001.uz/books${inputValue?.length > 2 ? `/${inputValue}` : ''}`,
        {
          headers: {
            Key: `${localStorage.getItem('name')}`,
            Sign: token
          },
        }
      );
      if (!response?.ok) {
        throw new Error(`HTTP Error! Status: ${response?.status}`);
      }
      const responseData = await response.json();
      setData(responseData?.data)
    } catch (error) {
      console.log("Error:", error);
    } 
  }

  useEffect(() => {
    if(!localStorage.getItem('name')) {
      router.push('/login')
    }
  }, [])
  useEffect(() => {
    getBooks()
  }, [inputValue])

  return (
    <Container>
      <Navbar />
      <Top>
        <h1>You’ve got <span>7 book</span></h1>
        <div>
          <input 
            placeholder="Enter at least 3 letters ..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
            <CustomModal info={info} status={status} isAdd={isAdd} setStatus={setStatus} setInfo={setInfo} handleOpen={handleOpen} handleClose={handleClose} open={open} />
        </div>
      </Top>
      <Title>Your task today</Title>
      <Books>
        {data?.map((item, i) => <BookCard book={item} key={i} setIsAdd={setIsAdd} setInfo={setInfo} handleOpen={handleOpen} setStatus={setStatus} getBooks={getBooks} />)}
      </Books>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  )
}

export default Home

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  padding: 0 100px;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    color: #FEFEFE;
    font-family: Mulish;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    span {
      color: #6200EE;
    }
  }
  div {
    display: flex;
    gap: 24px;
    input {
      display: flex;
      height: 47px;
      width: 320px;
      padding: 14px 16px;
      align-items: center;
      gap: 16px;
      align-self: stretch;
      border-radius: 6px;
      border: 1px solid #EBEBEB;
      background: #FEFEFE;
    }
    button {
      display: flex;
      padding: 10px 24px;
      justify-content: center;
      align-items: center;
      gap: 12px;
      border-radius: 4px;
      background: #6200EE;
      color: white;
      border: none;
      cursor: pointer;
    }
  }
`
const Title = styled.p`
  color: #FEFEFE;
  font-family: Mulish;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Books = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 36px;
`