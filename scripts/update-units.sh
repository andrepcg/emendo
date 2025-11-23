#!/bin/bash

# Script to update healthcare units data from the official source

echo "🏥 Updating healthcare units data..."

# Download the latest data
curl -s "https://bicsp.min-saude.pt/pt/biufs/2/927/20027/2060914/_vti_bin/SPMS.BICSP.SharePoint/Query.svc/GetUFS" -o src/config/units.json

if [ $? -eq 0 ]; then
  echo "✅ Data downloaded successfully to src/config/units.json"

  # Copy to public folder
  mkdir -p public/data
  cp src/config/units.json public/config/units.json
  echo "✅ Copied to public/config/units.json"

  # Show stats
  echo ""
  echo "📊 Data Summary:"
  echo "  - ARS: $(grep -o '"ARSList":\[' src/config/units.json | wc -l) regions"
  echo "  - ULS: $(grep -c '"ParentCode":' src/config/units.json | head -1) units"

  echo ""
  echo "💡 Next steps:"
  echo "  1. Review the changes: git diff src/config/units.json"
  echo "  2. Commit if needed: git add src/config/units.json public/config/units.json"
  echo "  3. Rebuild site: npm run build"
else
  echo "❌ Failed to download data"
  exit 1
fi

