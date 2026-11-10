// Next.js special file: generates /robots.txt.
// Lets every search engine crawl the whole site and points them to the sitemap.
const robots = () => {
	return {
		rules: { allow: ["/"], userAgent: "*" },
		sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
	};
};

export default robots;
