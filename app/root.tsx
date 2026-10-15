import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "react-router";

import type { Route } from "./+types/root";
// CSS is inlined into the HTML (≈9 kB gzipped) so the first paint never waits on a stylesheet request.
import css from "./app.css?inline";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // Routes can opt out of client-side React (handle = { hydrate: false }): the page is
  // served as pre-rendered HTML with zero framework JS, which keeps mobile Lighthouse at 100.
  const matches = useMatches();
  const hydrate = !matches.some((m) => (m.handle as { hydrate?: boolean } | undefined)?.hydrate === false);
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0e1416" />
        <meta name="format-detection" content="telephone=no" />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        {children}
        {hydrate && (
          <>
            <ScrollRestoration />
            <Scripts />
          </>
        )}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Page not found" : "Error";
    details =
      error.status === 404
        ? "The page you are looking for does not exist."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container-x py-24 text-center">
      <title>{`${message} | RannLab Technologies`}</title>
      <meta name="robots" content="noindex" />
      <h1 className="text-4xl font-extrabold">{message}</h1>
      <p className="mt-4 text-muted">{details}</p>
      <a href="/" className="btn btn-primary mt-8">Go to homepage</a>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto p-4 text-left">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
