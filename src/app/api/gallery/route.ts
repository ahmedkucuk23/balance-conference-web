import { NextResponse } from "next/server"

const supabaseUrl = "https://hqxcqhxjwqaonxeojvtt.supabase.co"
const bucketName = "Gallery"

// Manually list image filenames (from your optimized gallery) - limited to 15 for homepage slider
const imageFilenames = [
  'ECP_6424.webp',
  'ECP_6426.jpg .webp',
  'ECP_6430.webp',
  'ECP_6434.webp',
  'ECP_6458.webp',
  'ECP_6493.webp',
  'ECP_6518.webp',
  'ECP_6552.webp',
  'ECP_6586.webp',
  'ECP_6589.webp',
  'ECP_6648.webp',
  'ECP_6653.webp',
  'ECP_6660.webp',
  'ECP_6661.webp',
  'ECP_6664.webp',
]

export async function GET() {
  try {
    // Create array of image objects
    const images = imageFilenames.map((filename, index) => {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filename}`
      return {
        id: `${index + 1}`,
        img: publicUrl,
        url: publicUrl,
      }
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error("Error reading gallery:", error)
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 })
  }
}
