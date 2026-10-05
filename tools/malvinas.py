# -*- coding: utf-8 -*-
"""Genera img/malvinas.png: silueta de las Malvinas sobre la bandera argentina."""
import math, sys
from PIL import Image, ImageDraw

W, H = 560, 360          # 14:9, la proporcion oficial de la bandera
S = 4                    # supersampling
CELESTE = (116, 172, 223, 255)
BLANCO  = (255, 255, 255, 255)
SOL     = (246, 180, 14, 255)
SOL_BOR = (133, 52, 10, 255)
TIERRA  = (14, 18, 26, 255)
BORDE   = (255, 255, 255, 255)

# --- Islas en espacio "geografico" 1000 x 625 ---------------------------------
# Contornos trazados sobre accidentes reales (Cabo Delfin, Cabo Pembroke,
# seno Choiseul, istmo de Darwin, Cabo Meredith, bahia San Carlos...).
# Espacio geografico: x = lon -61.4W..-57.65W, y = lat 51.2S..52.42S
SOLEDAD = [
    (659, 30), (747, 56), (800, 77), (867, 94), (920,112),   # costa norte -> Cabo Bougainville
    (875,154), (944,210), (984,206),                         # bahia de la Anunciacion, Pto Argentino, Cabo Pembroke
    (907,266), (853,291),                                    # costa este hacia el sur
    (733,313), (672,300),                                    # seno Choiseul penetra al oeste
    (700,336), (773,343), (787,386),                         # Lafonia: costa este
    (733,429), (667,480), (587,493),                         # punta sur de Lafonia
    (547,450), (533,386),                                    # Lafonia: costa oeste
    (587,330), (632,296),                                    # bahia Grantham
    (636,272), (640,236),                                    # istmo de Darwin
    (627,172), (680,150), (653,107), (640, 64),              # bahia San Carlos y costa noroeste
]
GRAN_MALVINA = [
    (253, 26), (333, 56), (387, 77),                         # costa norte
    (405,137), (501,180),                                    # costa este (estrecho de San Carlos)
    (448,249), (365,321), (293,364),                         # bahia Fox hacia el sudoeste
    (187,428), (139,458),                                    # Cabo Meredith (punta sur)
    (120,386), (80,334), (27,279),                           # costa oeste
    (133,223),                                               # bahia Reina Guillermina
    (80,172), (120,108),
    (213, 86), (227, 43),                                    # bahia San Francisco de Paula
]
ISLAS = [SOLEDAD, GRAN_MALVINA]

def suavizar(poly, vueltas=3):
    """Chaikin: redondea el poligono para que la costa no parezca un recorte."""
    for _ in range(vueltas):
        nuevo = []
        n = len(poly)
        for i in range(n):
            x0, y0 = poly[i]; x1, y1 = poly[(i+1) % n]
            nuevo.append((0.75*x0 + 0.25*x1, 0.75*y0 + 0.25*y1))
            nuevo.append((0.25*x0 + 0.75*x1, 0.25*y0 + 0.75*y1))
        poly = nuevo
    return poly


def encuadrar(islas, ancho, alto, margen_x, margen_y):
    """Escala y centra las islas dentro del lienzo respetando la proporcion."""
    pts = [p for isla in islas for p in isla]
    x0 = min(p[0] for p in pts); x1 = max(p[0] for p in pts)
    y0 = min(p[1] for p in pts); y1 = max(p[1] for p in pts)
    k = min((ancho - 2*margen_x) / (x1-x0), (alto - 2*margen_y) / (y1-y0))
    dx = (ancho - (x1-x0)*k) / 2 - x0*k
    dy = (alto  - (y1-y0)*k) / 2 - y0*k
    return [[(p[0]*k+dx, p[1]*k+dy) for p in isla] for isla in islas]

def sol_de_mayo(d, cx, cy, r, rayos=32):
    """Sol de Mayo: 32 rayos alternados (rectos y flamigeros) + disco central."""
    for i in range(rayos):
        a = 2*math.pi*i/rayos
        largo = r*2.35 if i % 2 == 0 else r*2.05
        ancho = 0.030 if i % 2 == 0 else 0.042
        p = [(cx + math.cos(a)*largo,           cy + math.sin(a)*largo),
             (cx + math.cos(a+ancho)*r*0.98,    cy + math.sin(a+ancho)*r*0.98),
             (cx + math.cos(a-ancho)*r*0.98,    cy + math.sin(a-ancho)*r*0.98)]
        d.polygon(p, fill=SOL, outline=SOL_BOR, width=max(1, S//2))
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=SOL, outline=SOL_BOR, width=S)

def generar(destino, escala_islas=0.74):
    w, h = W*S, H*S
    img = Image.new("RGBA", (w, h), CELESTE)
    d = ImageDraw.Draw(img)

    # Bandas: celeste / blanco / celeste
    d.rectangle([0, h/3, w, 2*h/3], fill=BLANCO)

    # Sol de Mayo centrado en la banda blanca
    sol_de_mayo(d, w/2, h/2, r=h*0.058)

    # Islas
    margen = (1 - escala_islas) / 2
    for isla in encuadrar(ISLAS, w, h, w*margen, h*margen*1.15):
        d.polygon(suavizar(isla), fill=TIERRA, outline=BORDE, width=int(2*S))

    # Esquinas redondeadas
    mascara = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mascara).rounded_rectangle([0, 0, w-1, h-1], radius=int(26*S), fill=255)
    img.putalpha(mascara)

    img.resize((W, H), Image.LANCZOS).save(destino, "PNG", optimize=True)
    print("ok ->", destino)

if __name__ == "__main__":
    generar(sys.argv[1] if len(sys.argv) > 1 else "malvinas.png")
