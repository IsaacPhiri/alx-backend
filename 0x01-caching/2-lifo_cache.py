#!/usr/bin/env python3
"""
LIFO module
"""


from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache class """

    def __init__(self):
        """ Constructor """
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            last = self.queue.pop()
            del self.cache_data[last]
            print("DISCARD: {}".format(last))

        self.cache_data[key] = item
        self.queue.append(key)

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None

        return self.cache_data[key]
