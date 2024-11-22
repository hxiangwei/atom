import React, { useState } from 'react';
import { useAuth } from '../AuthContext.jsx';
import '../css/JSTConfigComponent.css'; // 确保 CSS 文件被导入

const JSTConfigComponent = () => {
  const { token } = useAuth();
  const [yamlData, setYamlData] = useState('');
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const fetchData = async endpoint => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await fetch(`http://localhost:8080/${endpoint}`, {
        headers,
      });
      if (response.ok) {
        const text = await response.text();
        setYamlData(text);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(yamlData);
      setShowCopySuccess(true); // 显示提示
      setTimeout(() => {
        setShowCopySuccess(false); // 一秒后隐藏提示
      }, 1000);
    } catch (err) {
      console.error('无法复制内容', err);
    }
  };

  return (
    <div className="config-container">
      <div className="buttons">
        <button className="btn" onClick={() => fetchData('sjst')}>
          UPDATE
        </button>
        <button className="btn" onClick={() => fetchData('jst')}>
          GET CACHE
        </button>
        <button className="btn" onClick={copyToClipboard}>
          COPY
        </button>
        {showCopySuccess && (
          <div className="copy-success-message">内容已复制到剪贴板</div>
        )}
      </div>
      <textarea className="yaml-display" value={yamlData} readOnly />
    </div>
  );
};

export default JSTConfigComponent;
