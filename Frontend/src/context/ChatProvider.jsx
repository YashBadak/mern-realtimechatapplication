import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";


const chatContext=createContext();
const  ChatProvider=({children})=>{
    const [user,setUser]=useState();
   const [selectedChat, setSelectedChat] = useState()
   const [chats, setChats] = useState([])
   const [notification, setNotification] = useState([])
        const navigate=useNavigate();

    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo)
        if(!userInfo){
            navigate("/");
        }

    },[navigate])
    return (
       <chatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats, setChats,notification, setNotification}}>
        {children}
       </chatContext.Provider>
    )
}

export const  chatState=()=>{
    return useContext(chatContext);
}

export default ChatProvider;

