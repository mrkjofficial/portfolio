// Next.js special file: generates /sitemap.xml for search engines.
// The site is a single page, so the sitemap lists only the home page.
const sitemap = () => {
	return [
		{
			url: process.env.NEXT_PUBLIC_URL as string,
			// Set to the build time, since content only changes when the site is redeployed.
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
	];
};

export default sitemap;
