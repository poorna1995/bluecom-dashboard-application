import BaseCard from "components/Common/Cards/BaseCard";
import React from "react";
import { groupBy } from "lodash";
import MRTCustomTableWithDynamicGrouping from "./MRTCustomTableWithDynamicGrouping";
import CustomTableWithDynamicGrouping from "./CustomTableWithDynamicGrouping";

export default function CustomGroupedTable({
  newData = [{}],
  baseCardStyles,
  columnsData = [],
  columnGroups = [],
  handleFetchProductData = () => {},
}) {
  //   const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //   const [openDialog, setOpenDialog] = useState(false);
  //   const [dialogData, setDialogData] = useState([]);

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };
  //   const getHeaderData =
  //     (Array.isArray(newData) &&
  //       newData.length > 0 &&
  //       newData.map((item) => item)) ||
  //     [];
  // console.log({ getHeaderData });

  //   const getColumnTitles =
  //     (getHeaderData.length > 0 &&
  //       Object.keys(getHeaderData[0]) &&
  //       Object.keys(getHeaderData[0]).map((item) => item)) ||
  //     [];
  //   const getRowsData = newData.map((item) => {
  //     const { key, common, data } = item;
  //     return item;
  //   });
  //   const handleItemClick = (e, item) => {
  //     // console.log("itemClicked", { data });
  //     setOpenDialog(true);
  //     setDialogData(item);
  //   };
  //   const handleDialogClose = async () => {
  //     await setOpenDialog(false);
  //     // setDialogData([]);
  //   };

  // const mappedData =
  // get the mapped data from columnData and newData and return based on the field from columnData

  // console.log({ mappedItems });

  // const groupedData = groupBy(newData, "option_name");
  const tableData = newData.map((item) => {
    const { options } = item;
    // const mappedOptions = options.map((it) => {
    // 	return { ...item, ...it };
    // });

    const mapOptions = options.map((it) => {
      const { name, value } = it;
      return { name, value };
    });

    const groupedOptions = groupBy(mapOptions, "name");
    const mapIt = Object.entries(groupedOptions).map(([key, value]) => {
      const getVal = value.map((it) => it.value)[0];
      return { [key]: getVal };
    });
    // extract all the objects from the array and merge them into one object
    const merged = Object.assign({}, ...mapIt);
    // console.log({ merged });
    return { ...item, ...merged };
  });

  //   const mappedItems = (data) =>
  //     data.map((item) => {
  //       const {} = item;
  //       const mappedData = columnsData.map((it) => {
  //         const { field } = it;
  //         // console.log({ it });
  //         if (field === "item_display_image")
  //           return (
  //             <AppImage
  //               src={item[field]}
  //               alt={item[field]}
  //               height="40"
  //               width="40"
  //             />
  //           );

  //         return item[field];
  //       });
  //       // console.log({ mappedData });
  //       return mappedData;
  //     });
  //   const groupByKey = (key) => groupBy(tableData, key);
  // const groupTableData = groupBy(tableData, "Color");
  //   const gotData = groupByKey("Size");
  //   const mappedGotData = Object.entries(gotData).map(([key, value]) => {
  //     return { key, value };
  //   });
  // console.log({ mappedGotData });
  // console.log({ tableData: groupByKey("Size") });
  // const flattenDeepData = newData
  // 	.map((item) => {
  // 		const { option_name, option_value } = item;
  // 		const values = option_value.map((it) => {
  // 			return { ...item, option: it };
  // 		});

  // 		const groupByKey = groupBy(values, "option");
  // 		return {
  // 			// ...item,
  // 			value: groupByKey["AMD"],
  // 			// [values]: values,
  // 		};
  // 		// return groupBy(option_value);
  // 		// return
  // 		// return option_value;
  // 	})
  // 	.filter((item) => item.value);

  // const groupItemsByProcessor = groupBy(flattenDeepData, "AMD");

  // console.log({ flattenDeepData, groupItemsByProcessor });
  // console.log({ getHeaderData, getColumnTitles, newData });
  //   const [collapsed, setCollapsed] = useState(false);
  //   const GROUP_BY_FIELDS = ["Size", "Color", "Material", "Style"];

  //   const groupedItems = GROUP_BY_FIELDS.map((item) => {
  //     const groupByKey = groupBy(tableData, item);
  //     const mappedData = Object.entries(groupByKey).map(([key, value]) => {
  //       return { key, value };
  //     });
  //     return groupByKey;
  //   });
  // console.log({ groupedItems });

  return (
    <BaseCard sx={baseCardStyles}>
      <CustomTableWithDynamicGrouping
        columnsData={columnsData}
        tableData={tableData}
        columnGroups={columnGroups}
        handleFetchProductData={handleFetchProductData}
        // updateData={updateData}
      />
      {/* <MRTCustomTableWithDynamicGrouping
        columnsData={columnsData}
        tableData={tableData}
        columnGroups={columnGroups}
        handleSaveRow={handleSaveRow}
        handleSaveCell={handleSaveCell}
        handleFetchProductData={handleFetchProductData}
      /> */}
      {/* <TableContainer>
				<Table>
					<TableHead sx={tableHeadRowStyles}>
						<TableRow>
							{selectable && (
								<TableCell
									sx={{
										maxWidth: "50px",
									}}
								>
									<Checkbox />
								</TableCell>
							)}
							<TableCell>{`    	`}</TableCell>
							{columnsData.map((item, index) => (
								<TableCell
									key={index}
									sx={{
										minWidth: "200",
										fontWeight: 700,
										textAlign: "center",
									}}
								>
									{item.headerName}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.entries(groupByKey("Size")).map(
							([key, value]) => {
								return (
									<Row
										key={key}
										rowTitle={key}
										values={mappedItems(value)}
										columnsData={columnsData}
									/>
								);
							},
						)} */}
      {/* {Object.entries(groupByKey("Size")).map(
							([key, value]) => {
								return (
									<>
										<TableRow
											sx={{
												"& > *": {
													// borderBottom: "unset",
												},
											}}
										>
											<TableCell>
												<IconButton
													aria-label="expand row"
													size="small"
													onClick={() =>
														setCollapsed(!collapsed)
													}
												>
													{collapsed ? (
														<KeyboardArrowUpIcon />
													) : (
														<KeyboardArrowDownIcon />
													)}
												</IconButton>
											</TableCell>
											<TableCell colSpan={12}>
												{key}
											</TableCell>
											{columnsData
												.slice(0, columnsData.at(-1))
												.map((item, index) => {
													return (
														<TableCell
															key={index}
														/>
													);
												})}
										</TableRow>
										<TableRow key={key}>
											<TableCell
												colSpan={12}
												style={{
													paddingBottom: 0,
													paddingTop: 0,
												}}
											>
												{/* {key} 
												<Collapse in={collapsed}>
													<Table>
														{/* <TableHead
															sx={
																tableHeadRowStyles
															}
														>
															<TableRow>
																{selectable && (
																	<TableCell
																		sx={{
																			maxWidth:
																				"50px",
																		}}
																	>
																		<Checkbox />
																	</TableCell>
																)}
																{columnsData.map(
																	(
																		item,
																		index,
																	) => (
																		<TableCell
																			key={
																				index
																			}
																			sx={{
																				minWidth:
																					"200",
																				fontWeight: 700,
																				textAlign:
																					"center",
																			}}
																		>
																			{
																				item.headerName
																			}
																		</TableCell>
																	),
																)}
															</TableRow>
														</TableHead> 
														<TableBody>
															{/* {newData} 

															{mappedItems(value)
																// .slice(
																// 	page * rowsPerPage,
																// 	page * rowsPerPage +
																// 		rowsPerPage,
																// )

																.map(
																	(
																		item,
																		index,
																	) => {
																		return (
																			<TableRow
																				key={
																					index
																				}
																				onClick={(
																					e,
																				) =>
																					handleItemClick(
																						e,
																						item,
																					)
																				}
																			>
																				<TableCell />
																				{Object.values(
																					item,
																				).map(
																					(
																						obj,
																						index,
																					) => (
																						<TableCell
																							key={
																								index
																							}
																							sx={{
																								minWidth:
																									"auto",
																								textAlign:
																									"center",
																							}}
																						>
																							{
																								obj
																							}
																						</TableCell>
																					),
																				)}
																			</TableRow>
																		);
																	},
																)}
														</TableBody>
													</Table>
												</Collapse>
											</TableCell>
										</TableRow>
									</>
								);
							},
						)} */}
      {/* </TableBody>
				</Table>
			</TableContainer> */}

      {/* {Array.isArray(newData) && newData.length > rowsPerPage && (
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 100]}
					component="div"
					count={newData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)} */}
      {/* <BaseDialog
				open={openDialog}
				handleClose={() => handleDialogClose()}
			>
				<DialogChildComponent dialogData={dialogData} />
			</BaseDialog> */}
    </BaseCard>
  );
}

