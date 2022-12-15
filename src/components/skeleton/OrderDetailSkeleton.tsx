import { Stack, Skeleton } from "@mui/material";

// order detail table skeleton
export const TableSkeleton = () => {
  return (
    <Stack direction={"column"} spacing={1} sx={{ mb: "10px" }}>
      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="40%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="40%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="40%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="40%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
        <Skeleton animation="wave" height={17} width="10%" />
      </Stack>
    </Stack>
  );
};

// order id section skeleton
export const TableBoxHeaderSkeleton = () => {
  return (
    <>
      <Skeleton animation="wave" height={17} width="15%" sx={{ mb: "10px" }} />
      <Skeleton animation="wave" height={17} width="15%" />
    </>
  );
};

// order detail calculation section skeleton
export const CalculationSectionSkeleton = () => {
  return (
    <Stack direction={"column"} spacing={2}>
      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={17} width="50%" />
        <Skeleton animation="wave" height={17} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={17} width="50%" />
        <Skeleton animation="wave" height={17} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={17} width="50%" />
        <Skeleton animation="wave" height={17} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={17} width="50%" />
        <Skeleton animation="wave" height={17} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={17} width="50%" />
        <Skeleton animation="wave" height={17} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={17} width="50%" />
        <Skeleton animation="wave" height={17} width="50%" />
      </Stack>
    </Stack>
  );
};

// delivery details section skeleton
export const OrderDeliveryDetailsSkeleton = () => {
  return (
    <Stack direction={"column"} spacing={1} sx={{ mt: "15px" }}>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", mb: "10px" }}
      >
        <Skeleton animation="wave" height={17} width="15%" />
        <Skeleton animation="wave" height={17} width="15%" />
      </Stack>

      <Stack direction={"row"} spacing={4}>
        <Skeleton animation="wave" height={17} width="15%" />
        <Skeleton animation="wave" height={17} width="45%" />
      </Stack>

      <Stack direction={"row"} spacing={4}>
        <Skeleton animation="wave" height={17} width="15%" />
        <Skeleton animation="wave" height={17} width="45%" />
      </Stack>

      <Stack direction={"row"} spacing={4}>
        <Skeleton animation="wave" height={17} width="15%" />
        <Skeleton animation="wave" height={17} width="45%" />
      </Stack>
    </Stack>
  );
};

// order timeline section skeleton
export const OrderTimelineSkeleton = () => {
  return (
    <Stack direction={"column"} spacing={1} sx={{ mt: "15px" }}>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", mb: "10px" }}
      >
        <Skeleton animation="wave" height={17} width="30%" />
        <Skeleton animation="wave" height={17} width="30%" />
      </Stack>
      <Skeleton animation="wave" height={30} width="100%" />
      <Skeleton animation="wave" height={30} width="100%" />
      <Skeleton animation="wave" height={30} width="100%" />
      <Skeleton animation="wave" height={30} width="100%" />
      <Skeleton animation="wave" height={30} width="100%" />
      <Skeleton animation="wave" height={30} width="100%" />
      <Skeleton animation="wave" height={30} width="100%" />
      <Skeleton animation="wave" height={30} width="100%" />
    </Stack>
  );
};

// user details section skeleton
export const UserDetailsSkeleton = () => {
  return (
    <Stack direction={"row"} spacing={2}>
      <Skeleton animation="wave" height={17} width="17%" />
      <Skeleton animation="wave" height={17} width="17%" />
      <Skeleton animation="wave" height={17} width="17%" />
    </Stack>
  );
};

// order id section skeleton
export const OrderIdSectionSkeleton = () => {
  return (
    <>
      <Skeleton animation="wave" height={17} width="15%" sx={{ ml: "15px" }} />
      <Skeleton animation="wave" height={17} width="15%" sx={{ ml: "15px" }} />
      <Skeleton animation="wave" height={17} width="15%" sx={{ ml: "15px" }} />
    </>
  );
};

// map section skeleton
export const MapSectionSkeleton = () => {
  return <Skeleton variant="rectangular" width={"100%"} height={279} />;
};
