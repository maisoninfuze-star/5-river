#!/usr/bin/env python3
"""
Retire les bouteilles et verres de boisson ambrée de l'arrière-plan des images générées
(le menu 5 Rivers porte la mention halal : aucune boisson qui ressemble à de l'alcool).
Utilise fal-ai/nano-banana-pro/edit. Les plats étant eux-mêmes des images illustratives
générées, l'édition ne trahit aucune vraie photo du restaurant.

  FAL_KEY=... python3 scripts/clean-backgrounds.py hero thali ...
"""
import base64, io, json, os, sys, time, urllib.request
from PIL import Image

KEY = os.environ["FAL_KEY"]
SRC = "assets-src/generated"
PROMPT = ("Remove every bottle and every drinking glass or cup from the scene, especially any glass with amber, "
          "golden or brown liquid. Fill those areas naturally with the same softly blurred dark wooden table, "
          "burgundy linen and warm background. Keep the food, plates, bowls, lighting, framing and colours "
          "exactly as they are. Photorealistic, no text.")

def edit(name, ratio):
    path = f"{SRC}/{name}.jpg"
    # Entrée réduite (≤ 1600 px) : les gros data-URI font échouer la requête.
    im = Image.open(path).convert("RGB"); im.thumbnail((1600, 1600))
    buf = io.BytesIO(); im.save(buf, "JPEG", quality=90)
    uri = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()
    body = json.dumps({"prompt": PROMPT, "image_urls": [uri], "num_images": 1,
                       "aspect_ratio": ratio, "resolution": "2K", "output_format": "jpeg"}).encode()
    for attempt in range(3):
        try:
            req = urllib.request.Request("https://fal.run/fal-ai/nano-banana-pro/edit", data=body,
                headers={"Authorization": f"Key {KEY}", "Content-Type": "application/json"})
            res = json.load(urllib.request.urlopen(req, timeout=300))
            img = res["images"][0]
            os.makedirs(f"{SRC}/_avant-nettoyage", exist_ok=True)
            os.replace(path, f"{SRC}/_avant-nettoyage/{name}.jpg")
            urllib.request.urlretrieve(img["url"], path)
            print("ok", name, img.get("width"), img.get("height"))
            return
        except Exception as e:
            print("!", name, attempt, e); time.sleep(4 * (attempt + 1) ** 2)

for n in sys.argv[1:]:
    edit(n, "3:2" if n == "thali" else "4:5")
