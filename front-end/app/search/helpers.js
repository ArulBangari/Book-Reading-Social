export function getURL(title, author, page, searchItems) {
  let searchQuery = "https://openlibrary.org/search.json?";
  if (title) {
    searchQuery += `title=${encodeURIComponent(title)}&`;
  }
  if (author) {
    searchQuery += `author=${encodeURIComponent(author)}&`;
  }
  if (page) {
    searchQuery += `page=${encodeURIComponent(page)}&`;
  }
  return searchQuery + `limit=${searchItems}`;
}
