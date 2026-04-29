#!/usr/bin/env python3
from __future__ import annotations

import math
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"

COLORS = {
    "ink": (34, 29, 36),
    "plum": (96, 67, 91),
    "pink": (255, 83, 157),
    "pink_soft": (255, 218, 237),
    "lavender": (226, 215, 255),
    "white": (255, 255, 255),
    "shadow": (44, 36, 46),
}


def mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(round(a[i] * (1 - t) + b[i] * t) for i in range(3))


def png_chunk(kind: bytes, data: bytes) -> bytes:
    return (
        struct.pack(">I", len(data))
        + kind
        + data
        + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)
    )


def write_png(path: Path, width: int, height: int, pixels: bytearray) -> None:
    raw = bytearray()
    row_len = width * 4
    for y in range(height):
        raw.append(0)
        start = y * row_len
        raw.extend(pixels[start : start + row_len])

    data = (
        b"\x89PNG\r\n\x1a\n"
        + png_chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
        + png_chunk(b"IDAT", zlib.compress(bytes(raw), 9))
        + png_chunk(b"IEND", b"")
    )
    path.write_bytes(data)


class Canvas:
    def __init__(self, width: int, height: int, transparent: bool = False) -> None:
        self.width = width
        self.height = height
        self.pixels = bytearray(width * height * 4)
        if not transparent:
            self.fill_gradient()

    def fill_gradient(self) -> None:
        for y in range(self.height):
            for x in range(self.width):
                self.set_px(x, y, (*COLORS["white"], 255))

    def set_px(self, x: int, y: int, rgba: tuple[int, int, int, int]) -> None:
        if x < 0 or y < 0 or x >= self.width or y >= self.height:
            return
        i = (y * self.width + x) * 4
        self.pixels[i : i + 4] = bytes(rgba)

    def blend_px(self, x: int, y: int, rgba: tuple[int, int, int, int]) -> None:
        if x < 0 or y < 0 or x >= self.width or y >= self.height:
            return
        src_a = rgba[3] / 255
        if src_a <= 0:
            return
        i = (y * self.width + x) * 4
        dst_a = self.pixels[i + 3] / 255
        out_a = src_a + dst_a * (1 - src_a)
        if out_a <= 0:
            return
        for channel in range(3):
            src = rgba[channel] / 255
            dst = self.pixels[i + channel] / 255
            out = (src * src_a + dst * dst_a * (1 - src_a)) / out_a
            self.pixels[i + channel] = max(0, min(255, round(out * 255)))
        self.pixels[i + 3] = max(0, min(255, round(out_a * 255)))

    def circle(self, cx: float, cy: float, radius: float, color: tuple[int, int, int], alpha: int) -> None:
        min_x = math.floor(cx - radius)
        max_x = math.ceil(cx + radius)
        min_y = math.floor(cy - radius)
        max_y = math.ceil(cy + radius)
        r2 = radius * radius
        fade = max(1.0, radius * 0.03)
        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                d = math.sqrt((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2)
                if d <= radius:
                    edge = min(1.0, max(0.0, (radius - d) / fade))
                    self.blend_px(x, y, (*color, round(alpha * edge)))

    def rounded_rect(
        self,
        left: float,
        top: float,
        right: float,
        bottom: float,
        radius: float,
        color: tuple[int, int, int],
        alpha: int,
    ) -> None:
        min_x = math.floor(left)
        max_x = math.ceil(right)
        min_y = math.floor(top)
        max_y = math.ceil(bottom)
        fade = max(1.0, radius * 0.04)
        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                px = x + 0.5
                py = y + 0.5
                qx = max(left + radius - px, 0, px - (right - radius))
                qy = max(top + radius - py, 0, py - (bottom - radius))
                outside = math.sqrt(qx * qx + qy * qy)
                if outside <= radius:
                    edge = min(1.0, max(0.0, (radius - outside) / fade))
                    self.blend_px(x, y, (*color, round(alpha * edge)))

    def diamond(
        self,
        cx: float,
        cy: float,
        half_w: float,
        half_h: float,
        color: tuple[int, int, int],
        alpha: int,
    ) -> None:
        min_x = math.floor(cx - half_w)
        max_x = math.ceil(cx + half_w)
        min_y = math.floor(cy - half_h)
        max_y = math.ceil(cy + half_h)
        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                dist = abs((x + 0.5 - cx) / half_w) + abs((y + 0.5 - cy) / half_h)
                if dist <= 1:
                    self.blend_px(x, y, (*color, round(alpha * min(1, (1 - dist) * 8))))


def downsample(canvas: Canvas, factor: int) -> bytearray:
    width = canvas.width // factor
    height = canvas.height // factor
    out = bytearray(width * height * 4)
    for y in range(height):
        for x in range(width):
            totals = [0, 0, 0, 0]
            for yy in range(factor):
                for xx in range(factor):
                    i = ((y * factor + yy) * canvas.width + (x * factor + xx)) * 4
                    for c in range(4):
                        totals[c] += canvas.pixels[i + c]
            o = (y * width + x) * 4
            scale = factor * factor
            out[o : o + 4] = bytes(round(v / scale) for v in totals)
    return out


def draw_mark(canvas: Canvas, scale: float = 1.0, offset_y: float = 0.0, with_shadow: bool = True) -> None:
    s = canvas.width / 1024 * scale
    ox = canvas.width / 2
    oy = canvas.height / 2 + offset_y * s

    ink = COLORS["ink"]

    # 팝업메이트 mark: a mono popup frame with one bubble escaping the corner.
    canvas.rounded_rect(ox - 236 * s, oy - 176 * s, ox + 102 * s, oy - 64 * s, 56 * s, ink, 255)
    canvas.rounded_rect(ox - 236 * s, oy - 176 * s, ox - 124 * s, oy + 202 * s, 56 * s, ink, 255)
    canvas.rounded_rect(ox - 236 * s, oy + 90 * s, ox + 134 * s, oy + 202 * s, 56 * s, ink, 255)

    canvas.circle(ox + 154 * s, oy - 136 * s, 126 * s, ink, 255)
    canvas.circle(ox + 154 * s, oy - 136 * s, 54 * s, COLORS["white"], 255)
    canvas.circle(ox + 146 * s, oy + 112 * s, 50 * s, ink, 255)


def make_icon(size: int, path: Path) -> None:
    factor = 2 if size >= 512 else 4
    canvas = Canvas(size * factor, size * factor)
    draw_mark(canvas)
    write_png(path, size, size, downsample(canvas, factor))


def make_foreground(size: int, path: Path) -> None:
    factor = 2 if size >= 512 else 4
    canvas = Canvas(size * factor, size * factor, transparent=True)
    draw_mark(canvas, scale=0.92, with_shadow=False)
    write_png(path, size, size, downsample(canvas, factor))


def main() -> None:
    ASSETS.mkdir(exist_ok=True)
    make_icon(1024, ASSETS / "icon.png")
    make_foreground(1024, ASSETS / "adaptive-icon.png")
    make_foreground(1024, ASSETS / "splash-icon.png")
    make_icon(48, ASSETS / "favicon.png")


if __name__ == "__main__":
    main()
