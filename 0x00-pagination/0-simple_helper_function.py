#!/usr/bin/env python3
"""
This module contains a function named index_range.
"""


from typing import Tuple


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
