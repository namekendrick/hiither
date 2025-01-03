import { useEffect, useRef, useState } from "react";

import { getPublicDomainByPanelId } from "@/db/domain";
import { getCurrentPanel } from "@/db/panel";
import { postToParent } from "@/lib/utils";
import { useAddView } from "@/features/panel/hooks/use-add-view";

export const usePanel = () => {
  const mutation = useAddView();
  const panelWindowRef = useRef(null);

  const [currentPanel, setCurrentPanel] = useState();
  const [currentDomain, setCurrentDomain] = useState();
  const [panelOpened, setPanelOpened] = useState(false);
  const [closeButtonClicked, setCloseButtonClicked] = useState(false);

  useEffect(() => {
    if (currentDomain) {
      postToParent(
        JSON.stringify({
          width: panelOpened ? "100%" : 0,
          height: panelOpened ? "100%" : 0,
          closeButtonClicked,
        }),
        process.env.NODE_ENV !== "development"
          ? `https://www.${currentDomain.name}`
          : `http://${currentDomain.name}`,
      );
    }
  }, [panelOpened, closeButtonClicked, currentDomain]);

  useEffect(() => {
    const handleMessage = async (e) => {
      if (e.data.panelId) onGetPanel(e.data);
      if (e.data.buttonClicked) setCloseButtonClicked(false);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [closeButtonClicked]);

  const onHandleCloseButtonClicked = () =>
    setCloseButtonClicked((prev) => !prev);

  const onGetPanel = async (values) => {
    const panel = await getCurrentPanel(values.panelId);
    const domain = await getPublicDomainByPanelId(values.panelId);

    if (panel.isPublished) {
      setCurrentPanel(panel);
      setCurrentDomain(domain);
      setPanelOpened(true);
      mutation.mutate(values.panelId);
    }
  };

  return {
    panelWindowRef,
    currentPanel,
    onHandleCloseButtonClicked,
    panelOpened,
  };
};
