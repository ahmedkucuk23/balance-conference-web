# Sponsor Logos

This folder contains sponsor/partner logos for Balance Conference.

## How to add logos:

1. Save your logo files in this folder (`/public/sponsors/`)
2. Name them: `partner1.png`, `partner2.png`, `partner3.png`, etc.
3. Supported formats: PNG, JPG, SVG
4. Recommended: Use PNG with transparent background for best results
5. Recommended size: At least 300x150px

## Update the component:

After adding logos, update the sponsors list in:
`/src/components/blocks/sponsors-logos.tsx`

Example:
```tsx
const sponsors: Sponsor[] = [
  {
    name: "Company Name",
    logo: "/sponsors/partner1.png",
    url: "https://company-website.com"
  },
  // Add more...
]
```
