import { As } from "@chakra-ui/react";
import { MdBuild, MdVerifiedUser, MdViewModule } from "react-icons/md";

type MenuItem = {
  icon?: As<any> | undefined;
  text: string;
  href?: string;
  children?: MenuItem[];
};

export const menu: MenuItem[] = [
  {
    icon: MdViewModule,
    text: "Modules",
    href: "/",
  },
  {
    icon: MdBuild,
    text: "Crud",
    href: "/crud",
  },
  {
    icon: MdVerifiedUser,
    text: "Validators",
    href: "/validators",
  },
];
