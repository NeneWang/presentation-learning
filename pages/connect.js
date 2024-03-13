
import React from "react";
import Layout from "@/components/Layout";

export default function Connect() {

    return(
        <Layout>

        <div>
            <h1>Connect with people going through the same problems as you</h1>
            <p>Help us find the appropriate people by completing this google form</p>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeQP-f0W0Fr7T3w_NQpGmx6z26aZ1dMY3VBSgmNsrA66PLQvQ/viewform" frameborder="0"
            height={1000} width={"100%"}
            ></iframe>
        </div>
        </Layout>
    )
}



