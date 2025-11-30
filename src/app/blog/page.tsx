'use client';

import { BlogSection, type BlogPost } from '@/components/ui/blog-section';
import { TopNavigation } from '@/components/blocks/top-navigation';
import { HoverFooter } from '@/components/ui/hover-footer';
import DarkVeil from '@/components/ui/dark-veil';
import GradualBlur from '@/components/ui/gradual-blur';

// Example: Custom blog posts
const customBlogs: BlogPost[] = [
	{
		title: 'Lessons from Balance Conference 2025',
		slug: '/blog/balance-conference-2025',
		description:
			'Key takeaways from our most transformative conference yet, featuring insights on mindfulness, leadership, and personal growth.',
		image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
		createdAt: '2025-08-25',
		author: 'Conference Team',
		readTime: '8 min read',
	},
	{
		title: 'Speaker Spotlight: Leading with Authenticity',
		slug: '/blog/speaker-spotlight',
		description:
			'Meet the thought leaders who are reshaping how we think about balance, wellbeing, and sustainable success.',
		image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
		createdAt: '2025-07-20',
		author: 'Editorial Team',
		readTime: '6 min read',
	},
	{
		title: 'Building a Balanced Life: A Comprehensive Guide',
		slug: '/blog/balanced-life-guide',
		description:
			'Your complete roadmap to achieving work-life harmony, from setting boundaries to practicing mindfulness.',
		image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
		createdAt: '2025-07-05',
		author: 'Wellness Experts',
		readTime: '12 min read',
	},
];

export default function BlogPage() {
	return (
		<>
			{/* GradualBlur effect */}
			<GradualBlur
				target="page"
				position="bottom"
				height="12rem"
				strength={0.3}
				divCount={4}
				opacity={1}
				zIndex={1000}
				responsive={true}
				mobileHeight="0rem"
			/>

			<TopNavigation scrollThreshold={9999999999} />

			{/* DarkVeil background */}
			<div
				className="fixed inset-0 z-[1] pointer-events-none"
				style={{ width: '100vw', height: '100vh' }}
			>
				<DarkVeil
					hueShift={0}
					noiseIntensity={0.0}
					scanlineIntensity={0.5}
					speed={1.75}
					scanlineFrequency={1.25}
					warpAmount={0.5}
					resolutionScale={1}
				/>
			</div>

			{/* Hero Section */}
			<section
				style={{
					backgroundColor: 'rgba(10, 3, 27, 0.5)',
					backdropFilter: 'blur(12px)',
				}}
				className="w-full relative z-10 pt-40 pb-24"
			>
				<div className="mx-auto max-w-7xl px-6 text-center">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
						Insights & Stories
					</h1>
					<p className="text-xl md:text-2xl text-balance-200 max-w-3xl mx-auto">
						Discover the latest perspectives on balance, wellness, and personal growth from our community
					</p>
				</div>
			</section>

			{/* Featured Articles */}
			<section
				className="relative z-10 py-16"
				style={{
					backgroundColor: 'rgba(10, 3, 27, 0.5)',
					backdropFilter: 'blur(12px)',
				}}
			>
				<BlogSection
					heading="Featured Articles"
					description="Explore our most impactful insights on balance, wellness, and personal growth."
					desktopColumns={3}
					tabletColumns={2}
					mobileColumns={1}
					maxPosts={12}
				/>
			</section>

			{/* Conference Highlights */}
			<section
				className="relative z-10 py-16"
				style={{
					backgroundColor: 'rgba(10, 3, 27, 0.7)',
					backdropFilter: 'blur(12px)',
				}}
			>
				<BlogSection
					blogs={customBlogs}
					heading="Conference Highlights"
					description="Behind-the-scenes stories and key takeaways from Balance Conference events."
					desktopColumns={3}
					tabletColumns={2}
					mobileColumns={1}
					maxPosts={3}
					showBackground={false}
				/>
			</section>

			<HoverFooter />
		</>
	);
}

