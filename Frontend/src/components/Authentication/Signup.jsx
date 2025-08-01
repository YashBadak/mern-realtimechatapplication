import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';

function Signup() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dgazvfqql");
            fetch("https://api.cloudinary.com/v1_1/dgazvfqql/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

    }
    const submitHandler = async () => {

        setLoading(true);
        if (!name || !email || !password) {
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

            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, { name, email, password, pic }, config);
            console.log(data);
            toast({
                title: "Registration Successful",
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
            <FormControl id='name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input value={name} placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input value={email} placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input value={password} type={show ? "text" : "password"} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width={"4.5rem"}>
                        <Button onClick={handleClick}>
                            {show ? "Hide" : "show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic' isRequired>
                <FormLabel>Upload Your Pic</FormLabel>
                <Input type='file' accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />
            </FormControl>
            <Button isLoading={loading} colorScheme={"blue"} w={"full"} marginTop={3} onClick={submitHandler}>
                SignUp
            </Button>

        </VStack>
    )
}

export default Signup