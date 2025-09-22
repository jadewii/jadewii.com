#!/bin/bash

# Deploy JAde Wii Music Store to GitHub Pages

echo "🎵 Deploying JAde Wii Music Store to GitHub Pages..."
echo ""

# 1. Create gh-pages branch with static files
echo "📦 Creating gh-pages branch..."
git checkout --orphan gh-pages
git rm -rf .
cp -r out/* .
rm -rf out

# 2. Create .nojekyll file to prevent Jekyll processing
touch .nojekyll

# 3. Add custom domain file
echo "jadewii.com" > CNAME

# 4. Commit all files
echo "📝 Committing static files..."
git add .
git commit -m "Deploy static site to GitHub Pages"

# 5. Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin gh-pages --force

# 6. Switch back to main branch
git checkout main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/jadewii/jadewii.com/settings/pages"
echo "2. Verify 'Source' is set to 'Deploy from branch' and 'gh-pages'"
echo "3. Custom domain should show 'jadewii.com'"
echo ""
echo "For DNS setup in Wix:"
echo "Add these A records:"
echo "  185.199.108.153"
echo "  185.199.109.153"
echo "  185.199.110.153"
echo "  185.199.111.153"
echo "And CNAME record:"
echo "  www -> jadewii.github.io"
echo ""
echo "Your site will be live at https://jadewii.com once DNS propagates!"