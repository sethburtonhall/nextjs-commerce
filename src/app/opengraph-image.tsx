import OpengraphImage from '@/components/opengraph-image';

// This disables static generation warning since it's expected for OpenGraph images
export const runtime = 'edge';

export default async function Image() {
  return await OpengraphImage();
}
