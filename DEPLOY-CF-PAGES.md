# Astro 博客 + Decap CMS 部署指南（免服务器方案）

本项目是一个 **纯静态博客**（Astro + AstroPaper 主题），带 **Decap CMS 网页写作后台**。
部署到 **Cloudflare Pages**（免费、无需服务器），域名绑定你自己的 `eu.org` 域名。

```
你在浏览器写文章 (/admin) → 保存到 GitHub 仓库 → Cloudflare Pages 自动构建 → 上线 ✅
```

---

## 一、创建 GitHub 仓库并推送（一次性，约 5 分钟）

### 1. 创建仓库
1. 登录 [github.com](https://github.com) → 右上角 **+** → **New repository**
2. 名称填 `astro-blog`，选 **Public**（公开）
3. **不要**勾选任何初始化选项（README/.gitignore/LICENSE 都留空）
4. 点 **Create repository**

### 2. 本地推送
在项目目录打开 PowerShell：

```powershell
cd D:\deepseek desktop\opengo\astro-blog

# 关联远程仓库（用户名换成你的）
git remote add origin https://github.com/islideer/astro-blog2.git

# 推送（第一次会要求登录，用浏览器授权；或装 GitHub Desktop 免密）
git push -u origin main
```

> 若提示输密码：GitHub 已禁用密码推送，用 **Personal Access Token**（头像 → Settings → Developer settings → Tokens，勾选 `repo` 权限）。

---

## 二、部署到 Cloudflare Pages（一次性，约 5 分钟）

### 前提：你要有 Cloudflare 账号
你之前申请证书时应该注册过（[dash.cloudflare.com](https://dash.cloudflare.com)）。没有就用邮箱注册一个，免费。

### 部署步骤
1. 登录 Cloudflare → 左侧菜单 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 授权 GitHub，选择你的 `astro-blog` 仓库
3. 框架预设选 **Astro**（自动填好构建命令），核对：
   - **Build command**：`pnpm run build`
   - **Build output directory**：`dist`
   - **Environment variables**：无需添加
4. 点 **Save and Deploy**
5. 首次构建 1-2 分钟完成，Cloudflare 会给你一个 `xxx.pages.dev` 域名，先访问确认网站正常 ✅

**以后每次 push 到 GitHub，Cloudflare 自动重新构建，无需任何操作。**

---

## 三、绑定你自己的域名（可选，推荐）

1. Cloudflare Pages → 你的项目 → **Custom domains** → **Set up a custom domain**
2. 输入 `tangtang.jntmbb.eu.org`（或子域名如 `blog.tangtang.jntmbb.eu.org`）
3. 按提示去 [eu.org 后台](https://nic.eu.org) 添加 CNAME 记录指向 `xxx.pages.dev`（Cloudflare 会提示具体记录）
4. 生效后 Cloudflare 自动签发 HTTPS 证书

> 💡 你的域名解析现在在 eu.org，需要先在 eu.org 面板添加 CNAME 记录。
> 证书签发是自动的，无需手动申请。

---

## 四、配置 Decap CMS 网页后台（写文章的关键，一次性约 5 分钟）

网页后台在 `你的域名/admin`。它通过 GitHub OAuth 登录后，直接在浏览器里 CRUD 文章（markdown 文件），保存即提交到仓库、触发自动部署。

### 步骤 1：创建 GitHub OAuth App
1. 打开 [github.com/settings/developers](https://github.com/settings/developers) → **New OAuth App**
2. 填写：
   - **Application name**：`astro-blog-cms`
   - **Homepage URL**：`https://你的域名`（Cloudflare 给你的 pages.dev 域名或自定义域名，如 `https://xxx.pages.dev`）
   - **Authorization callback URL**：`https://api.netlify.com/auth/done`（Decap 官方认证服务，无需自建服务器）
3. 点 **Register application**
4. 记下页面显示的 **Client ID** 和 **Client Secret**（Secret 只显示一次，立即保存）

### 步骤 2：创建 Git Gateway Token（Netlify 认证）
1. 打开 [app.netlify.com](https://app.netlify.com) 注册账号（免费）
2. 右上角头像 → **User settings** → **Applications** → **New OAuth App**
3. 填写：
   - **Provider**：GitHub
   - **Client ID / Client Secret**：填上一步 GitHub 拿到的
   - 点 Save
4. 顶部 **Personal access tokens** 页签 → **New access token** → Generate（记下 token）
5. 找到你的博客站点（或随便建个空站）→ **Site settings** → **Identity** → **Enable Identity**
   - 在 **External providers** 里添加 GitHub（填上面的 Client ID/Secret）
   - 在 **Services** 里点 **Enable Git Gateway**

### 步骤 3：改 CMS 配置（填入你的信息）
编辑 `public/admin/config.yml`：

```yaml
backend:
  name: github
  repo: 你的用户名/astro-blog   # ← 改这里
  branch: main
  site_domain: 你的域名          # ← 改这里（不含 https://）
```

保存后重新 `git push`，让 Cloudflare 重新构建。

### 步骤 4：完成
访问 `https://你的域名/admin` → 点「Login with GitHub」→ 授权后即可在网页里写文章了！

> ✅ 如果步骤 2 的 Netlify Identity 配置觉得繁琐，Decap 官方也支持最简单的 **GitHub backend 免 OAuth**（用 Personal Access Token 存本地），但浏览器里每次要手动输 token，体验差一些。上面这套是正规做法，配一次永久好用。

---

## 五、日常写文章（以后都这样）

1. 打开 `https://你的域名/admin`
2. GitHub 登录 → **文章** → **新文章**
3. 填标题、正文（markdown 可视化编辑）、标签，插图直接拖拽上传
4. 点 **发布**（或存为草稿）
5. 等 1-2 分钟 Cloudflare 自动构建，刷新网站即可看到新文章 🎉

> 传图片自动保存到 `public/uploads/`，无需额外配置图床。

---

## 六、本地开发（可选）

```powershell
cd D:\deepseek desktop\opengo\astro-blog
pnpm dev        # 本地预览 http://localhost:4321
pnpm build      # 本地构建验证（或直接 push 让 Cloudflare 构建）
```

---

## 常见问题

| 现象 | 解决 |
|------|------|
| `/admin` 打开是白屏 | 检查 config.yml 里 repo/site_domain 是否填对并重新 push；浏览器缓存硬刷新 (Ctrl+Shift+R) |
| admin 登录报错 | 确认 GitHub OAuth App 的 callback URL 填的是 `https://api.netlify.com/auth/done`，且 Homepage URL 正确 |
| 文章保存失败 | 检查 Git Gateway 是否启用（Netlify 站点 Identity → Services → Enable Git Gateway） |
| 构建失败 | Cloudflare Pages 构建日志看具体原因；本地先 `pnpm build` 确认无报错 |
| 想换回自己的服务器部署 | 不需要服务器——本项目纯静态，任何静态托管都能跑（Vercel/GitHub Pages 也可以，构建命令同上） |

---

## 费用与数据

- **费用**：全部免费（Cloudflare Pages 免费额度、GitHub 免费、Netlify 免费额度）
- **数据**：文章是你仓库里的 markdown 文件，随时 clone 下来就是备份；换平台只需重新部署