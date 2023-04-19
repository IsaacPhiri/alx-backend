#!/usr/bin/env python3
"""
basic_cache module
"""


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    basicCache class
    """

    def put(self, key, item):
        """
        Adds items to the cache
        """

        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """
        Retrieves itmes from the cache
        """

        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
