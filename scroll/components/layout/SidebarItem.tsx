import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import React ,{useCallback} from 'react';
import {IconType} from 'react-icons';
import LoginModal from '../modals/LoginModal';
import useLoginModal from '@/hooks/useLoginModel';

interface SidebarItemProps {
    label : string;
    href ?: string;
    icon : IconType
    onClick?: () => void; //optional
    auth ?: boolean
}
const SidebarItem : React.FC<SidebarItemProps> = ({
    label,
    href,
    icon : Icon, // if we want to use any parameter as an component we should give an alias icon : Icon
    onClick,
    auth
}) => {
    const loginModal = useLoginModal();
    const {data : currentUser} = useCurrentUser();
    const router = useRouter();
    const handleClick = useCallback(() => {
        if(onClick) {
            return onClick();
        }
        if(auth && !currentUser){
            loginModal.onOpen();
        }
        if(href) {
            router.push(href);
        }
        
    },[router, onClick, href]);
    return(
        <div onClick= {handleClick} className='flex flex-row items-center'>
            <div className="
                relative
                rounded-full
                h14
                w-14
                flex
                items-center
                justify-center
                p-4
                hover:bg-slate-300
                hover:bg-opacityy-10
                cursor-pointer
                lg:hidden">
                    <Icon size={28} color='white' />
            </div>

            <div
            className="
            relative
            hidden
            lg:flex
            items-center
            gap-4  
            rounded-full
            hover:bg-slate-300
            hover:bg-opacity-10
            cursor-pointer 
            ">
                <Icon size={24} color='white'/>
                <p className='hidden lg:block text-white text-xl'>
                    {label}
                </p>

            </div>
        </div>
    );
}
export default SidebarItem;