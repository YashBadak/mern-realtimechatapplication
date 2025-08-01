import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
       const [show,setShow]=useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading,setLoading]=useState(false);
  const toast=useToast();
  const navigate=useNavigate();
    const handleClick=()=> setShow(!show);

    const submitHandler= async()=>{
          setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try {
             const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, {email, password}, config);
            console.log(data);
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
             localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
             toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }
  return (
       <VStack spacing={"5px"}>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input value={email} placeholder='Enter Email' onChange={(e)=> setEmail(e.target.value)}/>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input value={password} type={show ?"text" : "password" } placeholder='Enter password' onChange={(e)=> setPassword(e.target.value)}/>
            <InputRightElement width={"4.5rem"}>
            <Button onClick={handleClick}>
                {show ? "Hide" : "show"}
            </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button isLoading={loading} colorScheme={"blue"} w={"full"} marginTop={3} onClick={submitHandler}>
            Login
        </Button>
         <Button variant={"solid"} colorScheme={"red"} w={"full"} marginTop={3} onClick={()=>{
                    setEmail("guest@gmail.com")
                    setPassword("1234")
                }}>
                    Get Guest UserCredentials
                </Button>
    </VStack>
  )
}

export default Login