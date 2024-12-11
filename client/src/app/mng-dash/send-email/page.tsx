import React from "react";
import EmailInterface from "../../components/EmailInterface";

function SendEmail() {
  return (
    <>
      <div className="pt-[104px] min-h-screen flex items-center justify-center bg-gray-200">
        <EmailInterface />
      </div>
    </>
  );
}

export default SendEmail;
