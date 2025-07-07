# Branch Protection Rules Setup

Para configurar que los PR requieran que el build pase antes del merge, sigue estos pasos en GitHub:

## 1. Ir a Settings del repositorio

- Ve a tu repositorio en GitHub
- Click en "Settings" (pestaña)

## 2. Configurar Branch Protection Rules

- En el menú lateral, click en "Branches"
- Click en "Add rule" o "Add branch protection rule"
- En "Branch name pattern" escribe: `main`
- Marca las siguientes opciones:

### Requerimientos obligatorios:

- ✅ **Require a pull request before merging**

  - Marca "Require approvals" y pon al menos 1
  - Marca "Dismiss stale PR approvals when new commits are pushed"

- ✅ **Require status checks to pass before merging**

  - Marca "Require branches to be up to date before merging"
  - En "Status checks that are required" busca y marca:
    - `build-and-test` (del workflow CI)

- ✅ **Require conversation resolution before merging**

### Opciones adicionales recomendadas:

- ✅ **Require signed commits**
- ✅ **Require linear history**
- ✅ **Include administrators**

## 3. Guardar la configuración

- Click en "Create" o "Save changes"

## Resultado

Ahora cuando alguien haga un PR a main:

1. Se ejecutará automáticamente el workflow CI
2. El PR no se podrá mergear hasta que el build pase
3. Se requerirá al menos 1 approval
4. Se deberán resolver todas las conversaciones

## Workflows configurados:

- **CI**: Se ejecuta en PRs y push a main
- **Deploy**: Se ejecuta solo en push a main (para deployment)
