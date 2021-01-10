import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className="navigation">
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    Spending
                </li>
                <li>
                    Transactions
                </li>
                <li>
                    Stats
                </li>
                <li>
                    Accounts
                </li>
            </ul>
        </nav>
    )
}