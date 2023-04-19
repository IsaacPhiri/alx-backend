#!/usr/bin/env python3
""" 
LFU Cache module
"""


from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFU Cache """

    def __init__(self):
        """ Constructor """
        super().__init__()
        self.frequency = {}
        self.used_frequency = {}
        self.min_frequency = 0

    def update_frequency(self, key):
        """ Update frequency of key """
        if key in self.frequency:
            frequency = self.frequency[key]
            del self.used_frequency[frequency][key]
            if not self.used_frequency[frequency]\
                    and frequency == self.min_frequency:
                self.min_frequency += 1
                del self.used_frequency[frequency]
            frequency += 1
            self.frequency[key] = frequency
            if frequency not in self.used_frequency:
                self.used_frequency[frequency] = {}
            self.used_frequency[frequency][key] = True
        else:
            self.frequency[key] = 1
            if 1 not in self.used_frequency:
                self.used_frequency[1] = {}
            self.used_frequency[1][key] = True
            self.min_frequency = 1

    def put(self, key, item):
        """ Add an item to the cache """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            self.update_frequency(key)
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            discarded = self.used_frequency\
                    [self.min_frequency].popitem(last=False)
            del self.cache_data[discarded[0]]
            del self.frequency[discarded[0]]

        self.cache_data[key] = item
        self.update_frequency(key)

    def get(self, key):
        """ Retrieve an item from the cache """
        if key is None or key not in self.cache_data:
            return None

        self.update_frequency(key)
        return self.cache_data[key]
