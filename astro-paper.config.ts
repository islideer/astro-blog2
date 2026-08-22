import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://your-domain.com/", // TODO: 改成你的最终域名
    title: "我的个人博客",
    description: "记录思考、分享技术、留住生活的角落",
    author: "我",
    profile: "https://github.com/your-name", // TODO: 你的主页/社交链接
    ogImage: "default-og.jpg",
    lang: "zh",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 8,
    perIndex: 8,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/your-name/astro-blog/edit/main/", // TODO: 改成你的仓库
    },
    search: "pagefind",
  },
  socials: [
    // TODO: 改成你自己的社交链接（不用的删掉）
    { name: "github", url: "https://github.com/your-name" },
    { name: "mail", url: "mailto:you@example.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});