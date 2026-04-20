import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      <header className="bg-white border-b border-ink-100 sticky top-0 z-10">
        <div className="max-w-[720px] mx-auto px-5 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-ink-900 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white" />
            </div>
            <span className="text-[15px] font-medium text-ink-900 tracking-tight">招募海报</span>
          </Link>
          <span className="text-xs text-ink-400">MVP v0.1</span>
        </div>
      </header>

      <main className="flex-1 max-w-[720px] w-full mx-auto px-5 py-6">
        {children}
      </main>

      <footer className="py-6 text-center text-xs text-ink-400">
        免费工具 · 开源项目
      </footer>
    </div>
  );
}
