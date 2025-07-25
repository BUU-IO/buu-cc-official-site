import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm text-center text-gray-400">
            Copyright © 2015-{currentYear} 北京联合大学计算机社 版权所有
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-400 md:text-left mb-6 md:mb-0">
            感谢北京辰帆科技有限公司与北京熵擎科技有限公司为本社团提供的资金和服务器支持！
          </p>
          <Link href="https://www.horain.net">
            <Image
              src="https://www.horain.net/logo/HoRain-White-100.png"
              alt="Sponsor Logo"
              width={175}
              height={39}
              className="mx-auto mt-4"
            />
          </Link>
          <Image
            src="../SengineTechLogo.svg"
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
