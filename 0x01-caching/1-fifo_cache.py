#!/usr/bin/env python3
""" FIFO Cache module
"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache defines:
      - caching system following FIFO algorithm
    """

    def __init__(self):
        """ Initialize
        """
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is None or item is None:
            return

        self.cache_data[key] = item
        self.queue.append(key)

        if len(self.cache_data) > self.MAX_ITEMS:
            first = self.queue.pop(0)
            del self.cache_data[first]
            print("DISCARD: {}".format(first))

    def get(self, key):
        """ Get an item by key
        """
        if key is None or key not in self.cache_data:
            return None

        return self.cache_data[key]

