import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "./tailwind.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Reading List" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body
        className={
          "max-w-[1440px] mx-auto py-10 px-4 flex flex-col gap-6 bg-zinc-900 text-white"
        }
      >
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
