const sitemap = () => {
	return [
		{
			url: process.env.NEXT_PUBLIC_URL as string,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
	];
};

export default sitemap;
