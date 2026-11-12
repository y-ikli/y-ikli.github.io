# Projets

## [Pipeline trafic aérien](trafic_aerien.md)

Toutes les deux heures, tous les vols en cours dans le monde sont collectés, conservés bruts et horodatés, chargés dans BigQuery, puis transformés en indicateurs par dbt : compagnies, constructeurs, vols régionaux, trajets les plus longs. En production sur Google Cloud, orchestré par Kestra, infrastructure décrite en Terraform.

**Stack :** Python · SQL · BigQuery · dbt Core · Kestra · Terraform · Docker · Looker Studio

## [Media Data Platform](media_data_platform.md)

Un pipeline ELT qui réunit les données publicitaires de Meta Ads et de Google Ads dans BigQuery : ingestion contrôlée par un contrat de données, chargements rejouables sans doublon, modélisation dbt en trois couches avec une seule définition par indicateur. Vérifié sur BigQuery : 43 étapes dbt sur 43, 129 tests Python.

**Stack :** Python · SQL · BigQuery · dbt Core · Terraform · Docker · GitHub Actions · [Code source](https://github.com/y-ikli/media-data-platform)

## [MolScout](molscout.md)

Un seul outil pour les équipes de drug discovery : interroger en langage naturel une base de documents de recherche confidentiels, avec une réponse citée et vérifiée, et utiliser dans la même interface les outils de chémoinformatique (propriétés, similarité, sous-structure) sans changer de logiciel. Les SMILES sont reconnus quelle que soit leur écriture, et les propriétés calculées par RDKit plutôt que devinées. Entièrement en local : aucune donnée ne quitte l'entreprise.

**Stack :** Python · LangChain · LangGraph · Ollama · Qdrant · RDKit · FastAPI · Streamlit
