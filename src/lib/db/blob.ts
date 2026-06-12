export function canUseBlob(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL)
  );
}

export function getBlobOptions() {
  const options: { storeId?: string; token?: string } = {};
  if (process.env.BLOB_STORE_ID) options.storeId = process.env.BLOB_STORE_ID;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    options.token = process.env.BLOB_READ_WRITE_TOKEN;
  }
  return options;
}
