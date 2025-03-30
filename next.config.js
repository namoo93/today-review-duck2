/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	reactStrictMode: true,
	images: {
		domains: ['mylittlereviewduck.site'], // 허용할 도메인 목록을 지정
		formats: ["image/avif", "image/webp"],  // 최신이미지 포멧 지원
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
		],
	}
};

module.exports = nextConfig;