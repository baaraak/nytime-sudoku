const NYTIMES_PUZZLES_URL_BYPASS_CORS = `https://api.allorigins.win/get?url=${encodeURIComponent(
  'https://www.nytimes.com/puzzles/sudoku/easy'
)}`;

export async function NYTimesScraper() {
  const response = await fetch(NYTIMES_PUZZLES_URL_BYPASS_CORS);
  const html = await response.json();
  // TODO: find better way to scrape the boards
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(html.contents, 'text/html');
  const data = JSON.parse(
    htmlDoc.scripts[0].innerHTML.replace('window.gameData = ', '')
  );
  return data;
}
