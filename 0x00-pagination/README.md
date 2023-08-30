# 0x00-pagination
## Description
This is the first project in the Holberton School System Engineering & DevOps track. In this project, we learn about pagination and how to paginate a dataset of arbitrary size.
## Files
- [0-simple_helper_function.py](0-simple_helper_function.py)
- [1-simple_pagination.py](1-simple_pagination.py)
- [2-hypermedia_pagination.py](2-hypermedia_pagination.py)
- [3-hypermedia_del_pagination.py](3-hypermedia_del_pagination.py)
## Author
- Isaac Phiri
## License
MIT
## Acknowledgements
- The amazing staff at Holberton School who are always available to help and provide the tools to succeed.
### 0-simple_helper_function.py
This is a helper function that takes two integer arguments `page` and `page_size` and returns a tuple of size two containing a start index and an end index corresponding to the range of indexes to return in a list for those particular pagination parameters.
### 1-simple_pagination.py
This is a function that takes the same arguments as `0-simple_helper_function.py` and returns a slice of the list `dataset` determined by those pagination parameters.
### 2-hypermedia_pagination.py
This is a function that takes the same arguments as `1-simple_pagination.py` and returns a dictionary containing the following key-value pairs:
* `page_size`: the length of the returned dataset page
* `page`: the current page number
* `data`: the dataset page (equivalent to return from `1-simple_pagination.py`)
* `next_page`: number of the next page, `None` if no next page
* `prev_page`: number of the previous page, `None` if no previous page
* `total_pages`: the total number of pages in the dataset as an integer
### 3-hypermedia_del_pagination.py
This is a function that takes the same arguments as `2-hypermedia_pagination.py` and returns a dictionary containing the following key-value pairs:
* `page_size`: the length of the returned dataset page
* `page`: the current page number
* `data`: the dataset page (equivalent to return from `1-simple_pagination.py`)
* `next_page`: number of the next page, `None` if no next page
* `prev_page`: number of the previous page, `None` if no previous page
* `total_pages`: the total number of pages in the dataset as an integer
* `next_page_url`: the URL to the next page
* `prev_page_url`: the URL to the previous page
* `first_page_url`: the URL to the first page
* `last_page_url`: the URL to the last page
