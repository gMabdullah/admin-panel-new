import {
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  useEffect,
} from "react";
import { Link, useLocation } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  Divider,
} from "@mui/material";

// project imports
import useConfig from "hooks/useConfig";
import { useDispatch, useSelector } from "store";
import { activeItem, openDrawer } from "store/slices/menu";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// types
import { LinkTarget, NavItemType } from "types";

interface NavItemProps {
  item: NavItemType;
  level: number;
}

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }: NavItemProps) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));

  const { borderRadius } = useConfig();
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.menu);

  const Icon = item?.icon!;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="20px" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  let itemTarget: LinkTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps: {
    component:
      | ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>>
      | string;
    href?: string;
    target?: LinkTarget;
  } = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url!} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id: string) => {
    dispatch(activeItem([id]));
    matchesSM && dispatch(openDrawer(false));
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(activeItem([item.id!]));
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <ListItemButton
        {...listItemProps}
        disabled={item.disabled}
        sx={{
          borderRadius: `${borderRadius}px`,
          // mb: 0.5,
          alignItems: "flex-start",
          backgroundColor: level > 1 ? "transparent !important" : "inherit",
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
          // p: "unset !important",
        }}
        selected={selectedItem?.findIndex((id) => id === item.id) > -1}
        onClick={() => itemHandler(item.id!)}
      >
        <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
          {itemIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={
                selectedItem?.findIndex((id) => id === item.id) > -1
                  ? "h5"
                  : "body1"
              }
              color="inherit"
            >
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography
                variant="caption"
                sx={{ ...theme.typography.subMenuCaption }}
                display="block"
                gutterBottom
              >
                {item.caption}
              </Typography>
            )
          }
        />

        {/* {item.chip && (
                  <Chip
                      color={item.chip.color}
                      variant={item.chip.variant}
                      size={item.chip.size}
                      label={item.chip.label}
                      avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                  />
              )} */}
      </ListItemButton>

      {item.title === "Performance" ? (
        <Divider
          sx={{
            mt: "10.5px",
            mb: "10.5px",
            pl: "20px",
            pr: "15px",
            border: "1px solid rgba(0, 0, 0, 0.06)",
          }}
        />
      ) : item.title === "Inventory" ? (
        <Divider
          sx={{
            mt: "10.5px",
            mb: "10.5px",
            pl: "20px",
            pr: "15px",
            border: "1px solid rgba(0, 0, 0, 0.06)",
          }}
        />
      ) : null}
    </>
  );
};

export default NavItem;
