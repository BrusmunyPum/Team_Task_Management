import { cx, initials } from "@/lib/utils";

type AvatarProps = {
  name: string;
  tone?: string;
};

export function Avatar({ name, tone = "" }: AvatarProps) {
  return <span className={cx("avatar", tone)}>{initials(name)}</span>;
}
