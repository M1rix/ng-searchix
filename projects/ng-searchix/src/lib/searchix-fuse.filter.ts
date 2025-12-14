import { SearchItem } from './models';
import Fuse, { IFuseOptions } from 'fuse.js';

export function createFuseFilter(
    options?: IFuseOptions<SearchItem>
): (q: string, items: SearchItem[]) => SearchItem[] {

    let fuse: Fuse<SearchItem> | null = null;

    return (q: string, items: SearchItem[]) => {
        if (!q) return items;

        if (!fuse || fuse.getIndex().toJSON().records.length !== items.length) {
            fuse = new Fuse(items, {
                keys: ['title', 'subtitle'],
                threshold: 0.35,
                ignoreLocation: true,
                ...options
            });
        }

        return fuse.search(q).map(r => r.item);
    };
}
