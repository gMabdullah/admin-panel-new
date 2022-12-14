import { Stack, Skeleton } from "@mui/material";

// order detail table skeleton
export const TableSkeleton = () => {
  return (
    <Stack direction={"column"} spacing={1} sx={{ mb: "10px" }}>
      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="40%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="40%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="40%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="40%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
        <Skeleton animation="wave" height={20} width="10%" />
      </Stack>
    </Stack>
  );
};

// order detail calculation section skeleton
export const CalculationSectionSkeleton = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={20} width="50%" />
        <Skeleton animation="wave" height={20} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={20} width="50%" />
        <Skeleton animation="wave" height={20} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={20} width="50%" />
        <Skeleton animation="wave" height={20} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={20} width="50%" />
        <Skeleton animation="wave" height={20} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={20} width="50%" />
        <Skeleton animation="wave" height={20} width="50%" />
      </Stack>

      <Stack direction={"row"} spacing={3}>
        <Skeleton animation="wave" height={20} width="50%" />
        <Skeleton animation="wave" height={20} width="50%" />
      </Stack>
    </Stack>
  );
};

// delivery details section skeleton
export const OrderDeliveryDetailsSkeleton = () => {
  return (
    <Stack direction={"column"} spacing={1} sx={{ mt: "15px" }}>
      <Stack direction={"row"} spacing={4}>
        <Skeleton animation="wave" height={20} width="12%" />
        <Skeleton animation="wave" height={20} width="42%" />
      </Stack>

      <Stack direction={"row"} spacing={4}>
        <Skeleton animation="wave" height={20} width="12%" />
        <Skeleton animation="wave" height={20} width="42%" />
      </Stack>

      <Stack direction={"row"} spacing={4}>
        <Skeleton animation="wave" height={20} width="12%" />
        <Skeleton animation="wave" height={20} width="42%" />
      </Stack>
    </Stack>
  );
};

// user details section skeleton
export const UserDetailsSkeleton = () => {
  return (
    <Stack direction={"row"} spacing={2}>
      <Skeleton animation="wave" height={20} width="16%" />
      <Skeleton animation="wave" height={20} width="16%" />
      <Skeleton animation="wave" height={20} width="16%" />
    </Stack>
  );
};

// order id section skeleton
export const OrderIdSectionSkeleton = () => {
  return (
    <>
      <Skeleton animation="wave" height={20} width="18%" sx={{ ml: "15px" }} />
      <Skeleton animation="wave" height={20} width="18%" sx={{ ml: "15px" }} />
    </>
  );
};
