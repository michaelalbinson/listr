import * as path from 'path';
import { getFilesRecursively, findUniqueFiles, FileInfo } from '../src';

describe('Directory Comparison Tests', () => {
  const testResourcesPath = path.join(__dirname, '..', 'test', 'resources');

  describe('getFilesRecursively', () => {
    it('should list all files in a directory recursively', async () => {
      const testDir = path.join(testResourcesPath, 'test-case-2-same/test-dir-1');
      const files: FileInfo[] = await getFilesRecursively(testDir);
      
      // Check that we found the expected number of files
      expect(files.length).toBeGreaterThan(0);
      
      // Verify each file has the expected structure
      files.forEach((file: FileInfo) => {
        expect(file).toHaveProperty('relativePath');
        expect(file).toHaveProperty('fullPath');
        expect(file.fullPath).toContain(testDir);
      });
    });
  });

  describe('findUniqueFiles', () => {
    it('should find files unique to each directory', async () => {
      const dir1 = path.join(testResourcesPath, 'test-case-1-differences/test-dir-1');
      const dir2 = path.join(testResourcesPath, 'test-case-1-differences/test-dir-2');
      
      const [files1, files2]: [FileInfo[], FileInfo[]] = await Promise.all([
        getFilesRecursively(dir1),
        getFilesRecursively(dir2)
      ]);
      
      const { uniqueToFirst, uniqueToSecond } = findUniqueFiles(files1, files2);
      
      // Verify we found some unique files
      expect(uniqueToFirst.length).toBeGreaterThan(0);
      expect(uniqueToSecond.length).toBeGreaterThan(0);
    });
  });

  describe('Directory Comparison', () => {
    it('should find no differences in identical directories', async () => {
      const dir1 = path.join(testResourcesPath, 'test-case-2-same/test-dir-1');
      const dir2 = path.join(testResourcesPath, 'test-case-2-same/test-dir-1');
      
      const [files1, files2]: [FileInfo[], FileInfo[]] = await Promise.all([
        getFilesRecursively(dir1),
        getFilesRecursively(dir2)
      ]);
      
      const { uniqueToFirst, uniqueToSecond } = findUniqueFiles(files1, files2);
      
      expect(uniqueToFirst).toHaveLength(0);
      expect(uniqueToSecond).toHaveLength(0);
    });
  });
});
