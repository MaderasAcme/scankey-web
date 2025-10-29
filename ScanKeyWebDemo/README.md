# ScanKey Web Demo

Demo visual simple (GitHub Pages) y documentación base de IA para ScanKey.  
**Objetivo:** tener un flujo visible *Inicio → Escanear (simulado) → Resultados (3 candidatos) → Corrección manual*.

## Estructura
```
/docs            → demo web (GitHub Pages)
/specs           → reglas internas de IA y formatos
/.github         → plantillas de issues y PR
```
Activa GitHub Pages en: **Settings → Pages → Source: `main` / `/docs`**.

## Notas de reglas (resumen)
- 3 candidatos ordenados por `confidence` + explicación breve.
- `high_confidence ≥ 0.95` → aceptar directo.
- `low_confidence < 0.60` → forzar corrección manual.
- Guardado para reentrenamiento si `top ≥ 0.75`, probabilidad `0.75`, máximo **30** imágenes por modelo.
