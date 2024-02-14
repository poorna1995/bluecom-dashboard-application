import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Skeleton, Divider } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import { useRouter } from "next/router";
import React from "react";
import NewStoreDisableIntegrationDialog from "./NewStoreDisableIntegrationDialog";
import NewStoreDetailsDataCard from "./NewStoreDetailsDataCard";

const styles = {
  background: "#F8F8F8",
  p: 2,
  px: "36px",
  display: "flex",
  flex: 1,
  mt: 0,
  "& .icon": {
    mr: 1.5,
    "&:hover": {
      color: "#4f44e0",
      transition: "all 0.3s ease-in-out",
    },
    "& .icon-button": {
      borderRadius: "4px",
      // background: "#E5E4F4",
      p: 0.7,
      border: "1px solid #f1f1f1 ",
      "&:hover": {
        borderRadius: "4px",
        background: "#E5E4F4",
        border: "0.5px solid #958FEC",
        color: "white",
        transition: "all 0.3s ease-in-out",
      },
    },
  },
  "& .store-content": {
    flex: 1,
    "& h3": {
      my: 0,
      color: "#4F44E0",
      fontSize: "24px",
      fontWeight: 700,
    },
  },

  "& .controls": {
    display: "flex",
    gap: 2,
    alignItems: "start",
  },
  "& .primary-chip": {
    borderRadius: " 30px",
    background: " linear-gradient(0deg, #E59537 0%, #E59537 100%), #4F44E0",
    display: "flex",
    alignItems: "center",
    color: "#FFF",
    fontSize: " 14px",
    fontWeight: 600,
    p: "8px 12px",
    ml: 2,
    "& svg": {
      mr: 0.6,
    },
  },
  "& .row": {
    display: "flex",
    mb: 1,
  },
  "& .status-chip": {
    // display: flex;
    padding: "10px 12px",
    // gap: 10px;
    color: "#0E955C",
    fontSize: "14px",
    fontWeight: 600,
    borderRadius: "30px",
    background: "rgba(102, 212, 107, 0.20)",
    // mt: 1,
  },
  "& .store-id": {
    color: "#313131",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "22px",
  },
};
export default function NewStoreDetailsHeader({
  storeName,
  status,
  isPrimary,
  isLoading,
  storeData,
  catalogData,
  isCardsLoading,
  userId,
  handleFetchStoreDetails,
}) {
  const router = useRouter();
  const {
    query: { storeId },
  } = router;
  const handleBack = () => {
    router.push("/home");
  };

  console.log("***", { catalogData });
  // const [openDisableIntegrationDialog, setOpenDisableIntegrationDialog] =
  //   React.useState(false);
  // const handleOpenDisableIntegrationDialog = () => {
  //   setOpenDisableIntegrationDialog(true);
  // };
  // const handleCloseDisableIntegrationDialog = () => {
  //   setOpenDisableIntegrationDialog(false);
  // };
  // const handleDisableIntegration = () => {};
  // const handleSyncAll = () => {};

  const cardsData = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13.1002 2.10156L3.20115 3.51656L1.78715 13.4166L10.9792 22.6086C11.1667 22.796 11.421 22.9013 11.6862 22.9013C11.9513 22.9013 12.2056 22.796 12.3932 22.6086L22.2932 12.7086C22.4806 12.521 22.5859 12.2667 22.5859 12.0016C22.5859 11.7364 22.4806 11.4821 22.2932 11.2946L13.1002 2.10156ZM12.3932 4.22356L20.1722 12.0016L11.6862 20.4866L3.90815 12.7086L4.96815 5.28356L12.3932 4.22356ZM10.2732 10.5876C10.6483 10.2123 10.859 9.70334 10.8589 9.17271C10.8589 8.90997 10.8071 8.6498 10.7065 8.40708C10.6059 8.16435 10.4585 7.94382 10.2727 7.75806C10.0868 7.57231 9.86624 7.42497 9.62348 7.32447C9.38072 7.22396 9.12054 7.17226 8.8578 7.1723C8.32716 7.1724 7.8183 7.38328 7.44315 7.75856C7.068 8.13384 6.8573 8.64278 6.85739 9.17342C6.85748 9.70405 7.06837 10.2129 7.44365 10.5881C7.81893 10.9632 8.32787 11.1739 8.8585 11.1738C9.38914 11.1737 9.898 10.9628 10.2732 10.5876Z"
            fill="#4F44E0"
          />
        </svg>
      ),
      title: "Products Listings",
      count: catalogData.products,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 13.242V20H22V22H2V20H3V13.242C2.38437 12.8311 1.87971 12.2745 1.53082 11.6218C1.18193 10.969 0.999592 10.2402 1 9.5C1 8.673 1.224 7.876 1.633 7.197L4.345 2.5C4.43277 2.34798 4.559 2.22175 4.71101 2.13398C4.86303 2.04621 5.03547 2 5.211 2H18.79C18.9655 2 19.138 2.04621 19.29 2.13398C19.442 2.22175 19.5682 2.34798 19.656 2.5L22.358 7.182C22.9546 8.17287 23.1463 9.35553 22.8934 10.4841C22.6405 11.6127 21.9624 12.6005 21 13.242ZM19 13.972C18.3124 14.0491 17.6163 13.9665 16.9659 13.7307C16.3155 13.4948 15.7283 13.1119 15.25 12.612C14.8302 13.0511 14.3258 13.4005 13.7672 13.6393C13.2086 13.878 12.6075 14.001 12 14.001C11.3927 14.0013 10.7916 13.8786 10.233 13.6402C9.67445 13.4018 9.16996 13.0527 8.75 12.614C8.27163 13.1138 7.68437 13.4964 7.03395 13.7321C6.38353 13.9678 5.68749 14.0503 5 13.973V20H19V13.973V13.972ZM5.789 4L3.356 8.213C3.11958 8.79714 3.11248 9.44903 3.33613 10.0382C3.55978 10.6273 3.99768 11.1103 4.56218 11.3904C5.12668 11.6705 5.77614 11.7271 6.38058 11.5488C6.98502 11.3706 7.49984 10.9706 7.822 10.429C8.157 9.592 9.342 9.592 9.678 10.429C9.8633 10.8934 10.1836 11.2916 10.5975 11.5721C11.0115 11.8526 11.5 12.0025 12 12.0025C12.5 12.0025 12.9885 11.8526 13.4025 11.5721C13.8164 11.2916 14.1367 10.8934 14.322 10.429C14.657 9.592 15.842 9.592 16.178 10.429C16.3078 10.7484 16.5022 11.0376 16.7491 11.2783C16.996 11.519 17.2901 11.706 17.6127 11.8275C17.9354 11.9491 18.2797 12.0026 18.6241 11.9847C18.9684 11.9668 19.3053 11.8778 19.6136 11.7234C19.9219 11.569 20.1949 11.3525 20.4155 11.0875C20.6361 10.8225 20.7995 10.5148 20.8955 10.1836C20.9914 9.85238 21.0178 9.50493 20.973 9.16305C20.9281 8.82118 20.8131 8.49227 20.635 8.197L18.21 4H5.79H5.789Z"
            fill="#4F44E0"
          />
        </svg>
      ),
      title: "Location Connections",
      count: catalogData.locations,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 20V8.7C2.71667 8.51667 2.479 8.28334 2.287 8C2.095 7.71667 1.99934 7.38334 2 7V4C2 3.45 2.196 2.979 2.588 2.587C2.98 2.195 3.45067 1.99934 4 2H20C20.55 2 21.021 2.196 21.413 2.588C21.805 2.98 22.0007 3.45067 22 4V7C22 7.38334 21.904 7.71667 21.712 8C21.52 8.28334 21.2827 8.51667 21 8.7V20C21 20.55 20.804 21.021 20.412 21.413C20.02 21.805 19.5493 22.0007 19 22H5C4.45 22 3.979 21.804 3.587 21.412C3.195 21.02 2.99934 20.5493 3 20ZM5 9V20H19V9H5ZM20 7V4H4V7H20ZM9 14H15V12H9V14Z"
            fill="#4F44E0"
          />
        </svg>
      ),
      title: "Inventory On hand",
      count: catalogData.inventory,
    },
  ];

  return (
    <Box
      sx={{
        ...styles,
      }}
    >
      <div className="icon">
        <IconButton onClick={handleBack} className="icon-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10 6L11.4 7.45L7.85 11H20V13H7.85L11.4 16.55L10 18L4 12L10 6Z"
              fill="#101828"
            />
          </svg>
        </IconButton>
      </div>
      <div className="store-content">
        <div className="row">
          {isLoading ? (
            <Skeleton width={200} height={48} />
          ) : (
            <h3>
              {storeName || "Shopify"}{" "}
              <IconButton
                className="link-icon"
                onClick={() => window.open(storeData.store_url)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M7.05392 9.91089C7.99809 8.96672 9.64476 8.96672 10.5889 9.91089L11.1781 10.5001L12.3564 9.32172L11.7673 8.73255C10.9814 7.94589 9.93476 7.51172 8.82142 7.51172C7.70809 7.51172 6.66142 7.94589 5.87559 8.73255L4.10725 10.5001C3.3275 11.2823 2.88965 12.3418 2.88965 13.4463C2.88965 14.5508 3.3275 15.6103 4.10725 16.3926C4.49382 16.7797 4.95306 17.0866 5.4586 17.2957C5.96414 17.5047 6.50602 17.6119 7.05309 17.6109C7.60031 17.612 8.14235 17.505 8.64805 17.2959C9.15375 17.0868 9.61312 16.7798 9.99976 16.3926L10.5889 15.8034L9.41059 14.6251L8.82142 15.2142C8.35181 15.6817 7.71615 15.9442 7.05351 15.9442C6.39086 15.9442 5.7552 15.6817 5.28559 15.2142C4.81767 14.7448 4.55493 14.1091 4.55493 13.4463C4.55493 12.7835 4.81767 12.1478 5.28559 11.6784L7.05392 9.91089Z"
                    fill="#404040"
                  />
                  <path
                    d="M10.8674 4.60892L10.2782 5.19809L11.4566 6.37642L12.0457 5.78725C12.5154 5.31974 13.151 5.05728 13.8137 5.05728C14.4763 5.05728 15.112 5.31974 15.5816 5.78725C16.0495 6.25664 16.3122 6.89239 16.3122 7.55517C16.3122 8.21795 16.0495 8.85369 15.5816 9.32309L13.8132 11.0906C12.8691 12.0348 11.2224 12.0348 10.2782 11.0906L9.68908 10.5014L8.51074 11.6798L9.09991 12.2689C9.88574 13.0556 10.9324 13.4898 12.0457 13.4898C13.1591 13.4898 14.2057 13.0556 14.9916 12.2689L16.7599 10.5014C17.5397 9.71916 17.9775 8.65968 17.9775 7.55517C17.9775 6.45065 17.5397 5.39118 16.7599 4.60892C15.9779 3.82876 14.9183 3.39062 13.8137 3.39062C12.709 3.39063 11.6495 3.82876 10.8674 4.60892Z"
                    fill="#404040"
                  />
                </svg>
              </IconButton>
            </h3>
          )}{" "}
          {isPrimary && (
            <div className="primary-chip">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99956 11.5145L10.7662 13.1878C11.2729 13.4945 11.8929 13.0411 11.7596 12.4678L11.0262 9.32115L13.4729 7.20115C13.9196 6.81448 13.6796 6.08115 13.0929 6.03448L9.87289 5.76115L8.61289 2.78781C8.38623 2.24781 7.61289 2.24781 7.38623 2.78781L6.12623 5.75448L2.90623 6.02781C2.31956 6.07448 2.07956 6.80781 2.52623 7.19448L4.97289 9.31448L4.23956 12.4611C4.10623 13.0345 4.72623 13.4878 5.23289 13.1811L7.99956 11.5145Z"
                  fill="white"
                />
              </svg>
              Primary
            </div>
          )}
        </div>
        {!isLoading && (
          <span className="status-chip">
            {storeData.is_connected ? "Connected" : "Not Connected"}
          </span>
        )}{" "}
        {isLoading ? (
          <Skeleton width={200} height={36} />
        ) : (
          <p className="store-id">Store ID: {storeId}</p>
        )}
      </div>

      <div className="row">
        {cardsData.map((item) => (
          <>
            <NewStoreDetailsDataCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              count={item.count}
              isLoading={isCardsLoading}
            />
            {/* <Divider orientation="vertical" flexItem /> */}
          </>
        ))}
      </div>

      {/* {isLoading ? (
        <Skeleton width={200} height={48} />
      ) : (
        <div className="controls">
          <SecondaryButton onClick={handleOpenDisableIntegrationDialog}>
            Disable Integration
          </SecondaryButton>
          <PrimaryButton onClick={handleSyncAll}>Sync all</PrimaryButton>
        </div>
      )} */}
      {/* <NewStoreDisableIntegrationDialog
        open={openDisableIntegrationDialog}
        handleClose={handleCloseDisableIntegrationDialog}
        handleProceedButton={handleDisableIntegration}
      /> */}
    </Box>
  );
}
