export default function Footer() {
  return (
    <footer className="border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-brand-slate sm:px-6 lg:px-8">
        <p className="font-semibold text-brand-ink">Pay4World</p>
        <p className="mt-2">© {new Date().getFullYear()} Pay4World. All rights reserved.</p>
      </div>
    </footer>
  );
}
