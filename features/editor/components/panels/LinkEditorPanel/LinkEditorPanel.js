import { useState, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/features/editor/components/icon";
import { Surface } from "@/features/editor/components/surface";

export const useLinkEditorState = ({
  initialUrl,
  initialOpenInNewTab,
  onSetLink,
}) => {
  const [url, setUrl] = useState(initialUrl || "");
  const [openInNewTab, setOpenInNewTab] = useState(
    initialOpenInNewTab || false,
  );

  const onChange = useCallback((event) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isValidUrl) {
        onSetLink(url, openInNewTab);
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  );

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  };
};

export const LinkEditorPanel = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}) => {
  const state = useLinkEditorState({
    onSetLink,
    initialOpenInNewTab,
    initialUrl,
  });

  return (
    <Surface className="p-2">
      <form onSubmit={state.handleSubmit} className="flex items-center gap-2">
        <label className="flex cursor-text items-center gap-2 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-900">
          <Icon name="Link" className="flex-none text-black dark:text-white" />
          <input
            type="url"
            className="min-w-[12rem] flex-1 bg-transparent text-sm text-black outline-none dark:text-white"
            placeholder="Enter URL"
            value={state.url}
            onChange={state.onChange}
          />
        </label>
        <Button buttonSize="small" type="submit" disabled={!state.isValidUrl}>
          Set Link
        </Button>
      </form>
      {/* <div className="mt-3">
        <label className="flex cursor-pointer select-none items-center justify-start gap-2 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
          Open in new tab
          <Switch
            active={state.openInNewTab}
            onChange={state.setOpenInNewTab}
          />
        </label>
      </div> */}
    </Surface>
  );
};
