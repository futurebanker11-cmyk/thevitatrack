/**
 * Renders WordPress article HTML that contains full page markup
 * (DOCTYPE, head, style, body). Extracts the style block and body
 * content, sanitizes the body, then renders in a scoped container
 * that preserves the article's own CSS design.
 *
 * Security: body HTML is sanitized via sanitize-html with a generous
 * allowlist that preserves layout classes, tables, and semantic HTML
 * while blocking scripts and event handlers.
 */
import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'h1','h2','h3','h4','h5','h6',
  'p','ul','ol','li','blockquote',
  'strong','em','b','i','u','s','small','mark','abbr',
  'table','thead','tbody','tfoot','tr','th','td','caption',
  'a','img','br','hr',
  'div','span','section','article','aside','main','nav',
  'figure','figcaption','details','summary',
  'dl','dt','dd','sup','sub',
];

const ALLOWED_ATTRS: sanitizeHtml.IOptions['allowedAttributes'] = {
  'a': ['href','title','target','rel','id'],
  'img': ['src','alt','width','height','loading','style'],
  'th': ['colspan','rowspan','style'],
  'td': ['colspan','rowspan','style'],
  'div': ['class','id','style'],
  'span': ['class','id','style'],
  'section': ['class','id','style'],
  'article': ['class','id','style'],
  'aside': ['class','id','style'],
  'p': ['class','id','style'],
  'h1': ['class','id','style'],
  'h2': ['class','id','style'],
  'h3': ['class','id','style'],
  'h4': ['class','id','style'],
  'ul': ['class','id','style'],
  'ol': ['class','id','style'],
  'li': ['class','id','style'],
  'table': ['class','id','style'],
  'tr': ['class','style'],
  'blockquote': ['class','id','style'],
  'figure': ['class','style'],
  'details': ['class','style','open'],
  'summary': ['class','style'],
  'dl': ['class','style'],
  'dt': ['class','style'],
  'dd': ['class','style'],
  'hr': ['class','style'],
  'mark': ['class','style'],
  '*': ['class','id'],
};

function extractParts(html: string): { css: string; body: string } {
  let css = '';
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (styleMatch) css = styleMatch[1];

  let body = html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)(<\/body>|$)/i);
  if (bodyMatch) {
    body = bodyMatch[1];
  } else {
    body = html
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .replace(/<html[^>]*>/gi, '')
      .replace(/<\/html>/gi, '')
      .replace(/<head>[\s\S]*?<\/head>/gi, '')
      .replace(/<body[^>]*>/gi, '')
      .replace(/<\/body>/gi, '');
  }

  // Strip scripts, inline header/footer (we use shared Header)
  body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
  body = body.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  body = body.replace(/<div\s+id="m"[\s\S]*?<\/nav>\s*<\/div>/gi, '');

  return { css, body };
}

function scopeCSS(css: string, scopeClass: string): string {
  const s = '.' + scopeClass;
  let scoped = css;
  // Only replace body/html/:root when used as CSS selectors (start of line, after } or ,)
  // This avoids breaking CSS variables like --fs-body
  scoped = scoped.replace(/(^|[},;\s])html\s*,\s*body\s*(?=\{)/gm, `$1${s} `);
  scoped = scoped.replace(/(^|[},;\s])body\s*(?=\{)/gm, `$1${s} `);
  scoped = scoped.replace(/(^|[},;\s])html\s*(?=\{)/gm, `$1${s} `);
  scoped = scoped.replace(/(^|[},;\s]):root\s*(?=\{)/gm, `$1${s} `);
  // Prefix all other selectors with scope (e.g. .wrap{ -> .article-scoped .wrap{)
  // Match class/element selectors at start of rules
  scoped = scoped.replace(/(^|[},])\s*\.(?!article-scoped)/gm, `$1 ${s} .`);
  return scoped;
}

export default function ArticleContent({ html }: { html: string }) {
  const { css, body } = extractParts(html);
  const scopeClass = 'article-scoped';
  const scopedCSS = scopeCSS(css, scopeClass);

  const cleanBody = sanitizeHtml(body, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRS,
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedStyles: {
      '*': {
        'color': [/.*/],
        'background': [/.*/],
        'background-color': [/.*/],
        'text-align': [/.*/],
        'font-size': [/.*/],
        'font-weight': [/.*/],
        'padding': [/.*/],
        'margin': [/.*/],
        'border': [/.*/],
        'border-radius': [/.*/],
        'display': [/.*/],
        'grid-template-columns': [/.*/],
        'gap': [/.*/],
        'max-width': [/.*/],
        'width': [/.*/],
      },
    },
  });

  return (
    <>
      <style>{scopedCSS}</style>
      <div className={scopeClass} dangerouslySetInnerHTML={{ __html: cleanBody }} />
    </>
  );
}
