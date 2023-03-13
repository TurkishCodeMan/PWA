import { PropsWithChildren } from "react";

export default function AuthRootLayot({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
