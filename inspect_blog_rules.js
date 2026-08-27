const fs = require('fs');
const allCss = fs.readFileSync('blog_live_all.css', 'utf8');

const targets = ['main_blog', '.blog ', '.blog{', 'blogmain_bg', 'whats_new'];
targets.forEach(t => {
  console.log(`\n================== TARGET: ${t} ==================`);
  let idx = 0;
  while ((idx = allCss.indexOf(t, idx)) !== -1) {
    console.log(allCss.slice(Math.max(0, idx - 30), idx + 350));
    idx += t.length + 50;
    if (idx > allCss.length) break;
  }
});
