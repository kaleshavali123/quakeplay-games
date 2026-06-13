const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

// 1. Set your live custom domain here
const hostname = 'https://quakeplay.com'; 

// 2. List all the navigation routes your app uses
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/games', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.5 },
  // Add any other routes you have here (e.g., /leaderboard, /profile)
];

async function generateSitemap() {
  try {
    const stream = new SitemapStream({ hostname });
    links.forEach(link => stream.write(link));
    stream.end();

    const sitemapOutput = await streamToPromise(stream);
    
    // Writes the file directly to your public folder so Vercel can host it
    fs.writeFileSync('./public/sitemap.xml', sitemapOutput.toString());
    console.log('✅ sitemap.xml successfully generated in the public folder!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

generateSitemap();