export function getBaseUrl() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (!BASE_URL) {
    console.error("NEXT_PUBLIC_BASE_URL is missing");
    console.log(process.env.NEXT_PUBLIC_BASE_URL);

    return "";
  }

  return BASE_URL;
}
