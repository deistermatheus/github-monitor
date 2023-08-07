from ..utils import get_dict_key_by_path

import unittest


class GetDictionaryKeyByPathTesst(unittest.TestCase):
    def setUp(self):
        self.default_dict = {"something": "something_value",
                             "nested": {"innerDict": {"key": "value"}}}

    def test_no_dict(self):
        result = get_dict_key_by_path(None, 'path')
        self.assertEqual(result, None)

    def test_no_key(self):
        result = get_dict_key_by_path(self.default_dict, None)
        self.assertEqual(result, self.default_dict)

    def test_nesting(self):
        result = get_dict_key_by_path(
            self.default_dict, 'nested.innerDict.key')
        self.assertEqual(
            result, self.default_dict['nested']['innerDict']['key'])

    def test_path_without_dots(self):
        result = get_dict_key_by_path(self.default_dict, 'something')
        self.assertEqual(result, self.default_dict['something'])
