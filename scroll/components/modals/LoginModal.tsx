"use client";

import { signIn, getSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import axios from "axios";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import Button from "../Button";


const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithGoogle = async () => {
      //setIsLoading(true);
      const result = await signIn('google'); // Sign in using the Google provider configured in NextAuth

      console.log("Bunty's Result");
      console.log(result);

      if (!result?.error) {
        const session = await getSession();

      if (session?.user) {
        // Extract profile data from the result
        const { email: profileEmail, name: profileName } = session.user;

        // Make a POST request to your API to store user details in your database
        await axios.post('/api/register', {
          email: profileEmail,
          name: profileName,
          username : profileName,
          password: 123
          
        });

        
        console.log("success BT");
        // Successfully logged in via Google, now sign in with credentials if needed
        await signIn('credentials', { email, password });

        // Close the login modal
        loginModal.onClose();

        toast.success('Logged in successfully.');
      }
    /*}} catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }*/
  }};

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn('credentials', {
        email,
        password,
      });

      toast.success('Logged in');

      loginModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal]);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading} 
      />
    

    <p> or</p>

    <button className="bg-white  
        disabled:opacity-70
        w-200
        h-200
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2" onClick={handleSignInWithGoogle}>
      Sign in with Google
    </button>
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>First time using Twitter?
        <span 
          onClick={onToggle} 
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Create an account</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
