"use client";

import { useState } from "react";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";

type MockSubmitButtonProps = {
  label: string;
  completeLabel?: string;
  icon?: AppIconName;
};

export function MockSubmitButton({
  label,
  completeLabel = "Saved",
  icon = "save",
}: MockSubmitButtonProps) {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <button
      className="primary-action"
      type="button"
      onClick={() => {
        setIsComplete(true);
        window.setTimeout(() => setIsComplete(false), 1600);
      }}
    >
      <AppIcon name={isComplete ? "check" : icon} />
      {isComplete ? completeLabel : label}
    </button>
  );
}
