import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/navigation'; 
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

interface NavItem {
  id: number;
  text: string;
}

 export default function Navbar () {

  const [nav, setNav] = useState<boolean>(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const navItems: NavItem[] = [
    { id: 1, text: 'Inicio', href: '/' },
    { id: 2, text: 'Comunidade', href: '' },
    { id: 3, text: 'Recursos', href: '' },
    { id: 4, text: 'Buscar', href: '' },
    { id: 5, text: 'Perfil', href: '/menu/perfil' }, // Link para a página de perfil
  ];

  return (
    <div className='bg-[#1B3E1B] flex justify-between items-center h-24  mx-auto px-4 text-white'>
      {/* Logo */}
	 <ul>
	  <Link href="/">
					<Image width={175} height={32} src="/typograph-logo.png" alt="Logo" />
	  </Link>
	</ul> 

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <Link 
            key={item.id} 
            href={item.href}
            onClick={(e) => {
              console.log(`Navigating to: ${item.href}`); // Log de depuração
              // Opcional: forçar navegação se o Link não estiver funcionando
              // router.push(item.href);
            }}
          >
            <li className='p-4 hover:bg-[#ffffff] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
              {item.text}
            </li>
          </Link>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <Link 
            key={item.id} 
            href={item.href}
            onClick={(e) => {
              console.log(`Navigating to: ${item.href}`); // Log de depuração
              // Opcional: forçar navegação se o Link não estiver funcionando
              // router.push(item.href);
            }}
          >
            <li className='p-4 border-b rounded-xl hover:bg-[#16192B] duration-300 hover:text-black cursor-pointer border-gray-600'>
              {item.text}
              </li>
              </Link>
        ))}
      </ul>
    </div>
  );
};

