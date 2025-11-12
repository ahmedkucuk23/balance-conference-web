# Blog Section Component

A fully responsive, reusable blog section component with lazy-loaded images and configurable grid layouts.

## ✅ Installation Complete

All dependencies have been installed and components have been created:

### Created Files:
- ✅ `/src/components/ui/aspect-ratio.tsx` - Radix UI aspect ratio component
- ✅ `/src/components/ui/lazy-image.tsx` - Lazy loading image component with skeleton
- ✅ `/src/components/ui/blog-section.tsx` - Main reusable blog section component
- ✅ `/src/app/blog/page.tsx` - Demo page with examples

### Installed Dependencies:
- ✅ `@radix-ui/react-aspect-ratio` - Aspect ratio primitive
- ✅ `framer-motion` (already installed) - Animation and lazy loading
- ✅ `@radix-ui/react-slot` (already installed) - Composition primitive
- ✅ `class-variance-authority` (already installed) - CVA for variants

### Navigation Updated:
- ✅ Added "Blog" link to desktop navigation
- ✅ Added "Blog" link to mobile navigation

## 🎨 Features

- **Responsive Grid Layout**: Configurable columns for mobile, tablet, and desktop
- **Lazy Loading Images**: Images load only when in viewport with skeleton placeholders
- **Image Fallbacks**: Automatic fallback to placeholder if image fails to load
- **Smooth Animations**: Scale on hover with smooth transitions
- **Real Unsplash Images**: Pre-configured with actual Balance Conference themed images
- **Fully Typed**: Complete TypeScript support
- **Customizable**: Props for heading, description, columns, and more

## 📖 Usage

### Basic Usage (Default)

```tsx
import { BlogSection } from '@/components/ui/blog-section';

export default function Page() {
  return <BlogSection />;
}
```

This will render a blog grid with:
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop
- Default blog posts with Balance Conference content

### Custom Column Configuration

```tsx
<BlogSection
  mobileColumns={1}
  tabletColumns={2}
  desktopColumns={4}
/>
```

### Custom Blog Posts

```tsx
import { BlogSection, type BlogPost } from '@/components/ui/blog-section';

const customBlogs: BlogPost[] = [
  {
    title: 'My Custom Blog Post',
    slug: '/blog/custom-post',
    description: 'A detailed description of the blog post...',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    createdAt: '2025-08-25',
    author: 'John Doe',
    readTime: '5 min read',
  },
  // ... more posts
];

<BlogSection blogs={customBlogs} />
```

### Custom Heading & Description

```tsx
<BlogSection
  heading="Latest Articles"
  description="Explore our collection of insights and stories."
/>
```

### Without Background Effect

```tsx
<BlogSection showBackground={false} />
```

### Full Example with All Props

```tsx
<BlogSection
  blogs={customBlogs}
  mobileColumns={1}
  tabletColumns={2}
  desktopColumns={3}
  heading="Featured Articles"
  description="Our most popular content about balance and wellbeing."
  containerClassName="max-w-6xl"
  showBackground={true}
/>
```

## 🔧 Props Reference

### BlogSectionProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blogs` | `BlogPost[]` | Default posts | Array of blog posts to display |
| `mobileColumns` | `1 \| 2` | `1` | Number of columns on mobile |
| `tabletColumns` | `1 \| 2 \| 3` | `2` | Number of columns on tablet (md) |
| `desktopColumns` | `1 \| 2 \| 3 \| 4` | `3` | Number of columns on desktop (lg) |
| `heading` | `string` | `'Blog Section'` | Section heading text |
| `description` | `string` | Default text | Section description text |
| `containerClassName` | `string` | - | Additional container classes |
| `showBackground` | `boolean` | `true` | Show decorative background |

### BlogPost Type

```typescript
interface BlogPost {
  title: string;           // Post title
  slug: string;            // URL path (e.g., '/blog/post-slug')
  description: string;     // Short description (clamped to 3 lines)
  image: string;          // Image URL (Unsplash recommended)
  createdAt: string;      // Date string (e.g., '2025-08-25')
  author: string;         // Author name
  readTime: string;       // Reading time (e.g., '5 min read')
}
```

## 🖼️ Image Guidelines

