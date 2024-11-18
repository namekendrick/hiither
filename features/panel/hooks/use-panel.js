import { useEffect, useRef, useState } from "react";

import { getCurrentPanel } from "@/db/panel";
import { postToParent } from "@/lib/utils";
import { useAddView } from "@/features/panel/hooks/use-add-view";

export const usePanel = () => {
  const mutation = useAddView();
  const panelWindowRef = useRef(null);

  const [currentPanel, setCurrentPanel] = useState();
  const [panelOpened, setPanelOpened] = useState(false);
  const [closeButtonClicked, setCloseButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    postToParent(
      JSON.stringify({
        width: panelOpened ? "100%" : 0,
        height: panelOpened ? "100%" : 0,
        closeButtonClicked,
      }),
    );
  }, [panelOpened, closeButtonClicked]);

  const onHandleCloseButtonClicked = () =>
    setCloseButtonClicked((prev) => !prev);

  const onGetPanel = async (values) => {
    setLoading(true);

    const panel = await getCurrentPanel(values.panelId);

    if (panel.isPublished) {
      setCurrentPanel(panel);
      setPanelOpened(true);
      mutation.mutate(values.panelId);
    }

    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (e.data.panelId) onGetPanel(e.data);
      if (e.data.buttonClicked) setCloseButtonClicked(false);
    });
  }, [closeButtonClicked]);

  return {
    panelWindowRef,
    currentPanel,
    onHandleCloseButtonClicked,
    panelOpened,
    loading,
  };
};
