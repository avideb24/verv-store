/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "iili.io",
            },
             {
                protocol: "https",
                hostname: "fakestoreapi.com",
            },
        ],
    },
};

export default nextConfig;
