import fs from 'fs';
import { copyFile } from 'node:fs/promises';

const BUILD_DIR = 'dist';

const processingServerConfig = async () => {
	if (!fs.existsSync(BUILD_DIR)) fs.mkdirSync(BUILD_DIR);

	await copyFile('./php/index.php', `./${BUILD_DIR}/index.php`);
	await copyFile('./php/send.php', `./${BUILD_DIR}/send.php`);
	await copyFile('./php/send_dev.php', `./${BUILD_DIR}/send_dev.php`);
};

processingServerConfig().catch((e) => console.error(e));
