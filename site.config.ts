import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://smes.my/",
    title: "SMEs.MY",
    description:
      "马来西亚 SME Accounting、Bookkeeping 与 Company Secretary 服务需求对接，以及自助工具与资源。",
    author: "Wei Nee",
    profile: "https://smes.my/weineetan",
    ogImage: "og.svg",
    lang: "zh-Hans",
    timezone: "Asia/Kuala_Lumpur",
    dir: "ltr",
  },
  posts: {
    perPage: 9,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: false,
    dynamicOgImage: false,
    showArchives: false,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
