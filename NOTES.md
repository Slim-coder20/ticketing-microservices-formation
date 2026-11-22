# Notes de formation : versions obsolètes et équivalents actuels

Ce fichier recense les points où le tutoriel vidéo utilise des éléments obsolètes, avec la version utilisée dans ce projet.

## Environnement local

| Sujet | Dans le tutoriel | Ce qu'on utilise | Pourquoi |
|---|---|---|---|
| TypeScript | Version plus ancienne | `typescript@~5.6.3` | TypeScript 7 n'est pas compatible avec `ts-node` 10 (erreur `reading 'fileExists'`). |
| Express | Version 4 | `express@^4` | Le code du cours suit Express 4 ; la v5 change certains comportements. |
| Types Express | `@types/express` | `@types/express@^4` | TypeScript exige des fichiers de types pour chaque bibliothèque importée. |
| Types body-parser | `@types/body-parser` | `@types/body-parser` | Même raison. |

## Infrastructure Kubernetes

| Sujet | Dans le tutoriel | Ce qu'on utilise | Pourquoi |
|---|---|---|---|
| Contrôleur Ingress | ingress-nginx | ingress-nginx (installé sur Docker Desktop) | Le dépôt `kubernetes/ingress-nginx` est archivé depuis le 24 mars 2026 (lecture seule). La Gateway API est la piste recommandée pour un nouveau projet. |
| Classe d'Ingress | Annotation `kubernetes.io/ingress.class` | `spec.ingressClassName: nginx` | L'annotation est dépréciée au profit du champ `ingressClassName`. |
| Version de l'API Ingress | `extensions/v1beta1` | `networking.k8s.io/v1` | `extensions/v1beta1` n'existe plus. |
| Cluster GKE | Mode Autopilot | `ticketing-dev`, région `us-east4` | Le cluster est régional : la région doit correspondre à celle de `get-credentials`. |

## Build et registre d'images

| Sujet | Dans le tutoriel | Ce qu'on utilise | Pourquoi |
|---|---|---|---|
| Builder Skaffold | `build.local` (`push: false`) | `build.googleCloudBuild` | Le cluster GKE ne peut pas récupérer une image construite localement. Skaffold n'accepte qu'un seul builder. |
| Registre d'images | Docker Hub (`slimabida21/auth`) | Artifact Registry (`us-east4-docker.pkg.dev/ticketing-dev-515514/ticketing/auth`) | Le registre `us.gcr.io` (Container Registry) est déprécié. |
| Nom d'image | Identique dans `skaffold.yaml` et le Deployment | Identique dans `skaffold.yaml` et `auth.depl.yaml` | Si les noms diffèrent, Skaffold ne remplace pas l'image et le cluster déploie la mauvaise. |

## À vérifier plus tard

- Configuration de l'Ingress sur GKE : le contrôleur natif de Google Cloud est utilisé par défaut, pas ingress-nginx.
- Passage à la Gateway API (CRD `Gateway` et `HTTPRoute`).
