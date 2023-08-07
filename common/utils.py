def get_dict_key_by_path(d, path):
    if not isinstance(path, str):
        return d

    path_segments = path.split('.')
    return deep_dict_get(d, path_segments)


def deep_dict_get(d, keys):
    if not keys or d is None:
        return d
    return deep_dict_get(d.get(keys[0]), keys[1:])
