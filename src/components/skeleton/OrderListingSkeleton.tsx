import { Stack, Skeleton } from "@mui/material";

// order listing table skeleton
export const OrderListingSkeleton = () => {
  return (
    <Stack direction={"column"} spacing={1}>
      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={22} width="4%" />
        <Skeleton animation="wave" height={22} width="9%" />
        <Skeleton animation="wave" height={22} width="20%" />
        <Skeleton animation="wave" height={22} width="13%" />
        <Skeleton animation="wave" height={22} width="31%" />
        <Skeleton animation="wave" height={22} width="12%" />
        <Skeleton animation="wave" height={22} width="11%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={22} width="4%" />
        <Skeleton animation="wave" height={22} width="9%" />
        <Skeleton animation="wave" height={22} width="20%" />
        <Skeleton animation="wave" height={22} width="13%" />
        <Skeleton animation="wave" height={22} width="31%" />
        <Skeleton animation="wave" height={22} width="12%" />
        <Skeleton animation="wave" height={22} width="11%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={22} width="4%" />
        <Skeleton animation="wave" height={22} width="9%" />
        <Skeleton animation="wave" height={22} width="20%" />
        <Skeleton animation="wave" height={22} width="13%" />
        <Skeleton animation="wave" height={22} width="31%" />
        <Skeleton animation="wave" height={22} width="12%" />
        <Skeleton animation="wave" height={22} width="11%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={22} width="4%" />
        <Skeleton animation="wave" height={22} width="9%" />
        <Skeleton animation="wave" height={22} width="20%" />
        <Skeleton animation="wave" height={22} width="13%" />
        <Skeleton animation="wave" height={22} width="31%" />
        <Skeleton animation="wave" height={22} width="12%" />
        <Skeleton animation="wave" height={22} width="11%" />
      </Stack>

      <Stack direction={"row"} spacing={2}>
        <Skeleton animation="wave" height={22} width="4%" />
        <Skeleton animation="wave" height={22} width="9%" />
        <Skeleton animation="wave" height={22} width="20%" />
        <Skeleton animation="wave" height={22} width="13%" />
        <Skeleton animation="wave" height={22} width="31%" />
        <Skeleton animation="wave" height={22} width="12%" />
        <Skeleton animation="wave" height={22} width="11%" />
      </Stack>
    </Stack>
  );
};
