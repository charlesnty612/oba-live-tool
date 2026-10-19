/**
 * 修正 electron-builder 生成的 latest.yml 里的产物文件名。
 *
 * electron-builder 26.0.12 在生成更新清单时不会采用自定义的 artifactName，
 * 而是写死成 ${package.name}-setup-${version}.${ext}。而 electron-updater 是
 * 直接按 latest.yml 里的 url 去下载对应文件的，名字对不上就是 404，
 * 自动更新会静默失效。
 *
 * 这里只把 url / path 改回产物目录里真实的文件名。sha512 和 size 描述的是
 * 文件内容而非文件名，因此无需改动，改完依然能通过校验。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { version } = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const releaseDir = path.join(root, 'release', version)
const manifestPath = path.join(releaseDir, 'latest.yml')

if (!fs.existsSync(manifestPath)) {
  console.error(`找不到 ${manifestPath}，跳过`)
  process.exit(0)
}

// 免安装版带 _portable 后缀，更新清单指向的是 NSIS 安装包
const installer = fs
  .readdirSync(releaseDir)
  .find(f => f.endsWith('.exe') && !f.endsWith('_portable.exe'))

if (!installer) {
  console.error(`${releaseDir} 下没有找到 NSIS 安装包，跳过`)
  process.exit(0)
}

const original = fs.readFileSync(manifestPath, 'utf8')
const fixed = original.replace(/[^\s/\\]+\.exe/g, installer)

if (original === fixed) {
  console.log(`latest.yml 已经指向 ${installer}，无需修改`)
} else {
  fs.writeFileSync(manifestPath, fixed)
  console.log(`latest.yml: 已修正为 ${installer}`)
}
