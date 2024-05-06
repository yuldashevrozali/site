import React from 'react'
import styled from "styled-components"
import logo from '@/images/logo.png'
import Image from 'next/image'
import avatar from '@/images/avatar.png'
const Navbar = () => {
  return (
    <Wrapper>
        <LeftSide>
            <Image src={logo} alt='Logo' />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#FEFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>Search for any training you want</p>
        </LeftSide>
        <RightSide>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z" stroke="#151515" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <Image src={avatar} alt='avatar' width={34} height={34} />
        </RightSide>
    </Wrapper>
  )
}

export default Navbar

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    margin-bottom: 36px;
`
const LeftSide = styled.div`
    display: flex;  
    svg {
        margin: 9px 12px 9px 24px;
    }
    p {
        display: flex;
        width: 264px;
        flex-direction: column;
        justify-content: center;
        align-self: stretch;
        color: #FEFEFE;
        font-family: Mulish;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.16px;
        opacity: 0.64;
    }
`
const RightSide = styled.div`
   display: flex;
   svg {
    margin: 5px 24px
   }
   img {
    border: 1px solid red;
    border-radius: 50%;
   }
`