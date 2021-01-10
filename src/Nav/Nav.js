import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className="navigation">
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
    )
}