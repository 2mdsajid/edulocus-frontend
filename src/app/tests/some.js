const fs = require('fs');
const path = require('path');

// List of test types (as defined in your enum)
const testTypes = [
  'MODEL',
  'SUBJECT_WISE',
  'CHAPTER_WISE',
  'TOPIC_WISE',
  'CUSTOM',
  'UNIT_WISE',
  'DIFFICULTY_BASED',
  'RANDOM',
  'FLASH',
  'AI_GENERATED',
  'PERFORMANCE_ANALYZER',
  'PBQ_BASED',
  'THEORY_BASED',
  'REVISION',
  'RETAKE'
];

// Function to create the folder structure for each test type
function createFolderStructure(testType) {
  // Convert the test type to lowercase and remove underscores
  const folderName = testType.toLowerCase().replace(/_/g, '');

  // Define the base folder structure
  const basePath = path.join(__dirname, folderName, '_components');
  
  // Ensure directories are created
  fs.mkdirSync(basePath, { recursive: true });

  // Create the required files
  const files = [
    { filePath: path.join(basePath, 'schema.ts'), content: '// Schema definitions' },
    { filePath: path.join(basePath, 'actions.ts'), content: '// Actions for this route' },
    { filePath: path.join(__dirname, folderName, 'page.tsx'), content: '// Page content' },
  ];

  // Write files
  files.forEach(file => {
    fs.writeFileSync(file.filePath, file.content, 'utf8');
    console.log(`Created: ${file.filePath}`);
  });
}

// Iterate over the test types and create the folder structure for each
testTypes.forEach(createFolderStructure);

console.log('Folders and files have been created successfully.');
