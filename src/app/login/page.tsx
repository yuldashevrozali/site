"use client"
import { useState } from 'react'
import styled from "styled-components"
import facebook from '@/images/Facebook.png'
import google from '@/images/Google.png'
import Image from "next/image"
import Link from "next/link"
import { LoginInfos } from '@/interfaces'
import { useRouter } from 'next/navigation'
// import CryptoJS from 'crypto-js'
var CryptoJS = require("crypto-js");

const Login = () => {
  const router = useRouter()

  const [info, setInfo] = useState<LoginInfos>({
    name: '',
    username: '',
    password: ''
  })

  const { name, username, password } = info

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      "key":      username,
      "secret":   password
    }
    let res = 'GET' + '/myself' + password
    let sign = CryptoJS.MD5(res).toString()
    try {
      const response = await fetch(
        `https://0001.uz/myself`,
        {
          method: `GET`,
          headers: {
            Key: username,
            Sign: sign
          }
        }
      );
      if (!response?.ok) {
        throw new Error(`HTTP Error! Status: ${response?.status}`);
      }
      const responseData = await response.json();
      
      if(responseData?.isOk) {
        localStorage.setItem('key', responseData?.data?.secret)
        localStorage.setItem('name', responseData?.data?.key)
        router.push('/')
      }
      
    } catch (error) {
      console.log("Error:", error);
    }

      // if(CryptoJS.MD5(res).toString()?.length > 0) {
      //   localStorage.setItem('key', password)
      //   localStorage.setItem('name', username)

      //   router.push('/')
      // }
    
  }
  return (
    <Wrapper>
      <LoginForm onSubmit={handleSubmit}>
        <LoginTitle>
          Sign in
        </LoginTitle>
        <BtnWrapper>
        <NetBtn>
            <Image src={google} alt="google" />
            <p>Continue with Google</p>
          </NetBtn>
          <NetBtn>
            <Image src={facebook} alt="google" />
            <p>Continue with Google</p>
          </NetBtn>
        </BtnWrapper>
        <LineDiv>
          <div><p>OR</p></div>
        </LineDiv>
        <InputsWrapper>
        {/* <InputWrapper>
            <label>Your name</label>
            <input 
              placeholder="Enter your name"
              id='name'
              value={name}
              onChange={handleChange}
            />
          </InputWrapper> */}
          <InputWrapper>
            <label>Your username</label>
            <input 
              placeholder="Enter your username"
              id='username'
              value={username}
              onChange={handleChange}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <label>Your password</label>
            <input 
              placeholder="Enter your password"
              id='password'
              value={password}
              onChange={handleChange}
              required
            />
          </InputWrapper>
        </InputsWrapper>
        <ButtonWrapper>
          <Button type='submit'>Sign In</Button>
          <p>Don`t signed up? <Link href={'/registration'}>Go to sign up.</Link></p>
        </ButtonWrapper>
      </LoginForm>
    </Wrapper>
  )
}

export default Login

const Wrapper =  styled.div`
height: auto;
  margin: 0;
  padding: 0;
`
const LoginForm = styled.form`
  background-color: #fff;
  height: 95vh;
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin: 2.5vh auto;
  padding: 48px 28px;
  width: 30%;
  taxt-align: center;
  align-items: center;
  border-radius: 12px;
  background: #FEFEFE;
  box-shadow: 0px 4px 32px 0px rgba(51, 51, 51, 0.04);
`
const LoginTitle = styled.h1`
  color: #151515;
  font-family: Mulish;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`
const BtnWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`
const NetBtn = styled.div`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #151515;
  display: flex;
  justify-content: center;
  cursor: pointer;
  img {
    width: 17px;
    height: 17px;
    margin: 10px 10px 0 0;
  }
  p {
    color: #151515;
    font-family: Mulish;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 10px 0;
  }
`
const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background: #24272C;
  display: flex;
  justify-content: center;
  p {
    margin-top: -8.5px;
    padding: 0 15px;
    background-color: white !important;
  }
`
const InputsWrapper = styled.div`
  width: 100%;
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
const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  p {
    margin-top: 10px;
  }
`
const Button = styled.button`
  width: 100%;
  padding: 10px 24px;
  text-align: center;
  border: none;
  border-radius: 4px;
  background: #6200EE;
  color: #FEFEFE;
  font-family: Mulish;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`