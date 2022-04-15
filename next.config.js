/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['s3-eu-west-1.amazonaws.com'],
	},
	env: {
		CTP_PROJECT_KEY: process.env.CTP_PROJECT_KEY,
		CTP_CLIENT_SECRET: process.env.CTP_CLIENT_SECRET,
		CTP_CLIENT_ID: process.env.CTP_CLIENT_ID,
		CTP_AUTH_URL: process.env.CTP_AUTH_URL,
		CTP_API_URL: process.env.CTP_API_URL,
		CTP_SCOPES: process.env.CTP_SCOPES,
	},
};

module.exports = nextConfig;
