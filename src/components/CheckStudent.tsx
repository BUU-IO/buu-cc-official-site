"use client"
import React, { useState } from 'react';
import styles  from './CheckStudent.module.css';
import axios from 'axios';

// 表单数据类型
interface FormData {
  name: string;
  gender: string;
  grade: string;
  college: string;
}

// API响应类型
interface ApiResponse {
  exists: boolean;
  message?: string;
  details?: Record<string, unknown>;
}

// 学院选项
const colleges = [
  "管理学院", "师范学院", "智慧城市学院", 
  "城市轨道交通与物流学院", "北联大俄交大联合交通学院", 
  "机器人学院", "旅游学院", "商务学院", "艺术学院", 
  "生物化学工程学院", "特殊教育学院", 
  "应用科技学院", "应用文理学院"
];

export default function NameCheckPage() {
  // 表单状态
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    grade: '',
    college: ''
  });
  
  // 请求状态
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState('');

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证姓名
    if (!formData.name.trim()) {
      setError('姓名不能为空');
      return;
    }
    
    setError('');
    setApiResponse(null);
    setLoading(true);
    
    try {
      // 使用axios发送请求
      const response = await axios.post<ApiResponse>(
        '/python_api/check_name', 
        {
          name: formData.name,
          ...(formData.gender && { gender: formData.gender }),
          ...(formData.grade && { grade: formData.grade }),
          ...(formData.college && { college: formData.college })
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
          },
        }
      );

      setApiResponse(response.data);
    } catch (err) {
      let errorMessage = '请求失败';
      
      // 更详细的错误处理
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // 服务器返回了响应但状态码不在2xx范围内
          errorMessage = `服务器错误: ${err.response.status}`;
          // 如果服务器有返回错误信息
          if (err.response.data && (err.response.data.message || err.response.data.error)) {
            errorMessage += ` - ${err.response.data.message || err.response.data.error}`;
          }
        } else if (err.request) {
          // 请求已发出但没有收到响应
          errorMessage = '请求已发送但未收到响应';
        } else {
          // 请求设置时发生的错误
          errorMessage = `请求设置错误: ${err.message}`;
        }
      } else {
        // 非axios错误的常规错误
        errorMessage = `未知错误: ${(err as Error).message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.bannerContainer}>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md mx-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            学生信息验证
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-md">
              <strong>错误:</strong> {error}
            </div>
          )}
          
          <div className="space-y-4">
            {/* 姓名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                姓名 *
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* 性别 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                性别
              </label>
              <div className="flex space-x-4 mt-1">
                {['男', '女'].map(gender => (
                  <label key={gender} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 年级 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                年级
              </label>
              <input
                name="grade"
                type="text"
                value={formData.grade}
                onChange={handleChange}
                placeholder="例如：2022"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* 学院 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                学院
              </label>
              <select
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">请选择学院</option>
                {colleges.map(college => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 提交按钮 */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  提交中...
                </>
              ) : '验证信息'}
            </button>
          </div>
        </form>

        {/* API响应展示 - 根据exists字段显示不同信息 */}
        {apiResponse && (
          <div className="mt-8">
            <div className={`p-4 rounded-md mb-4 ${
              apiResponse.exists 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <div className="flex items-center">
                <svg 
                  className={`h-5 w-5 mr-2 ${apiResponse.exists ? 'text-green-500' : 'text-blue-500'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  {apiResponse.exists ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  )}
                </svg>
                <span className="font-medium">
                  {apiResponse.exists 
                    ? '该学生信息已存在' 
                    : '未找到匹配的学生信息'}
                </span>
              </div>
              
              {/* 显示服务器返回的额外信息 */}
              {apiResponse.message && (
                <p className="mt-2 text-sm">
                  {apiResponse.message}
                </p>
              )}
            </div>

            {/* 详细响应数据（开发者模式） */}
            {/* <details className="border border-gray-200 rounded-md overflow-hidden">
              <summary className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer">
                API 响应详情
              </summary>
              <pre className="p-4 bg-gray-100 text-sm overflow-x-auto">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </details> */}
          </div>
        )}
      </div>
    </div>
  );
}