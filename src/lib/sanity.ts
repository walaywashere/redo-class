import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/types'

// Check if we have a valid Sanity configuration
const hasValidSanityConfig = !!(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here'
)

// Configuration for the Sanity client
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // Set to false if you need real-time data
}

// Create the client only if we have valid configuration
const client = hasValidSanityConfig ? createClient(config) : null

// Alternative configuration for server-side operations with read token
export const serverClient = hasValidSanityConfig ? createClient({
  ...config,
  useCdn: false, // Disable CDN for server-side operations
  token: process.env.SANITY_API_READ_TOKEN, // Optional read token for private content
}) : null

// Set up the image URL builder only if client exists
const builder = client ? imageUrlBuilder(client) : null

// Export the configured client (can be null)
export default client

// Utility function to get image URL with transformations
export function urlFor(source: SanityImage) {
  if (!source?.asset?._ref || !builder) {
    return null
  }
  return builder.image(source)
}

// Utility function to get image URL with specific dimensions
export function getImageUrl(source: SanityImage, width = 800, height = 600): string {
  if (!source?.asset?._ref || !builder) {
    return '/placeholder-image.jpg' // Fallback image
  }
  
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit('crop')
    .format('webp')
    .url()
}

// Utility function to get optimized image URLs for different sizes
export function getResponsiveImageUrls(source: SanityImage) {
  if (!source?.asset?._ref || !builder) {
    return {
      small: '/placeholder-image.jpg',
      medium: '/placeholder-image.jpg',
      large: '/placeholder-image.jpg',
    }
  }
  
  return {
    small: builder.image(source).width(400).height(300).fit('crop').format('webp').url(),
    medium: builder.image(source).width(800).height(600).fit('crop').format('webp').url(),
    large: builder.image(source).width(1200).height(800).fit('crop').format('webp').url(),
  }
}

// Helper function for fetching data with error handling
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client || !hasValidSanityConfig) {
    console.log('Sanity client not configured, skipping fetch')
    return null
  }

  try {
    const data = await client.fetch<T>(query, params)
    return data
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}

// Helper function for server-side fetching with token
export async function sanityServerFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!serverClient || !hasValidSanityConfig) {
    console.log('Sanity server client not configured, skipping fetch')
    return null
  }

  try {
    const data = await serverClient.fetch<T>(query, params)
    return data
  } catch (error) {
    console.error('Sanity server fetch error:', error)
    return null
  }
}

// Export configuration status for components to check
export { hasValidSanityConfig } 