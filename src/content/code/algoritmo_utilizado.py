def _steinfeld_pure(img_bin):
    """STEINFELD: Afinamento por erosao iterativa.
    A cada passo: erode -> dilate -> subtrai do original -> uniao com esqueleto.
    Para quando nao ha mais pixels brancos no objeto."""
    h, w = img_bin.shape
    skeleton = np.zeros((h, w), dtype=np.uint8)
    current = img_bin.copy()
    safety_limit = 1000

    for _ in range(safety_limit):
        # Erosao manual
        eroded = np.zeros((h, w), dtype=np.uint8)
        for y in range(1, h - 1):
            for x in range(1, w - 1):
                if current[y, x] == 255:
                    todos = True
                    for ky in range(-1, 2):
                        for kx in range(-1, 2):
                            if (ky != 0 or kx != 0) and current[y + ky, x + kx] == 0:
                                todos = False
                                break
                        if not todos:
                            break
                    if todos:
                        eroded[y, x] = 255

        # Dilatacao manual
        dilated = np.zeros((h, w), dtype=np.uint8)
        for y in range(1, h - 1):
            for x in range(1, w - 1):
                if eroded[y, x] == 255:
                    for ky in range(-1, 2):
                        for kx in range(-1, 2):
                            if ky == 0 and kx == 0:
                                continue
                            ny, nx = y + ky, x + kx
                            if 0 <= ny < h and 0 <= nx < w:
                                dilated[ny, nx] = 255

        # Subtracao: current - dilated
        diff = np.zeros((h, w), dtype=np.uint8)
        for y in range(h):
            for x in range(w):
                if current[y, x] == 255 and dilated[y, x] == 0:
                    diff[y, x] = 255

        # Uniao com esqueleto
        for y in range(h):
            for x in range(w):
                if diff[y, x] == 255:
                    skeleton[y, x] = 255

        current = eroded.copy()

        # Parada: sem pixels brancos
        tem = False
        for y in range(h):
            for x in range(w):
                if current[y, x] == 255:
                    tem = True
                    break
            if tem:
                break
        if not tem:
            break

    return skeleton


