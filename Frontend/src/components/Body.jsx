import React, { useEffect, useRef, useState } from 'react';
import css from './Body.module.css';
import MessageBox from './MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages, addMessage  } from '../store/messageSlice';
import { showAlert } from '../store/alertSlice';
import { setSelectedChat } from '../store/chatSlice';
import Alert from './Alert';
import Contact from './Contact';
import socket from '../utils/socket'
import { IoPersonCircle } from "react-icons/io5";

export default function Body() {
    const focusRef = useRef(null);

    const messages = useSelector((state) => state.messages.messages);
    const selectedChat = useSelector((state) => state.chat.selectedChat);
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    useEffect(() => {
      socket.on(
          "receive-message",
          (data) => {
              if (
                  selectedChat &&
                  data.chatId === selectedChat.chatId
              ) {
                  dispatch(
                      addMessage(data)
                  );
              }
          }
      );
      return () => {
          socket.off("receive-message");
      };
    }, [selectedChat]);

    //Auto scroll to bottom
    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.scrollIntoView({
                behavior: 'smooth'
          });
      }
    }, [messages]);

    return (
        <div className={css.main}>
            <Contact/>
            <div className={css.container}>
                {
                  !selectedChat
                  ?
                  (
                      <div className={css.innerContainer}>

                          <h1>Select a Chat</h1>
                          <p>
                              Choose a contact from the sidebar
                              to start messaging.
                          </p>

                      </div>
                  )
                  :
                <div className={css.innerContainer}>
                    <div className={css.navChatBox}>
                        <IoPersonCircle className={css.userIcon}/>
                        <h2 className={css.userName}>
                            {selectedChat.contactName}
                        </h2>
                    </div>
                    <div className={css.chatBox}>
                        {
                            messages.map((m) => (
                                <div
                                    key={m._id}
                                    className={css.chatWrapper}
                                    style={
                                        m.senderId === user.id
                                            ? { alignItems: 'flex-end' }
                                            : {}
                                    }
                                >
                                    <div
                                        className={css.chats}
                                        style={
                                            m.senderId === user.id
                                                ? {
                                                    backgroundColor: '#114937',
                                                    borderRadius:
                                                        '15px 0px 15px 15px'
                                                }
                                                : {}
                                        }
                                    >
                                        <p className={css.chatOwner}>
                                            {
                                                m.senderId === user.id
                                                    ? 'You'
                                                    : 'Contact'
                                            }
                                        </p>
                                        <p className={css.chatText}>
                                            {m.text}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }

                        <div ref={focusRef}></div>

                    </div>

                </div>
                }

                {
                  selectedChat &&
                  (
                      <MessageBox
                          messages={messages}
                          setMessages={setMessages}
                          selectedChat={selectedChat}
                      />
                  )
                }

            </div>

        </div>
    );
}