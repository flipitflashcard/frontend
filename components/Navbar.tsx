import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {

    const router = useRouter();

    return (
        <div className='design-navbar position-fixed bottom-0'>
            <ul className='list-unstyled d-flex flex-row-reverse justify-content-around align-items-center p-4 mb-0'>
                <li>
                    <Link href='/setting'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity={router.asPath !== '/setting' ? "0.5" : ""}>
                                <path d="M13.7735 22.1239H5.37259" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.5207 9.2005H25.9216" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.6351 9.12834C11.6351 7.4008 10.2242 6 8.4842 6C6.74422 6 5.33334 7.4008 5.33334 9.12834C5.33334 10.8559 6.74422 12.2567 8.4842 12.2567C10.2242 12.2567 11.6351 10.8559 11.6351 9.12834Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M26.6667 22.0717C26.6667 20.3441 25.2569 18.9433 23.5169 18.9433C21.7758 18.9433 20.365 20.3441 20.365 22.0717C20.365 23.7992 21.7758 25.2 23.5169 25.2C25.2569 25.2 26.6667 23.7992 26.6667 22.0717Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link href='/etc'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity={router.asPath !== '/etc' ? "0.5" : ""}>
                                <path d="M16 11.1031V20.8715" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20.8889 15.9873H11.1111" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M22.2476 2.66666H9.7524C5.39685 2.66666 2.66669 5.74943 2.66669 10.1135V21.8864C2.66669 26.2505 5.38415 29.3333 9.7524 29.3333H22.2476C26.6159 29.3333 29.3334 26.2505 29.3334 21.8864V10.1135C29.3334 5.74943 26.6159 2.66666 22.2476 2.66666Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link href='/home'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity={router.asPath !== '/home' ? "0.5" : ""}>
                                <path fillRule="evenodd" clipRule="evenodd" d="M4 8.66667C4 5.16638 4.03748 4 8.66667 4C13.2959 4 13.3333 5.16638 13.3333 8.66667C13.3333 12.167 13.3481 13.3333 8.66667 13.3333C3.98524 13.3333 4 12.167 4 8.66667Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.6667 8.66667C18.6667 5.16638 18.7042 4 23.3334 4C27.9625 4 28 5.16638 28 8.66667C28 12.167 28.0148 13.3333 23.3334 13.3333C18.6519 13.3333 18.6667 12.167 18.6667 8.66667Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M4 23.3333C4 19.833 4.03748 18.6667 8.66667 18.6667C13.2959 18.6667 13.3333 19.833 13.3333 23.3333C13.3333 26.8336 13.3481 28 8.66667 28C3.98524 28 4 26.8336 4 23.3333Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.6667 23.3333C18.6667 19.833 18.7042 18.6667 23.3334 18.6667C27.9625 18.6667 28 19.833 28 23.3333C28 26.8336 28.0148 28 23.3334 28C18.6519 28 18.6667 26.8336 18.6667 23.3333Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link href='/search'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity={router.asPath !== '/search' ? "0.5" : ""}>
                                <circle cx="15.6888" cy="15.6888" r="11.9847" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M24.0244 24.6468L28.7231 29.3333" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;