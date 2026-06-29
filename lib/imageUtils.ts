export function getProductImageUrl(imagePath: string): string {
  // If it's already a full URL (online image)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a local image path
  if (imagePath.startsWith('/images/') || imagePath.startsWith('images/')) {
    // For local images, you might want to serve them from your app
    // or upload them to Supabase Storage
    return imagePath;
  }

  // If it's a Supabase storage path
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/product-images/${imagePath}`;
}

// Function to upload local images to Supabase during seeding
export async function uploadLocalImageToSupabase(
  localPath: string,
  productId: string,
  isMain: boolean = true
): Promise<string> {
  // If it's already a URL, return it
  if (localPath.startsWith('http://') || localPath.startsWith('https://')) {
    return localPath;
  }

  // If it's a data URL (base64), handle it
  if (localPath.startsWith('data:image')) {
    // You might want to upload base64 images to Supabase
    // This would require converting base64 to file
    return localPath;
  }

  // For local file paths, we'll keep them as is
  // In a real app, you'd upload these to Supabase Storage
  return localPath;
}