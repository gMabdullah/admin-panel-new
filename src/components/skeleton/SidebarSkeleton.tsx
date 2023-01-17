import { Stack, Skeleton } from "@mui/material";

// sidebar skeleton
export const SidebarSkeleton = () => {
  return (
    <Stack direction={"column"} sx={{ mt: "5px", mb: "25px" }}>
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
      <Skeleton animation="wave" height={40} width="95%" />
    </Stack>
  );
};
