import { AccountSwitcher } from './AccountSwitcher'

export function Header() {
  return (
    <header className="w-full bg-white shadow-xs px-6 flex h-16 items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img src="/favicon.png" alt="" className="h-8 w-8" />
        <h1 className="text-lg font-semibold tracking-tight text-gray-800 sm:text-xl">
          阿米巴直播助手
        </h1>
      </div>

      <div className="flex items-center">
        <AccountSwitcher />
      </div>
    </header>
  )
}
