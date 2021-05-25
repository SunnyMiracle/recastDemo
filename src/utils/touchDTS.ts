import * as fs from 'fs';

export default (filePath: string, content: string) => {
  try {
    fs.writeFileSync(filePath, content);
  } catch (e) {
    console.log(e);
  }
}
