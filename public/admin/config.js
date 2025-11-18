// Wait for CMS to load before initializing
if (window.CMS) {
  initCMS();
} else {
  document.addEventListener('DOMContentLoaded', initCMS);
}

function initCMS() {
  // Check if CMS object exists
  if (!window.CMS) {
    setTimeout(initCMS, 100);
    return;
  }

  const config = {
    backend: {
      name: 'github',
      repo: 'erfanbashar1/Personal-blog',
      branch: 'main',
    },
    media_folder: 'public/images/uploads',
    public_folder: '/Personal-blog/images/uploads',
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        folder: 'src/data/blog',
        create: true,
        slug: '{{slug}}',
        format: 'frontmatter',
        preview_path: '/Personal-blog/posts/{{slug}}',
        fields: [
          {
            label: 'Title',
            name: 'title',
            widget: 'string',
            required: true,
          },
          {
            label: 'Author',
            name: 'author',
            widget: 'string',
            default: 'Erfan Bashar',
          },
          {
            label: 'Description',
            name: 'description',
            widget: 'text',
            required: true,
          },
          {
            label: 'Publish Date',
            name: 'pubDatetime',
            widget: 'datetime',
            required: true,
            format: 'YYYY-MM-DDTHH:mm:ssZ',
            date_format: 'YYYY-MM-DD',
            time_format: 'HH:mm:ss',
          },
          {
            label: 'Modified Date',
            name: 'modDatetime',
            widget: 'datetime',
            required: false,
            format: 'YYYY-MM-DDTHH:mm:ssZ',
            date_format: 'YYYY-MM-DD',
            time_format: 'HH:mm:ss',
          },
          {
            label: 'Featured',
            name: 'featured',
            widget: 'boolean',
            default: false,
          },
          {
            label: 'Draft',
            name: 'draft',
            widget: 'boolean',
            default: false,
          },
          {
            label: 'Tags',
            name: 'tags',
            widget: 'list',
            allow_add: true,
          },
          {
            label: 'Post Content',
            name: 'body',
            widget: 'markdown',
            required: true,
          },
        ],
      },
    ],
  };

  try {
    window.CMS.init({ config });
  } catch (error) {
    console.error('Failed to initialize CMS:', error);
    setTimeout(initCMS, 100);
  }
}
