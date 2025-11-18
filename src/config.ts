export const BASE_PATH = "/Personal-blog";

export const SITE = {
  website: "https://erfanbashar1.github.io/Personal-blog/", // replace this with your deployed domain
  author: "Erfan Bashar",
  profile: "https://www.linkedin.com/in/erfan-bashar/",
  desc: "Erfan Bashar's Personal Blog",
  title: "Erfan Bashar",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/erfanbashar1/Personal-blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Rome", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
