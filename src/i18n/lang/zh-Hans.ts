import type { UIStrings } from "../types";

export default {
  nav: {
    home: "首页",
    posts: "经营笔记",
    tags: "主题",
    about: "关于",
    archives: "归档",
    search: "搜索",
  },
  post: {
    publishedAt: "发布于",
    updatedAt: "更新于",
    sharePostIntro: "分享这篇文章：",
    sharePostOn: "分享到 {{platform}}",
    sharePostViaEmail: "通过电邮分享",
    tagLabel: "主题",
    backToTop: "回到顶部",
    goBack: "返回",
    editPage: "编辑页面",
    previousPost: "上一篇",
    nextPost: "下一篇",
  },
  pagination: {
    prev: "上一页",
    next: "下一页",
    page: "页",
  },
  home: {
    socialLinks: "联系",
    featured: "精选案例",
    recentPosts: "工作笔记",
    allPosts: "查看全部文章",
  },
  footer: {
    copyright: "版权所有",
    allRightsReserved: "保留所有权利。",
  },
  pages: {
    tagTitle: "主题",
    tagDesc: "此主题下的文章",
    tagsTitle: "主题",
    tagsDesc: "浏览所有文章主题。",
    postsTitle: "经营笔记",
    postsDesc:
      "这里放工作现场里的记录：event、campaign、项目、表格和 follow-up 实际怎样卡住、怎样继续走。",
    archivesTitle: "归档",
    archivesDesc: "按年份浏览文章。",
    searchTitle: "搜索",
    searchDesc: "搜索案例与文章。",
  },
  a11y: {
    skipToContent: "跳到主要内容",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    toggleTheme: "切换主题",
    searchPlaceholder: "输入关键词",
    noResults: "找不到结果",
    goToPreviousPage: "前往上一页",
    goToNextPage: "前往下一页",
  },
  notFound: {
    title: "找不到页面",
    message: "这个页面不存在。",
    goHome: "返回首页",
  },
} satisfies UIStrings;