### Recommended Image Sources:
- **Unsplash**: `https://images.unsplash.com/photo-[id]?w=800&h=600&fit=crop`
- **Aspect Ratio**: 16:9 (automatically handled by LazyImage)
- **Dimensions**: 800x600 minimum for quality

### Example Unsplash URLs:
```tsx
'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop'
'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop'
```

## 📱 Responsive Behavior

The component automatically adjusts based on screen size:

| Breakpoint | Default Columns | Configurable |
|------------|----------------|--------------|
| Mobile (`< 768px`) | 1 | 1-2 |
| Tablet (`768px - 1024px`) | 2 | 1-3 |
| Desktop (`> 1024px`) | 3 | 1-4 |

## 🎯 Integration with Your Theme

The component uses your existing design system:

### Colors Used:
- `text-foreground` - Main heading
- `text-muted-foreground` - Description, metadata
- `hover:bg-accent/60` - Card hover state
- `bg-accent/30` - Image skeleton

### Fonts Used:
- `font-mono` - Heading
- `font-semibold` - Post titles
- Default font for body text

## 🔗 Demo Page

Visit `/blog` to see live examples with:
- 3-column grid (default)
- Custom blog posts
- 4-column grid example
- Different styling variations

## 🧩 Component Dependencies

### LazyImage Component
Handles image lazy loading with:
- Intersection Observer via `framer-motion`
- Skeleton loading state
- Automatic fallback handling
- Optimized loading priority

### AspectRatio Component
- Maintains 16:9 aspect ratio
- Responsive image containers
- Radix UI primitive

## 🚀 Performance Features

1. **Lazy Loading**: Images only load when in viewport
2. **Skeleton States**: Smooth loading experience
3. **Image Caching**: Handles cached images instantly
4. **Optimized Rendering**: Only re-renders on hover/load

## 🎨 Customization Examples

### Dark Mode Section

```tsx
<section className="bg-[#0A031B] py-16">
  <BlogSection
    heading="Latest Insights"
    description="Balance Conference community stories"
    showBackground={false}
  />
</section>
```

### Wide Layout (4 Columns)

```tsx
<div className="max-w-[1400px] mx-auto">
  <BlogSection
    desktopColumns={4}
    containerClassName="max-w-[1400px]"
  />
</div>
```

### Compact Mobile (2 Columns)

```tsx
<BlogSection
  mobileColumns={2}
  tabletColumns={3}
  desktopColumns={4}
/>
```

## 🐛 Troubleshooting

### Images not loading?
- Check Unsplash URL format: `?w=800&h=600&fit=crop`
- Ensure fallback URL is set
- Verify image URL is accessible

### Columns not changing?
- Check Tailwind classes are generating
- Verify responsive breakpoints match your config
- Use browser DevTools to inspect grid classes

### Skeleton showing too long?
- Check network speed
- Verify image URLs are correct
- Ensure `inView={true}` prop is set on LazyImage

## 📦 Export & Import

```tsx
// Export from blog-section.tsx
export { BlogSection, type BlogPost }

// Import in your component
import { BlogSection, type BlogPost } from '@/components/ui/blog-section'
```

## 🎯 Next Steps

1. **Add more blog posts**: Update the `blogs` array or create a CMS integration
2. **Create individual blog pages**: Add routes for each `slug`
3. **Add filtering**: Implement category/tag filtering
4. **Add search**: Create a search functionality
5. **Add pagination**: Load more posts dynamically

---

## Example Usage in About Page

You can also integrate the BlogSection into existing pages:

```tsx
// In src/app/about/page.tsx
import { BlogSection } from '@/components/ui/blog-section'

export default function AboutPage() {
  return (
    <>
      {/* ... other sections ... */}
      
      <section className="relative z-10 py-16">
        <BlogSection
          heading="Related Articles"
          description="Learn more about balance and wellbeing"
          desktopColumns={3}
        />
      </section>
      
      {/* ... footer ... */}
    </>
  )
}
```

---

**Component Created**: ✅  
**Dependencies Installed**: ✅  
**Navigation Updated**: ✅  
**Demo Page Created**: ✅  
**Documentation**: ✅

You're ready to use the BlogSection component! 🎉

