#!/usr/bin/python3
"""
MRU_cache module
"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRUCache class inherits from BaseCaching and is a caching system"""

    def __init__(self):
        """Initialize MRUCache"""

        super().__init__()
        self.mru_keys = []

    def put(self, key, item):
        """Add an item to the cache"""

        if key is None or item is None:
            return

        if len(self.cache_data) == BaseCaching.MAX_ITEMS \
                and key not in self.cache_data:
            mru_key = self.mru_keys.pop(-1)
            del self.cache_data[mru_key]
            print("DISCARD: {}".format(mru_key))

        self.cache_data[key] = item
        if key in self.mru_keys:
            self.mru_keys.remove(key)
        self.mru_keys.append(key)

    def get(self, key):
        """Retrieve the value linked to the key"""

        if key is None or key not in self.cache_data:
            return None

        if key in self.mru_keys:
            self.mru_keys.remove(key)
        self.mru_keys.append(key)
        return self.cache_data[key]
