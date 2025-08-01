import React from 'react'
import { chatState } from '../context/ChatProvider'

import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import { useState } from 'react';

function Chat() {

  const {user}=chatState();
  const[fetchAgain,setFetchAgain]=useState(false);
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box display={"flex"} justifyContent={"space-between"} w={"100%"} h={"91vh"} p={"10px"}>
         {user && <MyChats fetchAgain={fetchAgain} />}  
         {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>} 
      </Box>

    </div>
  )
}

export default Chat