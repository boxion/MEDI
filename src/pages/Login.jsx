import React, { useState } from 'react';
import colors from "../styles/colors";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginButton from "../components/button/button-auth";
import Input from "../components/input/input-auth";
import error from "../assets/images/error.png";
import axios from "axios";

const LoginP = styled.p`
    color: ${colors.white};
    font-size: ${({ fontSize }) => fontSize || '1vw'};
    font-weight: bold;
`;

const LoginContainer = styled.div`
    width: 30%;
    margin-top: -1.5vw;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const StyledLink = styled(Link)`
    text-decoration: underline;
    color: ${colors.white};
`;

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: -1.5vw;
`;

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [userid, setUserId] = useState('');
    const [userpassword, setUserPassword] = useState('');

    const toggleShowPassword = () => {
        setShowPass(!showPass);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                userId: userid,
                userPassword: userpassword
            });
            console.log('로그인 성공', response.data);
            window.location.href = "/";
            
        } catch (error) {
            console.error('로그인 실패', error.response.data);
        }
    };


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <LoginP fontSize="2.5vw">로그인</LoginP>

            <LoginContainer>
                <LoginP>아이디</LoginP>
                <Input show="text" placeholder="아이디를 입력해주세요." input={userid} handleInputChange={(e) => setUserId(e.target.value)}/>
            </LoginContainer>

            <LoginContainer style={{ position: "relative", marginTop: "-1vw" }}>
                <LoginP>비밀번호</LoginP>
                <Input show={showPass} toggleShow={toggleShowPassword} placeholder="비밀번호를 입력해주세요." input={userpassword} handleInputChange={(e) => setUserPassword(e.target.value)}/>

                <ErrorContainer>
                    <img src={error} alt="error" style={{width: "0.8vw", height: "0.8vw"}}/>
                    <LoginP style={{color: colors.red, fontSize: "0.8vw"}}>잘못된 정보입니다. 다시 입력해주세요.</LoginP>
                </ErrorContainer>
                <LoginButton buttonText="LOGIN" type="submit" onClick={(e) => { e.preventDefault(); handleLogin(); }} />
            </LoginContainer>

            <div style={{display: "flex", gap: "1rem", opacity: "0.5", fontSize: "0.5rem"}}>
                <LoginP style={{fontSize: "0.8vw"}}>아직 회원이 아니신가요?</LoginP>
                <StyledLink to="/signup">
                    <LoginP style={{fontSize: "0.8vw"}}>회원가입 하기</LoginP>
                </StyledLink>
            </div>
        </div>
    );
};

export default Login;
