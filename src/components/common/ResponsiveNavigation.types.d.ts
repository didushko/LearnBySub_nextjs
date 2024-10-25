interface BaseProps extends React.ComponentProps<"button"> {
  loadingClassName?: string;
  mode: "full" | "hoverWidth" | "hoverHeight" | "border" | "custom";
  fullOnMobile?: boolean;
  scroll?: boolean;
  blure?: boolean;
}

interface PathProps extends BaseProps {
  path: string;
  updateParams?: never;
  selectedClassName?: never;
  route?: "push" | "replace";
}
interface RefreshProps extends BaseProps {
  path?: never;
  updateParams?: never;
  selectedClassName?: never;
  route: "refresh";
}

interface UpdateParamsProps extends BaseProps {
  path?: never;
  updateParams: { [key: string]: string | null };
  selectedClassName?: string;
  route?: never;
}

interface HoverProps {
  mode: "hoverWidth" | "hoverHeight";
  around: boolean;
}

interface OtherModeProps {
  mode: "full" | "border" | "custom";
  around?: never;
}

type ModeProps = HoverProps | OtherModeProps;

type INavigate = (PathProps | UpdateParamsProps | RefreshProps) & ModeProps;

export default INavigate;
