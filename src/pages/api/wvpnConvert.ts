import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

type ConvertRequest = {
  url: string;
  mode: 'encode';
  key?: string;
  iv?: string;
  institution?: string;
};

type ConvertResponse = {
  result?: string;
  error?: string;
};

// 工具函数：安全获取缓冲区
const getSafeBuffer = (value: string, minSize: number = 16): Buffer => {
  const buffer = Buffer.from(value);
  
  // 检查长度并填充
  if (buffer.length < minSize) {
    const padded = Buffer.concat([
      buffer,
      Buffer.alloc(minSize - buffer.length)
    ]);
    return padded;
  }
  
  // 检查长度并截断
  if (buffer.length > minSize) {
    return buffer.subarray(0, minSize);
  }
  
  return buffer;
};

// 加密函数
const getCiphertext = (plaintext: string, key: Buffer, iv: Buffer): string => {
  try {
    const cipher = crypto.createCipheriv('aes-128-cfb', key, iv);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  } catch (error) {
    throw new Error(`加密失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
};

// 解密函数
const getPlaintext = (ciphertext: string, key: Buffer, iv: Buffer): string => {
  try {
    const decipher = crypto.createDecipheriv('aes-128-cfb', key, iv);
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    throw new Error(`解密失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
};

// 普通URL转WebVPN URL
const getVPNUrl = (url: string, institution: string, key: Buffer, iv: Buffer): string => {
  try {
    const urlPattern = /^(https?):\/\/([^\/]+)(\/.*)?$/;
    const match = url.match(urlPattern);
    
    if (!match) throw new Error('无效的URL格式');
    
    const [, protocol, host] = match;
    const [domain, port] = host.split(':');
    
    const ciphertext = getCiphertext(domain, key, iv);
    const keyHex = Buffer.from(iv).toString('hex');
    
    const portSuffix = port ? `-${port}` : '';
    const path = match[3] || '';
    
    return `https://${institution}/${protocol}${portSuffix}/${keyHex}${ciphertext}${path}`;
  } catch (error) {
    throw new Error(`WebVPN转换错误: ${error instanceof Error ? error.message : '未知错误'}`);
  }
};

// WebVPN URL转普通URL
const getOrdinaryUrl = (url: string, key: Buffer, iv: Buffer): string => {
  try {
    const pattern = /^https?:\/\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([a-f0-9]{32})([a-f0-9]+)(\/.*)?$/;
    const match = url.match(pattern);
    
    if (!match) throw new Error('无效的WebVPN URL格式');
    
    const [, institution, protocolWithPort, , keyCiphertext, ciphertext, path] = match;
    
    // 处理协议和端口
    let protocol: string, port = '';
    if (protocolWithPort.includes('-')) {
      [protocol, port] = protocolWithPort.split('-');
      port = `:${port}`;
    } else {
      protocol = protocolWithPort;
    }
    
    // 解密主机名
    const hostname = getPlaintext(ciphertext, key, iv);
    
    return `${protocol}://${hostname}${port}${path || '/'}`;
  } catch (error) {
    throw new Error(`普通URL转换错误: ${error instanceof Error ? error.message : '未知错误'}`);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConvertResponse>
) {
  // 确保仅处理POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持POST请求' });
  }

  try {
    const { url, mode, key, iv, institution }: ConvertRequest = req.body;
    
    // 验证必需参数
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: '缺少URL参数' });
    }
    
    if (!mode || !['encode', 'decode'].includes(mode)) {
      return res.status(400).json({ error: '无效模式（仅支持 encode/decode）' });
    }

    // 设置默认值并安全创建Buffer
    const DEFAULT_KEY = 'wrdvpnisthebest!';
    const DEFAULT_IV = 'wrdvpnisthebest!';
    const DEFAULT_INST = 'wvpn.buu.edu.cn';
    
    const cryptoKey = getSafeBuffer(key || DEFAULT_KEY, 16);
    const cryptoIv = getSafeBuffer(iv || DEFAULT_IV, 16);
    
    // 处理编码请求
    if (mode === 'encode') {
      const result = getVPNUrl(
        url,
        institution || DEFAULT_INST,
        cryptoKey,
        cryptoIv
      );
      return res.status(200).json({ result });
    } 
    
    // 处理解码请求
    if (mode === 'decode') {
      const result = getOrdinaryUrl(url, cryptoKey, cryptoIv);
      return res.status(200).json({ result });
    }
    
    // 理论上不会执行到这里
    return res.status(400).json({ error: '无效操作模式' });
    
  } catch (error: any) {
    // 确保错误处理中也有返回响应
    const message = error instanceof Error ? error.message : '未知错误';
    return res.status(400).json({ error: message });
  }
}