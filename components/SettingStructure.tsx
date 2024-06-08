import React, { Fragment } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

// import MUI
import { Grid, Button } from "@mui/material";

const SettingStructure = () => {

    const route = useRouter();

    const handleLogOut = () => {
        deleteCookie('token');
        route.push('/');
    }

    return (
        <Fragment>

            <Link href='#' className="info-style d-felx mt-5 flex-row align-items-center justify-content-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.3341 2.75011H7.66512C4.64412 2.75011 2.75012 4.88911 2.75012 7.91611V16.0841C2.75012 19.1111 4.63512 21.2501 7.66512 21.2501H16.3331C19.3641 21.2501 21.2501 19.1111 21.2501 16.0841V7.91611C21.2501 4.88911 19.3641 2.75011 16.3341 2.75011Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.9948 16.0001V12.0001" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.9899 8.2043H11.9999" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ms-2">Info</span>
            </Link>
            <Link href='#' className="account-style mt-5 d-felx flex-row align-items-center justify-content-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9847 15.3462C8.11713 15.3462 4.81427 15.931 4.81427 18.2729C4.81427 20.6148 8.09617 21.2205 11.9847 21.2205C15.8524 21.2205 19.1543 20.6348 19.1543 18.2938C19.1543 15.9529 15.8733 15.3462 11.9847 15.3462Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9848 12.0059C14.5229 12.0059 16.58 9.94782 16.58 7.40972C16.58 4.87163 14.5229 2.81448 11.9848 2.81448C9.44667 2.81448 7.38858 4.87163 7.38858 7.40972C7.38001 9.93925 9.42382 11.9973 11.9524 12.0059H11.9848Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <span className="ms-2">Account</span>
            </Link>
            <Link href='#' className="account-style mt-5 d-felx flex-row align-items-center justify-content-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9847 15.3462C8.11713 15.3462 4.81427 15.931 4.81427 18.2729C4.81427 20.6148 8.09617 21.2205 11.9847 21.2205C15.8524 21.2205 19.1543 20.6348 19.1543 18.2938C19.1543 15.9529 15.8733 15.3462 11.9847 15.3462Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9848 12.0059C14.5229 12.0059 16.58 9.94782 16.58 7.40972C16.58 4.87163 14.5229 2.81448 11.9848 2.81448C9.44667 2.81448 7.38858 4.87163 7.38858 7.40972C7.38001 9.93925 9.42382 11.9973 11.9524 12.0059H11.9848Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <span className="ms-2">Preferences</span>
            </Link>

            <Grid container spacing={1} display='flex' alignItems='center' justifyContent='space-between' flexDirection='row'>
                <Grid item xs={6}>
                    <Link href='#' className="security-style mt-5 d-felx flex-row align-items-center justify-content-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.3341 2.7501H7.66509C4.64409 2.7501 2.75009 4.8891 2.75009 7.9161V16.0841C2.75009 19.1111 4.63509 21.2501 7.66509 21.2501H16.3331C19.3641 21.2501 21.2501 19.1111 21.2501 16.0841V7.9161C21.2501 4.8891 19.3641 2.7501 16.3341 2.7501Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.6891 12.0001C10.6891 13.0231 9.86008 13.8521 8.83708 13.8521C7.81408 13.8521 6.98508 13.0231 6.98508 12.0001C6.98508 10.9771 7.81408 10.1481 8.83708 10.1481H8.84008C9.86108 10.1491 10.6891 10.9781 10.6891 12.0001Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.692 12.0001H17.01V13.8521" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.1818 13.8522V12.0002" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="ms-2">Security</span>
                    </Link>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleLogOut} className="logout-style mt-5 d-felx flex-row align-items-center justify-content-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.016 7.3895V6.4565C15.016 4.4215 13.366 2.7715 11.331 2.7715H6.45597C4.42197 2.7715 2.77197 4.4215 2.77197 6.4565V17.5865C2.77197 19.6215 4.42197 21.2715 6.45597 21.2715H11.341C13.37 21.2715 15.016 19.6265 15.016 17.5975V16.6545" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21.8095 12.0214H9.76849" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.8812 9.1063L21.8092 12.0213L18.8812 14.9373" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="ms-2">LogOut</span>
                    </Button>
                </Grid>
            </Grid>

        </Fragment>
    )
}

export default SettingStructure;