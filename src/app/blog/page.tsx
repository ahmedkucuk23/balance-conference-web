'use client';

import { BlogSection, type BlogPost } from '@/components/ui/blog-section';
import { TopNavigation } from '@/components/blocks/top-navigation';
import { HoverFooter } from '@/components/ui/hover-footer';
import DarkVeil from '@/components/ui/dark-veil';
import GradualBlur from '@/components/ui/gradual-blur';

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

			<HoverFooter />
		</>
	);
}

