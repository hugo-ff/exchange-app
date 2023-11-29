export interface StorageStrategy {
	save(key: string, data: string): void;
	get(key: string): string | null;
	remove(key: string): void;
}
