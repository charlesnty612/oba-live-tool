import logoUrl from '@/assets/logo.png'
import { AccountSwitcher } from './AccountSwitcher'

export function Header() {
  return (
    <header className="w-full bg-white shadow-xs px-6 flex h-16 items-center justify-between">
      <div className="flex items-center gap-2.5">
        {/* 用 import 而不是 /favicon.png：打包后渲染进程走 loadFile(dist/index.html)，
            以 / 开头的路径会被解析到磁盘根目录导致裂图 */}
        <img src={logoUrl} alt="" className="h-8 w-8" />
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
