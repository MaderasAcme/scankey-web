# Perfiles internos (IA)

Registros que guían a la IA a distinguir llaves parecidas. No son visibles para el usuario.

## Campos
- id_profile: único, p.ej. `JMA_TE8I_L`
- key_shape_signature: vector numérico del contorno
- head_geometry: forma del cabezal (rectangular/oval/T…)
- orientation_hint: izquierda/derecha/simétrica
- pattern_class: familia (TE8, CISA-L…)
- texture_index: brillo/mate/cromado
- last_training_samples: nº de imágenes actuales

## Uso
Estos perfiles ponderan el ranking final junto con OCR y similitud visual.
