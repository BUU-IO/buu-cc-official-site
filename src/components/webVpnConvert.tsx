"use client";
import styles  from './About.module.css';
import React, { useState, useRef } from 'react';
import axios, { AxiosError } from 'axios';

export default function WebVpnConvert() {
  // 状态管理
  const [protocol, setProtocol] = useState<'http' | 'https'>('https');
  const [url, setUrl] = useState('');
  const mode = 'encode';
  const key = 'wrdvpnisthebest!';
  const iv = 'wrdvpnisthebest!';
  const institution = 'wvpn.buu.edu.cn';
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false); // 新增：复制状态
  
  // 使用 ref 存储计时器，以便在组件卸载时清除
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // 预处理URL - 添加协议前缀
    let processedUrl = url.trim();
    
    // 检查用户是否已经输入协议
    const hasProtocol = processedUrl.startsWith('http://') || processedUrl.startsWith('https://');
    
    // 如果用户没有输入协议，添加选择的协议
    if (!hasProtocol) {
      processedUrl = `${protocol}://${processedUrl}`;
    }
    
    try {
      const response = await axios.post<{ result?: string; error?: string }>('/api/wvpnConvert', {
        url: processedUrl,
        mode,
        key,
        iv,
        institution
      });
      
      if (response.data.error) {
        setError(response.data.error);
      } else if (response.data.result) {
        setResult(response.data.result);
      }
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      setError(error.response?.data?.error || '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 复制到剪贴板函数
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      
      // 清除之前的计时器（如果有）
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      
      // 设置新的计时器，3秒后重置复制状态
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null;
      }, 3000);
    } catch (err) {
      setError('复制失败，请手动复制');
    }
  };

  // 在组件卸载时清除计时器
  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.bannerContainer}>
      <h1 className="text-2xl font-bold mb-6 text-center">WebVPN URL地址转换器</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 协议选择 */}
        <div className="flex items-center mb-2">
          <span className="mr-3">选择协议:</span>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={protocol === 'http'}
                onChange={() => setProtocol('http')}
                className="mr-2"
              />
              HTTP
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={protocol === 'https'}
                onChange={() => setProtocol('https')}
                className="mr-2"
              />
              HTTPS
            </label>
          </div>
        </div>
        
        {/* URL 输入框 */}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="请输入URL"
          className="w-full p-2 border rounded-md"
        />
        
        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? '正在处理中' : '开始转换'}
        </button>
      </form>
      
      {/* 显示结果 */}
      {error && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {result && !error && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">转换结果:</h2>
          <div className="p-3 bg-gray-100 rounded-md overflow-x-auto">
            <a 
              href={result} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 break-all"
            >
              {result}
            </a>
          </div>
          
          {/* 复制按钮和提示 */}
          <div className="relative">
            <button
              onClick={handleCopy}
              className="mt-2 py-1 px-3 bg-blue-600 rounded-md hover:bg-blue-700 text-white"
            >
              {copied ? '✓ 已复制' : '复制到剪贴板'}
            </button>
            
            {/* 复制成功提示 */}
            {copied && (
              <div className="absolute bottom-full left-0 mb-2 bg-green-500 text-white px-3 py-1 rounded-md text-sm animate-fadeInOut">
                已复制到剪贴板！
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}