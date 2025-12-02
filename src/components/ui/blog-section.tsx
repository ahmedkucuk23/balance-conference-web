'use client';

import React from 'react';
import Link from 'next/link';
import { LazyImage } from './lazy-image';
import { cn } from '@/lib/utils';

export interface BlogPost {
	title: string;
	slug: string;
	description: string;
	image: string;
	createdAt: string;
	author: string;
	readTime: string;
}

interface BlogSectionProps {
	/** Array of blog posts to display */
	blogs?: BlogPost[];
	/** Maximum number of posts to display (default: 3) */
	maxPosts?: number;
	/** Number of columns on mobile (default: 1) */
	mobileColumns?: 1 | 2;
	/** Number of columns on tablet (default: 2) */
	tabletColumns?: 1 | 2 | 3;
	/** Number of columns on desktop (default: 3) */
	desktopColumns?: 1 | 2 | 3 | 4;
	/** Custom heading (default: 'Blog Section') */
	heading?: string;
	/** Custom description (default: 'Discover the latest trends and insights...') */
	description?: string;
	/** Custom container className */
	containerClassName?: string;
	/** Whether to show the decorative background (default: true) */
	showBackground?: boolean;
}

const defaultBlogs: BlogPost[] = [
	{
		title: 'Finding Balance in a Fast-Paced World',
		slug: 'finding-balance-in-a-fast-paced-world',
		description:
			'Learn how to maintain mental and physical wellbeing while navigating the demands of modern life. Discover practical strategies for sustainable success.',
		image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
		createdAt: '2025-08-25',
		author: 'Ava Mitchell',
		readTime: '7 min read',
	},
	{
		title: 'The Psychology of Mindfulness',
		slug: 'the-psychology-of-mindfulness',
		description:
			'Explore how mindfulness practices influence mental health, emotional regulation, and overall wellbeing in our daily lives.',
		image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
		createdAt: '2025-07-14',
		author: 'Liam Carter',
		readTime: '5 min read',
	},
];

const getGridColsClass = (cols?: number) => {
	switch (cols) {
		case 1:
			return 'grid-cols-1';
		case 2:
			return 'grid-cols-2';
		case 3:
			return 'grid-cols-3';
		case 4:
			return 'grid-cols-4';
		default:
			return 'grid-cols-1';
	}
};

export function BlogSection({
	blogs = defaultBlogs,
	maxPosts = 3,
	mobileColumns = 1,
	tabletColumns = 2,
	desktopColumns = 3,
	heading = 'Blog Section',
	description = 'Discover the latest trends and insights in the world of design and technology.',
	containerClassName,
	showBackground = true,
}: BlogSectionProps) {
	// Limit the number of blogs displayed
	const displayedBlogs = blogs.slice(0, maxPosts);

	const gridClasses = cn(
		'grid p-4 gap-4 z-10',
		getGridColsClass(mobileColumns),
		`md:${getGridColsClass(tabletColumns)}`,
		`lg:${getGridColsClass(desktopColumns)}`,
	);

	return (
		<div className={cn('mx-auto w-full max-w-7xl grow', containerClassName)}>
			<div className="space-y-4 px-4 py-12">
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
					{heading}
				</h1>
				<p className="text-balance-100 text-lg">{description}</p>
			</div>
			<div className={gridClasses}>
				{displayedBlogs.map((blog) => (
					<Link
						key={blog.title}
						href={`/blog/${blog.slug}`}
						className="flex flex-col gap-3 rounded-xl overflow-hidden bg-[#0A031B]/40 backdrop-blur-xl border border-balance-200/10 transition-all duration-300 hover:border-balance-300/30 hover:bg-[#0A031B]/60 group"
					>
						<LazyImage
							src={blog.image}
							fallback="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop"
							inView={true}
							alt={blog.title}
							ratio={16 / 9}
							className="transition-all duration-500 group-hover:scale-105"
							AspectRatioClassName="rounded-none border-0"
						/>
						<div className="space-y-3 px-4 pb-4">
							<div className="text-balance-200 flex items-center gap-2 text-xs">
								<p>by {blog.author}</p>
								<div className="bg-balance-300 size-1 rounded-full" />
								<p>{blog.createdAt}</p>
								<div className="bg-balance-300 size-1 rounded-full" />
								<p>{blog.readTime}</p>
							</div>
							<h2 className="line-clamp-2 text-xl leading-tight font-semibold tracking-tight text-white group-hover:text-accent-gold transition-colors">
								{blog.title}
							</h2>
							<p className="text-balance-100 line-clamp-3 text-sm leading-relaxed">
								{blog.description}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

