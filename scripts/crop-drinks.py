#!/usr/bin/env python3
"""
Recadre les images générées où une bouteille ou un verre de boisson ambrée
apparaît en bordure (le menu de Raja porte la mention halal).
Fractions (gauche, haut, droite, bas) de l'image d'origine. Les originaux sont
conservés dans assets-src/generated/_avant-recadrage/.
"""
import os
from PIL import Image

SRC = "assets-src/generated"
CROPS = {
    "biryani-poulet": (0.0, 0.27, 1.0, 1.0),
    "kottu-boeuf": (0.0, 0.43, 1.0, 1.0),
    "palak-paneer": (0.0, 0.31, 1.0, 1.0),
    "thali": (0.06, 0.13, 0.94, 1.0),
}
os.makedirs(f"{SRC}/_avant-recadrage", exist_ok=True)
for name, (l, t, r, b) in CROPS.items():
    keep = f"{SRC}/_avant-recadrage/{name}.jpg"
    if not os.path.exists(keep):
        os.replace(f"{SRC}/{name}.jpg", keep)
    im = Image.open(keep)
    W, H = im.size
    out = im.crop((round(l * W), round(t * H), round(r * W), round(b * H)))
    out.save(f"{SRC}/{name}.jpg", quality=92)
    print(name, out.size)

# Thali : deux verres restent dans les coins supérieurs → retouche locale (inpainting
# OpenCV) sur le bois flou des coins seulement ; l'assiette n'est pas touchée.
import cv2, numpy as np
im = cv2.imread(f"{SRC}/thali.jpg"); H, W = im.shape[:2]; s = W / 549
m = np.zeros((H, W), np.uint8)
L = np.array([(0, 0), (128, 0), (124, 22), (100, 48), (70, 60), (0, 62)], np.float32) * s
R = np.array([(462, 0), (549, 0), (549, 48), (470, 48)], np.float32) * s
cv2.fillPoly(m, [L.astype(np.int32), R.astype(np.int32)], 255)
cv2.imwrite(f"{SRC}/thali.jpg", cv2.inpaint(im, m, 21, cv2.INPAINT_TELEA), [cv2.IMWRITE_JPEG_QUALITY, 92])
print("thali retouché")
