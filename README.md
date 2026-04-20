# 摄影作品展示（静态网站）

这是一个纯静态网站项目（HTML/CSS/JS），适合直接部署到静态托管平台。

## 页面

- `新建 文本文档.html`：首页
- `portfolio.html`：作品集
- `about.html`：关于我
- `新建 文本文档 (3).css`：样式
- `新建 文本文档 (2).js`：脚本

## 本地预览（最简单）

> 不建议直接双击 `.html` 打开（路径/缓存/跨域等问题更容易踩坑），用本地静态服务器更稳。

### 方法 A：Python（推荐）

在项目根目录执行：

```bash
python -m http.server 5500
```

然后浏览器打开：

- `http://localhost:5500/新建%20文本文档.html`

### 方法 B：VS Code / Cursor 的 Live Server

安装 Live Server 插件后，右键 `新建 文本文档.html` → Open with Live Server。

## 最简单上线步骤（推荐顺序）

### 方案 1：Netlify（最省事，拖拽就能上）

1. 打开 Netlify（搜索 “Netlify Drop”）。
2. 把整个项目文件夹（包含 `*.html`、`新建 文本文档 (3).css`、`新建 文本文档 (2).js`，以及你用到的图片/字体等静态资源）拖到上传区域。
3. 上传完成后会给你一个域名，点开即可访问。

> 说明：Netlify 默认会找 `index.html` 作为首页。你目前的首页是 `新建 文本文档.html`，建议上线前把它**改名为** `index.html`（或自己额外做一个 `index.html` 跳转页）。

### 方案 2：GitHub Pages（免费，适合长期维护）

1. 把项目推到 GitHub 仓库。
2. 仓库 Settings → Pages → 选择部署分支（通常 `main`）和目录（`/root`）。
3. 等待生成访问地址。

> 说明：GitHub Pages 也要求根目录有 `index.html`。如果你不想改动现有文件名，建议新增一个 `index.html` 作为入口。

### 方案 3：Vercel（也可以，但更偏前端框架项目）

如果未来你加了构建流程（如 Vite/React），再用 Vercel 会更顺手；当前纯静态项目用 Netlify / GitHub Pages 更直接。

