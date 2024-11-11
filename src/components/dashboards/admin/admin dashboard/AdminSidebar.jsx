import React from 'react'
import { Link } from 'react-router-dom'
import './AdminSidebar.css'

export default function AdminSidebar() {
    return (
        <div className="admin-sidebar">
            <nav>
                <ul className="sidebar-list">
                <li>
                    <Link to="/admin/products">Products</Link>
                </li>
                <li>
                    <Link to="/admin/users">Users</Link>
                </li>
                <li>
                    <Link to="/admin/orders">Orders</Link>
                </li>
                </ul>
            </nav>
        </div>
    )
}
