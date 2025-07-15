// libs/media/src/watermark.service.ts
async applyInvisibleWatermark(media: Buffer): Promise<Buffer> {
  return steganography.encode(media, {
    ownerId: 'socialpass',
    creationDate: new Date().toISOString()
  });
}