// function Row({ rowTitle, values, columnsData }) {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow
//       // sx={{ "& > *": { borderBottom: "unset" } }}
//       >
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {rowTitle}
//         </TableCell>
//         {columnsData.slice(0, columnsData.at(-1)).map((item, index) => {
//           return <TableCell key={index} component="th" scope="row" />;
//         })}
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <>
//               <CollapsedRow values={values} />
//               {/* <Table size="small" aria-label="purchases">
// 								<TableBody>
// 									{values.map((item, index) => (
// 										<TableRow
// 											key={index}
// 											// onClick={(e) =>
// 											// 	handleItemClick(e, item)
// 											// }
// 											sx={{
// 												"& > *": {
// 													borderBottom: "unset",
// 												},
// 											}}
// 										>
// 											<TableCell />

// 											{Object.values(item).map(
// 												(obj, index) => (
// 													<TableCell
// 														key={index}
// 														sx={{
// 															minWidth: "auto",
// 															textAlign: "center",
// 														}}
// 													>
// 														{obj}
// 													</TableCell>
// 												),
// 											)}
// 										</TableRow>
// 									))}
// 								</TableBody>
// 							</Table> */}
//             </>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// const CollapsedRow = ({ values }) => {
//   return (
//     <Table size="small" aria-label="purchases">
//       <TableBody>
//         {values.map((item, index) => (
//           <TableRow
//             key={index}
//             // onClick={(e) =>
//             // 	handleItemClick(e, item)
//             // }
//             sx={{
//               "& > *": {
//                 borderBottom: "unset",
//               },
//             }}
//           >
//             <TableCell />

//             {Object.values(item).map((obj, index) => (
//               <TableCell
//                 key={index}
//                 sx={{
//                   minWidth: "auto",
//                   textAlign: "center",
//                 }}
//               >
//                 {obj}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };
