#!/usr/bin/python3
"""
LRU cache module
"""


from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """LRU cache implementation"""

    def __init__(self):
        """Constructor"""
        super().__init__()
        self.__keys = []

    def put(self, key, item):
        """Add an item to the cache"""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.__keys.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            lru_key = self.__keys.pop(0)
            del self.cache_data[lru_key]
            print("DISCARD:", lru_key)

        self.__keys.append(key)
        self.cache_data[key] = item

    def get(self, key):
        """Get an item from the cache"""
        if key is None or key not in self.cache_data:
            return None

        self.__keys.remove(key)
        self.__keys.append(key)
        return self.cache_data[key]
