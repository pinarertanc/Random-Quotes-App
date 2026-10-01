
export async function fetchBookCover(title: string, author?: string): Promise<string | null> {
  try {
    const query = encodeURIComponent(`intitle:${title}${author ? `+inauthor:${author}` : ""}`);
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
    const data = await res.json();

    if (data.items && data.items.length > 0) {
      const imageLinks = data.items[0].volumeInfo?.imageLinks;
      // Google Books kapak linkleri genelde http gelir, https'e çeviriyoruz
      const coverUrl = imageLinks?.thumbnail || imageLinks?.smallThumbnail;
      return coverUrl ? coverUrl.replace("http://", "https://") : null;
    }
  } catch (error) {
    console.error("Error fetching book cover:", error);
  }
  return null;
}