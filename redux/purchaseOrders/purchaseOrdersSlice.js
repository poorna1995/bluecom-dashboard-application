import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signOutUser } from "redux/user/userSlice";

const initialState = {
  selectedProducts: [],
  purchaseOrderData: { selectedProducts: [] },
};

export const purchaseOrdersSlice = createSlice({
  name: "purchaseOrders",
  initialState,
  reducers: {
    setSelectedProductsForPO(state, action) {
      // add only the products that are not already present in the selectedProducts array
      // filter them based on the master_item_id
      const selectedProducts = state.purchaseOrderData.selectedProducts ?? [];
      const selectedProductsFromPayload = action.payload ?? [];

      const filteredSelectedProducts = selectedProductsFromPayload.filter(
        (product) =>
          !selectedProducts.some(
            (selectedProduct) =>
              selectedProduct.master_item_id === product.master_item_id
          )
      );

      state.purchaseOrderData = {
        ...state.purchaseOrderData,
        selectedProducts: [...selectedProducts, ...filteredSelectedProducts],
      };

      // state.purchaseOrderData = {
      // 	...state.purchaseOrderData,
      // 	selectedProducts: [
      // 		...state.purchaseOrderData.selectedProducts,
      // 		...action.payload,
      // 	],
      // };
    },
    updateSelectedProductsForPO(state, action) {
      const selectedProducts = state.purchaseOrderData.selectedProducts ?? [];
      const products = action.payload ?? [];

      //    get hte filtered data form payload and update the latest product
      // const getFilteredProducts = (products, selectedProducts) => {
      // 	const filteredProducts = products.filter((product) =>
      // 		selectedProducts.some(
      // 			(selectedProduct) =>
      // 				selectedProduct.master_item_id ===
      // 				product.master_item_id,
      // 		),
      // 	);
      // 	return filteredProducts;
      // };

      // const filteredSelectedProducts = products.filter((product) =>
      // 	selectedProducts.some(
      // 		(selectedProduct) =>
      // 			selectedProduct.master_item_id ===
      // 			product.master_item_id,
      // 	),
      // );

      // console.log({ filteredSelectedProducts });
      state.purchaseOrderData = {
        ...state.purchaseOrderData,
        selectedProducts: [
          // ...selectedProducts,
          // ...filteredSelectedProducts,
          ...products,
        ],
      };
    },
    deleteSelectedProductForPO(state, action) {
      // state.purchaseOrderData.selectedProducts =
      // 	state.purchaseOrderData.selectedProducts.filter(
      // 		(product) => product.master_item_id !== action.payload,
      // 	);
      const { master_item_id, master_product_id } = action.payload;

      state.purchaseOrderData = {
        ...state.purchaseOrderData,
        selectedProducts: state.purchaseOrderData.selectedProducts.filter(
          (product) => {
            if (master_product_id) {
              return product.master_product_id !== master_product_id;
            }
            return product.master_item_id !== master_item_id;
          }
        ),
      };
    },
    setPurchaseOrderData(state, action) {
      const selectedProducts =
        (state.purchaseOrderData?.selectedProducts &&
          state.purchaseOrderData?.selectedProducts) ??
        [];
      const selectedProductsFromPayload =
        (action.payload?.products &&
          action.payload?.products.map((item, index) => ({
            ...item,
            id: item.item_id,
          }))) ??
        [];

      state.purchaseOrderData = {
        ...action.payload,
        selectedProducts: selectedProductsFromPayload ?? selectedProducts,
      };
    },
    updatePurchaseOrderData(state, action) {
      // add purchase order data to state based on the key coming from the payload
      // state.purchaseOrderData = {
      // 	...state.purchaseOrderData,
      // 	...action.payload,
      // };

      state.purchaseOrderData = {
        ...state.purchaseOrderData,
        ...action.payload,
      };
    },
    resetPurchaseOrderData(state, action) {
      state.purchaseOrderData = initialState.purchaseOrderData;
    },

    // saga actions
    fetchPurchaseOrderDataStart(state, action) {},
  },
  extraReducers: {
    [signOutUser.type]: (state, action) => {
      return initialState;
    },
    [signInUser.type]: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedProductsForPO,
  deleteSelectedProductForPO,
  updatePurchaseOrderData,
  setPurchaseOrderData,
  fetchPurchaseOrderDataStart,
  resetPurchaseOrderData,
  updateSelectedProductsForPO,
} = purchaseOrdersSlice.actions;

export default purchaseOrdersSlice.reducer;
