import React, { useState } from 'react';
import '../css/Dashboard.css'; // Assuming your CSS file is named Dashboard.css
import { useAuth } from '../AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import JSTConfigComponent from './JSTConfigComponent.jsx';
import PdfReaderComponent from './PdfReaderComponent.jsx'; // 引入PDF Reader组件
import logo from '../assets/logo192.png'; // 调用公共目录下的 logo192.png

const Dashboard = () => {
    const { cleanToken } = useAuth();
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState('JSTConfig'); // 用于跟踪当前选中的功能
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // 用于控制侧边栏的显示和隐藏

    const doLogout = () => {
        cleanToken();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <aside className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                </div>
                <ul className="menu">
                    <li>
                        <button onClick={() => setActiveComponent('JSTConfig')}>
                            JST CONFIG
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveComponent('PDFReader')}>
                            PDF READER
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveComponent('Feature3')}>
                            功能3
                        </button>
                    </li>
                </ul>
            </aside>
            <section className={`content ${isSidebarVisible ? 'with-sidebar' : 'without-sidebar'}`}>
                <header className="header">
                    <button className="toggle-sidebar-btn" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button className="logout" onClick={doLogout}>
                        Logout
                    </button>
                </header>
                <main className="main-content">
                    {activeComponent === 'JSTConfig' && <JSTConfigComponent />}
                    {activeComponent === 'PDFReader' && <PdfReaderComponent />} {/* 根据 activeComponent 的值渲染PDF Reader组件 */}
                    {/* {activeComponent === 'Feature3' && <Feature3Component />} */}
                </main>
            </section>
        </div>
    );
};

export default Dashboard;