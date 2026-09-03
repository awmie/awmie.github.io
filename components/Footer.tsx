export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} awmie
        </p>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="font-mono text-[10px] uppercase tracking-wide text-muted transition-colors hover:text-accent"
          >
            Back to top &uarr;
          </a>
          <span className="font-mono text-[10px] uppercase tracking-wide text-dim">
            Built with Next.js &middot; Three.js
          </span>
        </div>
      </div>
    </footer>
  );
}
