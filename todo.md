要在 Astro 中实现 `/blog` 作为 **Root Router**，并将所有内容（Markdown 和 HTML PPT）归纳到 `/blog/xxx` 路径下，最关键的是 **Directory Structure** (目录结构) 和 **Project Configuration** (项目配置)。

既然你已经有了 `blog` 仓库，如果你的 GitHub Pages 地址是 `username.github.io/blog/`，你需要处理 **Base Path**。

---

## 1. 目录结构调整 (Project Structure)

在 Astro 中，`src/pages/` 下的文件夹直接对应 **URL Path**。

```text
my-astro-project/
├── astro.config.mjs
├── public/
│   └── blog/
│       └── presentations/   <-- 你的 HTML PPT 放在这里
│           └── ppt-1/
│               └── index.html
├── src/
│   ├── content/
│   │   └── config.ts
│   │   └── posts/           <-- 存放 .md 文件
│   │       └── post-1.md
│   └── pages/
│       └── blog/            <-- 所有页面都在 /blog 下
│           ├── index.astro  <-- 对应 /blog (主页)
│           └── [slug].astro <-- 对应 /blog/post-1 (动态路由)
```

---

## 2. 配置文件修改 (Config)

你必须在 `astro.config.mjs` 中设置 `base` 属性。这会告诉 Astro 所有的链接都要加上 `/blog` 前缀。

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://username.github.io',
  base: '/blog', // 关键：这会让你的网站在 /blog 路径下运行
  outDir: './dist',
});
```

---

## 3. 实现路由逻辑 (Routing Logic)

### A. 博客主页 (`src/pages/blog/index.astro`)
这个文件处理 `/blog` 路径。你可以通过 `getCollection` 获取所有 Markdown 列表。

### B. 文章详情页 (`src/pages/blog/[slug].astro`)
使用 **Dynamic Routes** (动态路由) 来渲染 Markdown。

```astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---
<h1>{entry.data.title}</h1>
<Content />
```

---

## 4. 处理 HTML PPT (Static Passthrough)

对于你那些已经写好的 HTML PPT，直接把它们放在 `public/blog/presentations/`。

* **URL 访问**: `https://username.github.io/blog/presentations/ppt-1/index.html`
* **注意**: 在 HTML PPT 内部引用 JS/CSS 时，请务必使用 **Relative Paths** (相对路径，如 `./style.css`)，不要使用以 `/` 开头的绝对路径。

---

## 5. Deployment 修正 (GitHub Pages)

由于你之前的部署修改了 Root，导致路径错误。请按照以下 Checklist 检查：

* **Settings**: 在 GitHub Repo 的 `Settings > Pages` 中，确保 **Source** 是 `GitHub Actions`。
* **Workflow**: 确保你的 `.github/workflows/deploy.yml` 里的 build 步骤包含了 `npm run build`。
* **No .nojekyll**: 如果你手动上传文件，记得在根目录放一个空的 `.nojekyll` 文件，防止 GitHub 忽略下划线开头的文件夹。

---

## 6. Quick Checklist (快速清单)

* [ ] **Base Config**: `astro.config.mjs` 里的 `base: '/blog'` 是否已写？
* [ ] **Link Wrapping**: 代码中的 `<a>` 标签是否都加上了 base 路径？（建议使用 `<a href={`${import.meta.env.BASE_URL}/post-1`}>`）。
* [ ] **Public Folder**: HTML PPT 是否放在了 `public/blog/...` 目录下？

---

修改完了直接 commit  push，