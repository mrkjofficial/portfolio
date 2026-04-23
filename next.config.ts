import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	productionBrowserSourceMaps: true,
	reactCompiler: true,
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
};

export default nextConfig;
