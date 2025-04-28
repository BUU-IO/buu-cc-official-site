import Image from "next/image";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Copyright © 2015-{currentYear} 北京联合大学计算机社 版权所有
          </p>
          <p className="text-sm text-gray-400">
            感谢北京辰帆科技有限公司与北京熵擎科技有限公司为本社团提供的资金和服务器支持！
          </p>
          <Image
            src="https://www.horain.net/logo/HoRain-White-100.png"
            alt="Sponsor Logo"
            width={175}
            height={39}
            className="mx-auto mt-4"
          />
          <Image
            src="SengineTechLogo.svg"
            alt="Sponsor Logo"
            width={175}
            height={39}
            className="mx-auto mt-4"
          />
        </div>
      </div>
    </footer>
  );
}
