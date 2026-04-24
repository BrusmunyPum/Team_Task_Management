import { AppIcon } from "@/components/ui/AppIcon";

type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="error-banner">
      <AppIcon name="error" />
      {message}
    </p>
  );
}
