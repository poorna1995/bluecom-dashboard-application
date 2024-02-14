# MRBaseTable

The `MRBaseTable` function is a React function that renders a table. The function takes the following props:

- `tableData`: This prop specifies the data to be rendered in the table.
- `columnsData`: This prop specifies the columns to be rendered in the table.
- `renderEmptyRowsFallback`: This prop specifies a function to be called when there are no rows to be rendered in the table.
- `enableBottomToolbar`: This prop specifies whether or not to show the bottom toolbar.
- `muiTableFooterRowProps`: This prop specifies the props to be applied to the bottom toolbar row.

The function returns a `<MaterialReactTable>` component with the following props:

- `columns`: This prop specifies the columns to be rendered in the table.
- `data`: This prop specifies the data to be rendered in the table.
- `muiTablePaperProps`: This prop specifies the props to be applied to the table paper.
- `initialState`: This prop specifies the initial state of the table.
- `enableColumnResizing`: This prop specifies whether or not to allow users to resize the columns.
- `enableColumnActions`: This prop specifies whether or not to show the column actions.
- `enableColumnFilters`: This prop specifies whether or not to show the column filters.
- `enablePagination`: This prop specifies whether or not to show the pagination.
- `enableSorting`: This prop specifies whether or not to show the sorting.
- `muiTableContainerProps`: This prop specifies the props to be applied to the table container.
- `enableBottomToolbar`: This prop specifies whether or not to show the bottom toolbar.
- `enableTopToolbar`: This prop specifies whether or not to show the top toolbar.
- `muiTableBodyRowProps`: This prop specifies the props to be applied to the table body rows.
- `renderEmptyRowsFallback`: This prop specifies a function to be called when there are no rows to be rendered in the table.
- `muiTableHeadCellProps`: This prop specifies the props to be applied to the table head cells.
- `muiTableFooterRowProps`: This prop specifies the props to be applied to the table footer row.
- `muiTablePaginationProps`: This prop specifies the props to be applied to the table pagination.

The `MRBaseTable` function can be used to render tables in a consistent way.
