'use client';

import React from 'react';
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
		slug: '#',
		description:
			'Learn how to maintain mental and physical wellbeing while navigating the demands of modern life. Discover practical strategies for sustainable success.',
		image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
		createdAt: '2025-08-25',
		author: 'Ava Mitchell',
		readTime: '7 min read',
	},
	{
		title: 'The Psychology of Mindfulness',
		slug: '#',
		description:
			'Explore how mindfulness practices influence mental health, emotional regulation, and overall wellbeing in our daily lives.',
		image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
		createdAt: '2025-07-14',
		author: 'Liam Carter',
		readTime: '5 min read',
	},
	{
		title: 'Building Resilience Through Connection',
		slug: '#',
		description:
			'Discover how meaningful connections and community support can enhance your resilience and create lasting positive change.',
		image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
		createdAt: '2025-06-30',
		author: 'Sophia Kim',
		readTime: '6 min read',
	},
	{
		title: 'Wellness Beyond the Basics',
		slug: '#',
		description:
			'Practical steps to elevate your wellness routine, from nutrition and movement to mental health and purpose-driven living.',
		image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop',
		createdAt: '2025-06-18',
		author: 'Ethan Rodriguez',
		readTime: '8 min read',
	},
	{
		title: 'The Power of Self-Reflection',
		slug: '#',
		description:
			'Tips and practices for developing a self-reflection habit that leads to personal growth and deeper self-understanding.',
		image: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&h=600&fit=crop',
		createdAt: '2025-05-20',
		author: 'Maya Chen',
		readTime: '4 min read',
	},
	{
		title: 'Leadership Through Authenticity',
		slug: '#',
		description:
			'How to lead with vulnerability, empathy, and authenticity while building trust and inspiring your team to thrive.',
		image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
		createdAt: '2025-05-02',
		author: 'Noah Patel',
		readTime: '9 min read',
	},
	{
		title: 'The Future of Work-Life Integration',
		slug: '#',
		description:
			'From remote work to flexible schedules—discover where work-life integration is headed and how to prepare for the future.',
		image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=600&fit=crop',
		createdAt: '2025-04-15',
		author: 'Chloe Ramirez',
		readTime: '10 min read',
	},
	{
		title: 'Stress Management Techniques That Work',
		slug: '#',
		description:
			'A deep dive into evidence-based stress management techniques and how to integrate them into your daily routine.',
		image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
		createdAt: '2025-04-01',
		author: 'Benjamin Scott',
		readTime: '6 min read',
	},
	{
		title: 'Creating Healthy Boundaries',
		slug: '#',
		description:
			'Best practices for setting and maintaining healthy boundaries in both personal and professional relationships.',
		image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop',
		createdAt: '2025-03-22',
		author: 'Isabella White',
		readTime: '7 min read',
	},
	{
		title: 'The Science of Happiness',
		slug: '#',
		description:
			'Research-backed insights into what makes us truly happy and how to cultivate lasting contentment in our lives.',
		image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&h=600&fit=crop',
		createdAt: '2025-03-09',
		author: 'James Walker',
		readTime: '5 min read',
	},
	{
		title: 'Navigating Change With Grace',
		slug: '#',
		description:
			'A practical look at how to embrace change, manage transitions, and emerge stronger from life\'s inevitable shifts.',
		image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
		createdAt: '2025-02-28',
		author: 'Olivia Brooks',
		readTime: '8 min read',
	},
	{
		title: 'The Art of Deep Work',
		slug: '#',
		description:
			'How to cultivate focus and productivity in a distracted world through intentional deep work practices.',
		image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
		createdAt: '2025-02-14',
		author: 'Daniel Green',
		readTime: '6 min read',
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
					<div
						key={blog.title}
						className="flex flex-col gap-3 rounded-xl overflow-hidden bg-[#0A031B]/40 backdrop-blur-xl border border-balance-200/10"
					>
						<LazyImage
							src={blog.image}
							fallback="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop"
							inView={true}
							alt={blog.title}
							ratio={16 / 9}
							className="transition-all duration-500"
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
							<h2 className="line-clamp-2 text-xl leading-tight font-semibold tracking-tight text-white">
								{blog.title}
							</h2>
							<p className="text-balance-100 line-clamp-3 text-sm leading-relaxed">
								{blog.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

