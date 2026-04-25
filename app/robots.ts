const robots = () => {
	return {
		rules: { allow: ["/"], userAgent: "*" },
		sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
	};
};

export default robots;
