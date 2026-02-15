const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../node_modules/react-native-css-interop/dist/runtime/native/render-component.js'
);

let content = fs.readFileSync(filePath, 'utf8');

// Patch the printUpgradeWarning function to not crash when stringifying navigation context
const oldCode = `function printUpgradeWarning(warning, originalProps) {
    console.log(\`CssInterop upgrade warning.\\n\\n\${warning}.\\n\\nThis warning was caused by a component with the props:\\n\${stringify(originalProps)}\\n\\nIf adding or removing sibling components caused this warning you should add a unique "key" prop to your components. https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key\\n\`);
}`;

const newCode = `function printUpgradeWarning(warning, originalProps) {
    // Patched: Avoid stringify which crashes with navigation context
    console.log(\`CssInterop upgrade warning.\\n\\n\${warning}.\\n\\nThis warning was caused by a component. Check your styles.\\n\`);
}`;

if (content.includes(oldCode)) {
  content = content.replace(oldCode, newCode);
  fs.writeFileSync(filePath, content);
  console.log('✅ Patched react-native-css-interop successfully!');
} else if (content.includes('Patched: Avoid stringify')) {
  console.log('✅ react-native-css-interop already patched');
} else {
  console.log('⚠️ Could not find code to patch - the library may have been updated');
}
