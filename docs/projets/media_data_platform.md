# Media Data Platform

**Réunir les données publicitaires de Meta Ads et de Google Ads dans BigQuery, avec une seule définition par indicateur.**

> **Stack :** Python · SQL · BigQuery · dbt Core · Terraform · Docker · GitHub Actions
>
> [Code source sur GitHub](https://github.com/y-ikli/media-data-platform)

---

## Problématique

Une agence marketing pilote ses campagnes sur Meta et sur Google :

- **Chaque plateforme a son format**, ses noms de colonnes et ses corrections tardives.
- **Le même indicateur est calculé différemment** d'un tableau de bord à l'autre : CTR, CPC, CPA, ROAS.
- **Relancer une extraction duplique des lignes**, et gonfle les dépenses et les conversions.

## Ce que j'ai construit

- **Une ingestion modulaire et fiable** : un connecteur par plateforme, tous avec la même interface, et un contrat de données qui refuse tout lot invalide avant chargement. Les données publiées sont simulées et étiquetées comme telles.
- **Prête pour les API réelles** : le connecteur Meta Ads lit l'API Marketing réelle de Meta. Il a déjà été testé sur un vrai compte publicitaire ; il suffit de fournir un jeton d'accès pour passer en données réelles.
- **Un chargement rejouable** : chaque chargement remplace sa fenêtre de dates dans une seule transaction. Relancer donne le même résultat, sans doublon.
- **Une modélisation dbt en trois couches** (staging, intermediate, marts), avec un grain unique (plateforme × campagne × jour) et chaque indicateur défini une seule fois. Le modèle principal est incrémental et retraite les 7 derniers jours pour absorber les corrections tardives.
- **Des coûts maîtrisés** : tables partitionnées par jour et plafond de volume par requête.
- **Une infrastructure décrite en code** avec Terraform : datasets BigQuery, comptes de service à droits minimaux, jobs Cloud Run, Workflows et Scheduler, déploiement depuis GitHub Actions sans clé.

```
Meta Ads ────────┐
                 ├─► contrat de données ─► BigQuery (raw) ─► dbt : staging ─► intermediate ─► marts
Google Ads ──────┘
```

## Résultat

- **Le pipeline tourne sur BigQuery** : `dbt build` passe entièrement, 43 étapes sur 43 (6 modèles, 34 tests de données, 3 tests unitaires).
- **129 tests Python**, avec 100 % de couverture du code d'ingestion.
- **Trois tables prêtes pour l'analyse** : les performances quotidiennes par campagne, la comparaison mensuelle Meta / Google, et le référentiel des campagnes.

## Perspectives

- **Construire le tableau de bord Looker Studio** sur les tables finales.
- **Appliquer le déploiement**, déjà décrit en Terraform, pour une exécution automatique chaque matin.
- **Ajouter d'autres sources publicitaires**, grâce à l'interface commune des connecteurs.
