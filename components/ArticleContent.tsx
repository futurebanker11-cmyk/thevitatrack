import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'h1','h2','h3','h4','h5','h6',
  'p','ul','ol','li','blockquote',
  'strong','em','b','i','u','s',
  'table','thead','tbody','tr','th','td',
  'a','img','br','hr','div','span',
  'figure','figcaption',
];

const ALLOWED_ATTRS: sanitizeHtml.IOptions['allowedAttributes'] = {
  'a': ['href','title','target','rel'],
  'img': ['src','alt','width','height','loading'],
  'th': ['colspan','rowspan'],
  'td': ['colspan','rowspan'],
  '*': ['class','id','style'],
};

export default function ArticleContent({ html }: { html: string }) {
  const clean = sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRS,
    allowedSchemes: ['http','https','mailto'],
  });

  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
