#!/usr/bin/env python3
"""
This module contains a function named index_range.
"""


from typing import Tuple
import csv
import math
from typing import List


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Return a tuple of size two containing a start index and an end index
    corresponding to the range of indexes to return in a list for those
    particular pagination parameters.

    Args:
    - page (int): page number, 1-indexed
    - page_size (int): number of items per page

    Returns:
    - tuple (int, int): tuple containing start and end index
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)

class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        assert isinstance(page, int) and page > 0, \
                "page must be a positive integer"
        assert isinstance(page_size, int) and page_size > 0, \
                "page_size must be a positive integer"

        dataset = self.dataset()
        if not dataset:
            return []

        start, end = index_range(page, page_size)
        if start >= len(dataset):
            return []

        return dataset[start:end]