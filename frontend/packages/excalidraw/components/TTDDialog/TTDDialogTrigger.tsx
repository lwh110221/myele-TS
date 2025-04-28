import { trackEvent } from "../../analytics";
import { useTunnels } from "../../context/tunnels";
import { t } from "../../i18n";
import { useExcalidrawSetAppState } from "../App";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { brainIcon } from "../icons";

import type { ReactNode } from "react";
import type { JSX } from "react";

export const TTDDialogTrigger = ({
  children,
  icon,
}: {
  children?: ReactNode;
  icon?: JSX.Element;
}) => {
  const { TTDDialogTriggerTunnel } = useTunnels();
  const setAppState = useExcalidrawSetAppState();
};
TTDDialogTrigger.displayName = "TTDDialogTrigger";
