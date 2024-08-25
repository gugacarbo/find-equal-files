export function parsePath(path = '', max = 1, last = 2): string {
	const parts = path.replace(/\\\\/g, '/').replace(/\\/g, '/').split('/');

	if (parts.length <= max + last) {
		return parts.join('/');
	}
	return `${parts.slice(0, max).join('/')}/.../${parts.slice(-last).join('/')}`;
}
