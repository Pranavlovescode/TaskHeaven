"use client"

import React, {useEffect,useState} from 'react';

type AdminData={
    token:string,
    adminDetails:object,
    loginTimeDetails:object
}

export default function Page() {
    const [data, setData] = useState<AdminData>({
        token:"",
        adminDetails:null,
        loginTimeDetails:null
    })
    useEffect(()=>{
        setData({
            token:JSON.parse(localStorage.getItem("user"))!.token,
            adminDetails:JSON.parse(localStorage.getItem("user"))!.adminDetails,
            loginTimeDetails:JSON.parse(localStorage.getItem("user"))!.loginTimeDetails
        });
    },[])
    return (
        <div className={"pt-6"}>{data.loginTimeDetails ? data.loginTimeDetails.time_id : 'Loading...'}</div>
    );
}
