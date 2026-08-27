const https = require('https');
const fs = require('fs');

function getCss(url) {
  return new Promise((resolve) => {
    https.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', () => resolve(''));
  });
}

async function main() {
  const [styleCss, mycss, respCss] = await Promise.all([
    getCss('https://www.digitallatte.in/digital-marketing-blog/wp-content/themes/digitallatte/assets/css/style.css'),
    getCss('https://www.digitallatte.in/digital-marketing-blog/wp-content/themes/digitallatte/assets/css/mycss.css'),
    getCss('https://www.digitallatte.in/digital-marketing-blog/wp-content/themes/digitallatte/assets/css/responsive.css')
  ]);

  const allCss = styleCss + '\n' + mycss + '\n' + respCss;
  fs.writeFileSync('blog_live_all.css', allCss);

  console.log('Saved blog_live_all.css, length:', allCss.length);

  const keywords = ['main_blog', '.blog', 'blog-date', '.details', 'mobile_img_blog', 'banner-blog', 'pagination', 'page-numbers'];
  keywords.forEach(kw => {
    console.log(`\n=== SEARCHING FOR "${kw}" ===`);
    let idx = 0;
    while ((idx = allCss.indexOf(kw, idx)) !== null && idx !== -1) {
      console.log(allCss.slice(Math.max(0, idx - 20), idx + 200));
      idx += kw.length + 50;
      if (idx > allCss.length) break;
    }
  });
}

main();
