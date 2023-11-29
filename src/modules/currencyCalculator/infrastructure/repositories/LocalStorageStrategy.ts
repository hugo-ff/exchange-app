import { StorageStrategy } from "./StorageStrategy";

export class LocalStorageStrategy implements StorageStrategy {
	save(key: string, data: string): void {
		localStorage.setItem(key, data);
	}

	get(key: string): string | null {
		return localStorage.getItem(key);
	}

	remove(key: string): void {
		localStorage.removeItem(key);
	}
}
