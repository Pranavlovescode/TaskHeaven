import React from 'react';
import Page from "@/app/components/page";

const Admin = ({children}:any) => {
    return (
        <>
            <Page/>
            <main>{children}</main>
        </>
    );
};

export default Admin;
