import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface ProductsSideBarMenu {
  id: string;
  title: string;
  type: string;
  icon: OverrideIcon;
  children: {
    id: string;
    title: string;
    type: string;
    url: string;
    breadcrumbs: boolean;
  }[];
}

const Products: ProductsSideBarMenu = {
  id: "products",
  title: "Products",
  type: "collapse",
  icon: IconBrandProducthunt,
  children: [
    {
      id: "items",
      title: "Items",
      type: "item",
      url: "/products/items",
      breadcrumbs: false,
    },
    {
      id: "categories",
      title: "Categories",
      type: "item",
      url: "/products/categories",
      breadcrumbs: false,
    },
    {
      id: "setup",
      title: "Setup",
      type: "item",
      url: "/products/setup/option-sets",
      breadcrumbs: false,
    },
  ],
};

export default Products;
