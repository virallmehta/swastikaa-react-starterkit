import { ENV } from '@constants/env';

export function Footer() {
  return (
    <footer className="border-base-300/60 border-t">
      <div className="container-app text-base-content/60 flex flex-col items-center justify-between gap-2 py-8 text-sm sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {ENV.APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}