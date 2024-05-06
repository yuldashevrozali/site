'use client'
import Image from 'next/image'
import React from 'react'
import styled from "styled-components"
import notFound from '@/images/notfound.png'
import { useRouter } from 'next/navigation'

const CustomNotFound = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <div>
      <Image src={notFound} alt='notfound' />
      <Buttons>
        <HomeBtn onClick={() => router.push('/')}>Go Home Page</HomeBtn>
        <ReloadBtn>Reload Page</ReloadBtn>
      </Buttons>
      </div>
    </Wrapper>
  )
}

export default CustomNotFound

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  div {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 720px;
    img {
      width: 720px;
      height: 476px;
      margin-bottom: 76px;
    }
  }
`
const Buttons = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  button {
    display: flex;
    width: 240px;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    cursor: pointer;
  }
`
const HomeBtn = styled.button`
  background: #6200EE;
  color: white;
`
const ReloadBtn = styled.button`
  border: 1px solid #6200EE;
  color: #6200EE;
  background-color: #fff;
`