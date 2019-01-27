import React from 'react';


const ErrorPage = (props) => {

const logError = (error) => {
    console.log(error)
}   
         
return (
            <div>
                <h1>OOPS! Something Went Wrong!</h1>
                <p>try again later</p>
                {logError(props.err)}
            </div>
        )
     
}

export default ErrorPage;