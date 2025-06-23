#!node

import {program} from 'commander';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface FileInfo {
	relativePath: string;
	fullPath: string;
}

export async function getFilesRecursively(dir: string, baseDir: string = dir): Promise<FileInfo[]> {
	const entries = await fs.readdir(dir, {withFileTypes: true});
	const files = await Promise.all(entries.map(async (entry) => {
		const fullPath = path.join(dir, entry.name);
		const relativePath = path.relative(baseDir, fullPath);

		if (entry.isDirectory())
			return getFilesRecursively(fullPath, baseDir);
		else
			return [{relativePath, fullPath}];
	}));
	return files.flat();
}

export function findUniqueFiles(files1: FileInfo[], files2: FileInfo[]) {
	const files1Set = new Set(files1.map(f => f.relativePath));
	const files2Set = new Set(files2.map(f => f.relativePath));

	const uniqueToFirst = files1.filter(f => !files2Set.has(f.relativePath));
	const uniqueToSecond = files2.filter(f => !files1Set.has(f.relativePath));

	return {uniqueToFirst, uniqueToSecond};
}

async function main() {
	program
		.name('list')
		.description('Compare two directories and list files unique to each')
		.argument('<dir1>', 'first directory to compare')
		.argument('<dir2>', 'second directory to compare')
		.option('-1, --one', 'only show files unique to the first directory')
		.option('-2, --two', 'only show files unique to the second directory')
		.option('--no-summary', 'skip the summary statistics')
		.action(async (dir1: string, dir2: string, options: any) => {
			try {
				// Read both directories
				const [files1, files2] = await Promise.all([getFilesRecursively(dir1), getFilesRecursively(dir2)]);

				// Find unique files
				const {uniqueToFirst, uniqueToSecond} = findUniqueFiles(files1, files2);

				// Output results based on options
				if (!options.one && !options.two) {
					if (uniqueToFirst.length > 0) {
						console.log('\nFiles only in first directory:');
						uniqueToFirst.forEach(file => console.log(`  ${file.fullPath}`));
					}

					if (uniqueToSecond.length > 0) {
						console.log('\nFiles only in second directory:');
						uniqueToSecond.forEach(file => console.log(`  ${file.fullPath}`));
					}
				} else if (options.one)
					uniqueToFirst.forEach(file => console.log(file.fullPath));
				else if (options.two)
					uniqueToSecond.forEach(file => console.log(file.fullPath));

				if (options.noSummary === true)
					return;

				// Print summary if not disabled
				console.log(`\nSummary:`);
				console.log(`  Files only in first directory: ${uniqueToFirst.length}`);
				console.log(`  Files only in second directory: ${uniqueToSecond.length}`);
			} catch (error) {
				console.error('Error:', error instanceof Error ? error.message : String(error));
				process.exit(1);
			}
		});

	await program.parseAsync(process.argv);
}

if (require.main === module) {
	main().catch(console.error);
}
