import { NextResponse } from "next/server"

const supabaseUrl = "https://hqxcqhxjwqaonxeojvtt.supabase.co"
const bucketName = "Videos" // Videos bucket

interface VideoFile {
  filename: string
  title: string
  thumbnail?: string
}

// Manually list video filenames and their details
const videoFiles: VideoFile[] = [
  {
    filename: '01 AKAN_compressed.mp4',
    title: 'Akan - Balance Conference',
  },
  {
    filename: '01 Emina_compressed.mp4',
    title: 'Emina - Balance Conference',
  },
  {
    filename: '01 MARIJA_compressed.mp4',
    title: 'Marija - Balance Conference',
  },
  {
    filename: '01 Naida_compressed.mp4',
    title: 'Naida - Balance Conference',
  },
  {
    filename: '01 Nedim_compressed.mp4',
    title: 'Nedim - Balance Conference',
  },
  {
    filename: '01 NICK_compressed.mp4',
    title: 'Nick - Balance Conference',
  },
  {
    filename: '01 Vildana_compressed.mp4',
    title: 'Vildana - Balance Conference',
  },
  {
    filename: 'BILGIN2_compressed.mp4',
    title: 'Bilgin - Balance Conference',
  },
  {
    filename: 'EDINA3_compressed.mp4',
    title: 'Edina - Balance Conference',
  },
  {
    filename: 'ELIF1_compressed.mp4',
    title: 'Elif - Balance Conference',
  },
  {
    filename: 'IRMAConference_compressed.mp4',
    title: 'Irma Pilav - Balance Conference',
  },
  {
    filename: 'MAJA3_compressed.mp4',
    title: 'Maja - Balance Conference',
  },
  {
    filename: 'SETA3_compressed.mp4',
    title: 'Seta - Balance Conference',
  },
]

export async function GET() {
  try {
    // Create array of video objects
    const videos = videoFiles.map((video, index) => {
      const encodedFilename = encodeURIComponent(video.filename)
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${encodedFilename}`
      const thumbnailUrl = video.thumbnail
        ? `${supabaseUrl}/storage/v1/object/public/${bucketName}/${encodeURIComponent(video.thumbnail)}`
        : undefined

      return {
        id: video.filename,
        url: publicUrl,
        thumbnail: thumbnailUrl,
        title: video.title || `Video ${index + 1}`,
      }
    })

    return NextResponse.json(videos)
  } catch (error) {
    console.error("Error reading video gallery:", error)
    return NextResponse.json({ error: "Failed to load video gallery" }, { status: 500 })
  }
}
