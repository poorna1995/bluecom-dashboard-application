export default function updatePageData({ currentPage, data = [] }) {
  // do pagination here
  // we have 100 items in inventoryData,
  // we want to show 10 items per page and break the array on every 10 items

  let itemsToShow = 10;
  let pageData = [];

  let activePage = Number(currentPage >= 1) ? Number(currentPage - 1) : 0;
  pageData =
    Array.isArray(data) &&
    data.slice(activePage * itemsToShow, (activePage + 1) * itemsToShow);

  return pageData;
}
