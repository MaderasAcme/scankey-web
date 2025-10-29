# Flujo interno de inferencia IA

## Pipeline básico
1. Preprocesamiento → OCR → Detección marca/modelo/orientación
2. Ranking por similitud visual (ANN) + OCR + tipo
3. Generación de JSON resultado (ver IA_OUTPUT_FORMAT.json)
4. Envío opcional a API / Reentrenamiento

## Reglas de almacenamiento
- Máx 30 imágenes por modelo
- Solo si `confidence ≥ 0.75`
- Probabilidad de guardado: 0.75
- No guardar duplicados en corto intervalo
