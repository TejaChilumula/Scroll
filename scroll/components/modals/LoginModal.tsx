import useLoginModal from "@/hooks/useLoginModel";
import Input  from '../Input';
import {useState , useCallback} from 'react';
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModel";
const LoginModal = () => 
{
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [isLoading , setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading){
        return;
        }
        loginModal.onClose();
        registerModal.onOpen();
},[isLoading,registerModal,loginModal])

    const onSubmit = useCallback( async() => {
        try{
            setIsLoading(true);

            loginModal.onClose();
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    },[loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
            />
            <Input
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            />
        </div>
    )
    const foooterContent=(
        <div className="text-neutral-400 text-center mt-4">
            <p>First time using Scroll? 
            <span 
            onClick={onToggle}
            className="
            text-white
            cursor-pointer
            hover:underline
            "> Create an account</span>
            </p>
        </div>
    )

    return(
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen }
        title="Login"
        actionLabel="Sign in"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={foooterContent}
        />
    )
}
export default LoginModal;