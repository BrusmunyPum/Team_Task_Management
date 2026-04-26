import { cx, initials } from "@/lib/utils";

type AvatarProps = {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  tone?: string;
  title?: string;
};

export function Avatar({ name, size = "md", title, tone = "" }: AvatarProps) {
  return (
    <span className={cx("avatar", `avatar--${size}`, tone)} title={title ?? name}>
      {initials(name)}
    </span>
  );
}
