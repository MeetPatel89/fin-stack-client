import React from 'react';

export default function Header(props) {
   
    return (
        <>
            <header className="logo">
                <h1 className="main-heading">
                    <Link to="/">
                        FinStack
                    </Link>
                </h1>
            </header>
        </>
    )
}