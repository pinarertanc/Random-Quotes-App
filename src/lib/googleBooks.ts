// lib/get-book-cover.ts

export async function fetchBookCover(title: string, author?: string): Promise<string | null> {
  if (!title) return null;

  // Parantez içi açıklamaları ve tırnak işaretlerini temizleyelim
  const cleanTitle = title.replace(/\(.*?\)/g, "").replace(/['"]+/g, "").trim();
  const cleanAuthor = author ? author.replace(/['"]+/g, "").trim() : "";

  try {
    // 🔍 1. Google Books API - Çok Aşamalı Deneme
    const queries = [
      cleanAuthor ? `${cleanTitle} ${cleanAuthor}` : cleanTitle,
      cleanTitle,
    ];

    for (const query of queries) {
      const googleUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`;
      const res = await fetch(googleUrl);
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        // İçinde görsel barındıran ilk sonucu bulalım
        const match = data.items.find((item: any) => item.volumeInfo?.imageLinks?.thumbnail);
        if (match) {
          let imageUrl = match.volumeInfo.imageLinks.thumbnail;
          imageUrl = imageUrl.replace("http://", "https://");
          // Yüksek çözünürlük ayarı
          imageUrl = imageUrl.replace("&zoom=1", "&zoom=0").replace("&edge=curl", "");
          return imageUrl;
        }
      }
    }

    // 🔍 2. Open Library Search Fallback
    const openLibQuery = cleanAuthor ? `${cleanTitle} ${cleanAuthor}` : cleanTitle;
    const olUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(openLibQuery)}&limit=3`;
    const olRes = await fetch(olUrl);
    const olData = await olRes.json();

    if (olData.docs && olData.docs.length > 0) {
      const docWithCover = olData.docs.find((doc: any) => doc.cover_i);
      if (docWithCover) {
        return `https://covers.openlibrary.org/b/id/${docWithCover.cover_i}-L.jpg`;
      }
    }

  } catch (error) {
    console.error("Error fetching book cover:", error);
  }

  return null;
}