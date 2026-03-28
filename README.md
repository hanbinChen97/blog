# My Personal Blog 🚀

这是一个基于 [Astro](https://astro.build) 和 [Chiri](https://github.com/the3ash/astro-chiri) 主题构建的个人博客系统，完全托管在 **GitHub Pages** 的 `/blog` 路径下。

## 项目特点

- **Root Router 路由优化**：所有内容均归纳在 `/blog` 路径下运行（例如：`username.github.io/blog/`）。
- **静态网站渲染**：利用 Astro 的强大性能，将内容预渲染为纯静态 HTML。
- **多格式内容支持**：
  - **Markdown/MDX**：支持标准 Markdown 和扩展的 MDX 语法。
  - **HTML Embeds**：支持直接存放并访问原生的 HTML 嵌入内容（如演示文稿、交互图表等）。

## 项目结构

```text
/
├── public/
│   └── embeds/          <-- 存放你的原生 HTML 内容 (访问路径: /blog/embeds/...)
├── src/
│   ├── content/
│   │   └── posts/       <-- 存放 Markdown/MDX 文章 (访问路径: /blog/post-id/)
│   └── pages/           <-- 页面路由逻辑
└── astro.config.ts      <-- 配置 base: '/blog'
```

## 快速开始

### 1. 本地开发

确保你已经安装了 [pnpm](https://pnpm.io/)。

```bash
# 克隆仓库
git clone <your-repo-url>
cd blog

# 安装依赖
pnpm install

# 启动开发服务器 (默认在 http://localhost:4321/blog/)
pnpm dev
```

### 2. 撰写内容

#### 博客文章 (Markdown/MDX)
将你的文章放入 `src/content/posts/` 目录下：
- **Markdown**: `example-post.md`
- **MDX**: `example-post.mdx`

**注意**：所有文章都需要包含必要的 Frontmatter（标题和日期），例如：
```yaml
---
title: 我的第一篇文章
pubDate: 2026-03-28
---
```

#### 原生 HTML 嵌入内容 (Embeds)
直接将你的 HTML 项目文件夹放入 `public/embeds/`。
- 例如：`public/embeds/hello-world/index.html`
- 访问地址：`https://username.github.io/blog/embeds/hello-world/`

## 部署流程

本项目使用 GitHub Actions 进行自动化部署。

1. 在 GitHub 仓库设置中：**Settings** > **Pages**。
2. 在 **Build and deployment** > **Source** 下选择 **GitHub Actions**。
3. 确保 `astro.config.ts` 中的 `base` 设置为 `/blog`。
4. 之后每次推送代码到 `main` 分支，GitHub 都会自动构建并发布你的博客。

## 开发建议

- **内部链接**：在代码中使用 `<a>` 标签时，请务必配合 `import.meta.env.BASE_URL`，以确保在子路径下正常跳转。
  - 示例：`<a href={`${import.meta.env.BASE_URL}post-id/`}>`
- **静态资源**：在 Markdown 或 HTML 中引用 `public/` 下的资源时，请确保路径正确。

## 常用命令

- `pnpm dev` - 本地预览
- `pnpm build` - 构建静态文件
- `pnpm new <title>` - 创建新文章

## 致谢

- [Astro](https://astro.build)
- [Chiri Theme](https://github.com/the3ash/astro-chiri)
